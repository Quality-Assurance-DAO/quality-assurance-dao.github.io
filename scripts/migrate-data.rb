#!/usr/bin/env ruby
# frozen_string_literal: true

# Data migration script for standardizing YAML data files
# Generates id fields from name, preserves existing data, validates output
#
# Usage:
#   ruby scripts/migrate-data.rb
#   ruby scripts/migrate-data.rb --file _data/projects.yml --dry-run

require 'yaml'
require 'optparse'

class DataMigrator
  DATA_DIR = '_data'
  DATA_FILES = %w[projects.yml services.yml gitbooks.yml github-organisations.yml].freeze

  def initialize(options = {})
    @dry_run = options[:dry_run] || false
    @files_to_migrate = options[:files] || DATA_FILES
    @backup = options[:backup] != false
  end

  def migrate
    puts "Starting data migration..."
    puts "Mode: #{@dry_run ? 'DRY RUN (no files will be modified)' : 'LIVE'}"
    puts "Files: #{@files_to_migrate.join(', ')}"
    puts

    all_existing_ids = collect_all_existing_ids

    @files_to_migrate.each do |filename|
      filepath = File.join(DATA_DIR, filename)
      next unless File.exist?(filepath)

      puts "Processing: #{filename}"
      migrate_file(filepath, filename, all_existing_ids)
    end

    puts
    puts "✅ Migration complete!"
  end

  private

  def collect_all_existing_ids
    ids = {}
    DATA_FILES.each do |filename|
      filepath = File.join(DATA_DIR, filename)
      next unless File.exist?(filepath)

      items = load_yaml_file(filepath)
      items.each do |item|
        next unless item.is_a?(Hash)
        id = item['id'] || item[:id]
        ids[id] = filename if id
      end
    end
    ids
  end

  def migrate_file(filepath, filename, all_existing_ids)
    items = load_yaml_file(filepath)
    return if items.empty?

    migrated_items = []
    collision_counter = {}

    items.each do |item|
      next unless item.is_a?(Hash)

      migrated_item = item.dup

      # Generate ID if missing
      unless migrated_item.key?('id') || migrated_item.key?(:id)
        name = migrated_item['name'] || migrated_item[:name] || 'unnamed'
        generated_id = generate_slug(name)

        # Handle collisions
        original_id = generated_id
        counter = collision_counter[original_id] || 0
        while all_existing_ids.key?(generated_id) || migrated_items.any? { |i| (i['id'] || i[:id]) == generated_id }
          counter += 1
          generated_id = "#{original_id}-#{counter}"
        end
        collision_counter[original_id] = counter

        migrated_item['id'] = generated_id
        all_existing_ids[generated_id] = filename
        puts "  Generated ID: '#{generated_id}' for '#{name}'"
      end

      migrated_items << migrated_item
    end

    # Write migrated data
    unless @dry_run
      # Create backup
      if @backup
        backup_path = "#{filepath}.backup"
        FileUtils.cp(filepath, backup_path)
        puts "  Created backup: #{backup_path}"
      end

      # Write migrated data
      File.write(filepath, migrated_items.to_yaml)
      puts "  ✅ Migrated #{migrated_items.size} item(s)"
    else
      puts "  [DRY RUN] Would migrate #{migrated_items.size} item(s)"
      puts "  [DRY RUN] Sample migrated item:"
      puts migrated_items.first.to_yaml.lines.first(5).join if migrated_items.any?
    end
  end

  def generate_slug(name)
    name.to_s
        .downcase
        .gsub(/[^a-z0-9\s-]/, '') # Remove special characters
        .gsub(/\s+/, '-')           # Replace spaces with hyphens
        .gsub(/-+/, '-')            # Collapse multiple hyphens
        .gsub(/^-|-$/, '')          # Remove leading/trailing hyphens
  end

  def load_yaml_file(filepath)
    YAML.load_file(filepath) || []
  rescue Psych::SyntaxError => e
    puts "  ❌ Error: YAML syntax error in #{filepath}: #{e.message}"
    []
  rescue StandardError => e
    puts "  ❌ Error loading #{filepath}: #{e.message}"
    []
  end
end

# CLI
if __FILE__ == $PROGRAM_NAME
  require 'fileutils'

  options = {}
  OptionParser.new do |opts|
    opts.banner = "Usage: ruby scripts/migrate-data.rb [options]"

    opts.on('-f', '--file FILE', 'Migrate specific file') do |file|
      options[:files] = [file]
    end

    opts.on('--dry-run', 'Dry run (no files modified)') do
      options[:dry_run] = true
    end

    opts.on('--no-backup', 'Skip backup creation') do
      options[:backup] = false
    end

    opts.on('-h', '--help', 'Show this help') do
      puts opts
      exit
    end
  end.parse!

  migrator = DataMigrator.new(options)
  migrator.migrate
end


