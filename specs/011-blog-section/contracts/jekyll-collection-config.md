# Jekyll Collection Configuration Contract

**Feature**: 011-blog-section  
**Date**: 2025-01-27  
**Contract Type**: Jekyll Configuration API

## Overview

This contract defines how the `posts` collection is configured in Jekyll's `_config.yml` file to process blog posts from the custom `/posts` directory.

## Configuration

### Collection Definition

The `posts` collection must be defined in `_config.yml` with the following settings:

```yaml
collections:
  posts:
    output: true
    permalink: /blog/:slug/
```

### Configuration Properties

#### `output: true`
- **Type**: Boolean
- **Required**: Yes
- **Description**: Enables Jekyll to generate HTML pages for each post in the collection
- **Effect**: Without this, posts would be processed but no pages generated

#### `permalink: /blog/:slug/`
- **Type**: String (Liquid template)
- **Required**: Yes
- **Description**: Defines the URL pattern for individual blog post pages
- **Variables**:
  - `:slug` - Replaced with the `slug` value from post front matter
- **Example**: Post with `slug: 2025-01-27-my-post` → URL: `/blog/2025-01-27-my-post/`

### Source Directory

- **Directory**: `/posts` (repository root)
- **File Format**: Markdown files (`.md` extension)
- **Front Matter**: YAML front matter required
- **Naming**: No date prefix required in filename (unlike `_posts` convention)

### Collection Access

In Liquid templates, access posts via:
- `site.posts` - Array of all posts in collection
- `post.title`, `post.date`, `post.slug`, etc. - Individual post fields

## Validation

### Build-Time Validation

Jekyll validates collection configuration during build:
- Invalid YAML syntax causes build failure
- Missing collection definition means posts won't be processed
- Invalid permalink pattern may cause URL generation errors

### Testing

```bash
# Build site to validate configuration
bundle exec jekyll build

# Check for collection processing
# Posts should appear in _site/blog/ directory
```

## Edge Cases

1. **Missing Collection Definition**: Posts won't be processed, no pages generated
2. **Invalid Permalink Pattern**: May cause URL generation errors or incorrect URLs
3. **Empty Posts Directory**: Collection exists but is empty, no errors
4. **Posts with Invalid Front Matter**: Skipped during processing, warning logged

## Related Contracts

- **Blog Post Schema**: `blog-post-schema.json` - Validates front matter structure
- **Blog Index Template**: `blog-index-template-contract.md` - Uses `site.posts` collection
- **Blog Post Layout**: `blog-post-layout-contract.md` - Renders individual post pages

## Implementation Notes

- Collection name `posts` matches directory name `/posts` (Jekyll convention)
- Custom directory `/posts` requires collection configuration (not automatic like `_posts`)
- Permalink pattern uses `:slug` variable from front matter (not filename)
- Date prefix in slug ensures uniqueness (handled in front matter, not filename)

