#!/usr/bin/env ruby
# frozen_string_literal: true

# Validation script for standardized YAML data files
# Validates: required fields, duplicate IDs, URL format, conditional requirements
#
# Usage:
#   ruby scripts/validate-data.rb
#   ruby scripts/validate-data.rb --file _data/projects.yml

require 'yaml'
require 'uri'
require 'optparse'

class DataValidator
  DATA_DIR = '_data'
  DATA_FILES = %w[projects.yml services.yml gitbooks.yml github-organisations.yml].freeze
  REQUIRED_FIELDS = %w[id name description].freeze
  URL_REQUIRED_TYPES = %w[projects gitbooks github-organisations].freeze

  def initialize(options = {})
    @errors = []
    @warnings = []
    @files_to_validate = options[:files] || DATA_FILES
    @verbose = options[:verbose] || false
  end

  def validate
    puts "Validating YAML data files..." if @verbose
    puts "Files: #{@files_to_validate.join(', ')}" if @verbose
    puts

    all_items = []
    @files_to_validate.each do |filename|
      filepath = File.join(DATA_DIR, filename)
      next unless File.exist?(filepath)

      dataset_type = filename.sub('.yml', '')
      items = load_yaml_file(filepath, dataset_type)
      all_items.concat(items.map { |item| [item, dataset_type, filename] })
    end

    validate_all_items(all_items)
    report_results

    @errors.empty?
  end

  private

  def load_yaml_file(filepath, dataset_type)
    YAML.load_file(filepath) || []
  rescue Psych::SyntaxError => e
    add_error(filepath, nil, "YAML syntax error: #{e.message}")
    []
  rescue StandardError => e
    add_error(filepath, nil, "Error loading file: #{e.message}")
    []
  end

  def validate_all_items(all_items)
    all_items.each do |item, dataset_type, filename|
      validate_item(item, dataset_type, filename)
    end

    validate_uniqueness(all_items)
  end

  def validate_item(item, dataset_type, filename)
    return unless item.is_a?(Hash)

    item_id = item['id'] || item[:id] || 'unknown'

    # Required fields validation
    REQUIRED_FIELDS.each do |field|
      unless item.key?(field) || item.key?(field.to_sym)
        add_error(filename, item_id, "Missing required field: '#{field}'")
      end
    end

    # Conditional URL requirement
    if URL_REQUIRED_TYPES.include?(dataset_type)
      unless item.key?('url') || item.key?(:url)
        add_error(filename, item_id, "Missing required field: 'url' (required for #{dataset_type})")
      end
    end

    # URL format validation
    url = item['url'] || item[:url]
    validate_url_format(url, filename, item_id) if url

    # Data type validation
    validate_data_types(item, filename, item_id)
  end

  def validate_url_format(url, filename, item_id)
    return unless url

    begin
      uri = URI.parse(url.to_s)
      unless uri.scheme && uri.host
        add_error(filename, item_id, "Invalid URL format: '#{url}' (missing scheme or host)")
      end
    rescue URI::InvalidURIError => e
      add_error(filename, item_id, "Invalid URL format: '#{url}' (#{e.message})")
    end
  end

  def validate_data_types(item, filename, item_id)
    # Validate tags is an array
    if item.key?('tags') || item.key?(:tags)
      tags = item['tags'] || item[:tags]
      unless tags.is_a?(Array)
        add_error(filename, item_id, "Field 'tags' must be an array, got: #{tags.class}")
      end
    end

    # Validate featured is boolean
    if item.key?('featured') || item.key?(:featured)
      featured = item['featured'] || item[:featured]
      unless [true, false].include?(featured)
        add_error(filename, item_id, "Field 'featured' must be boolean, got: #{featured.class}")
      end
    end

    # Validate year is number
    if item.key?('year') || item.key?(:year)
      year = item['year'] || item[:year]
      unless year.is_a?(Numeric)
        add_error(filename, item_id, "Field 'year' must be a number, got: #{year.class}")
      end
    end
  end

  def validate_uniqueness(all_items)
    id_map = {}
    all_items.each do |item, dataset_type, filename|
      item_id = item['id'] || item[:id]
      next unless item_id

      if id_map.key?(item_id)
        existing_file, existing_type = id_map[item_id]
        add_error(filename, item_id, "Duplicate ID found: '#{item_id}' (also exists in #{existing_file})")
      else
        id_map[item_id] = [filename, dataset_type]
      end
    end
  end

  def add_error(filename, item_id, message)
    @errors << {
      file: filename,
      item: item_id,
      message: message
    }
  end

  def report_results
    if @errors.empty? && @warnings.empty?
      puts "✅ Validation passed! All data files are valid."
      return
    end

    unless @errors.empty?
      puts "❌ Validation failed with #{@errors.size} error(s):"
      puts
      @errors.each do |error|
        puts "  File: #{error[:file]}"
        puts "  Item: #{error[:item]}"
        puts "  Error: #{error[:message]}"
        puts
      end
    end

    unless @warnings.empty?
      puts "⚠️  Warnings (#{@warnings.size}):"
      @warnings.each do |warning|
        puts "  #{warning}"
      end
      puts
    end
  end
end

# CLI
if __FILE__ == $PROGRAM_NAME
  options = {}
  OptionParser.new do |opts|
    opts.banner = "Usage: ruby scripts/validate-data.rb [options]"

    opts.on('-f', '--file FILE', 'Validate specific file') do |file|
      options[:files] = [file]
    end

    opts.on('-v', '--verbose', 'Verbose output') do
      options[:verbose] = true
    end

    opts.on('-h', '--help', 'Show this help') do
      puts opts
      exit
    end
  end.parse!

  validator = DataValidator.new(options)
  success = validator.validate
  exit(success ? 0 : 1)
end





