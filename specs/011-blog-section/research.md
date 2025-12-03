# Research: Blog Section

**Feature**: Blog Section  
**Date**: 2025-01-27  
**Phase**: 0 - Research & Clarification

## Research Tasks

### 1. Jekyll Custom Directory Processing (`/posts` vs `_posts`)

**Question**: How to configure Jekyll to process a custom `/posts` directory instead of the default `_posts` directory?

**Research**:
- Jekyll's default convention uses `_posts/` directory with date-prefixed filenames (e.g., `2025-01-27-post-title.md`)
- Jekyll Collections allow custom directories with flexible naming
- Collections are defined in `_config.yml` with `collections:` key
- Collections can have custom output, permalink, and processing settings
- Collections don't require date prefixes in filenames (unlike `_posts`)
- Collections can be configured to output files as pages

**Decision**: Use Jekyll Collections to define a custom `posts` collection that processes files from the `/posts` directory.

**Rationale**:
- Collections provide flexibility for custom directory structures
- No date prefix requirement in filenames (cleaner file organization)
- Full control over permalink structure (`/blog/post-slug`)
- Can configure output, sorting, and metadata handling
- Compatible with GitHub Pages (collections are core Jekyll feature)

**Alternatives Considered**:
- Using `_posts` directory: Rejected because spec requires `/posts` custom structure
- Custom plugin: Rejected because GitHub Pages has limited plugin support
- Manual file processing: Rejected because it breaks automatic discovery requirement

**Implementation**: Configure in `_config.yml`:
```yaml
collections:
  posts:
    output: true
    permalink: /blog/:slug/
```

---

### 2. Individual Post Pages with `/blog/post-slug` URLs

**Question**: How to generate individual blog post pages accessible via `/blog/post-slug` URLs?

**Research**:
- Jekyll Collections support custom permalink patterns
- Permalink can use `:slug` variable from front matter
- Collections with `output: true` generate pages for each file
- Need a layout template (`_layouts/post.html`) for post pages
- Slug can be extracted from front matter or filename
- Date-based disambiguation can be handled in permalink or slug generation

**Decision**: Use Jekyll Collections with custom permalink pattern `/blog/:slug/` and create a `_layouts/post.html` layout template.

**Rationale**:
- Collections provide built-in permalink customization
- `:slug` variable automatically uses front matter `slug` field
- Layout template ensures consistent post page structure
- Compatible with GitHub Pages
- Supports date-based disambiguation via slug field in front matter

**Alternatives Considered**:
- Using `_posts` with permalink override: Rejected because requires `_posts` directory
- Manual page generation: Rejected because breaks automatic discovery
- Jekyll Pages with front matter: Rejected because doesn't support automatic collection iteration

**Implementation**: 
- Configure collection permalink in `_config.yml`: `permalink: /blog/:slug/`
- Create `_layouts/post.html` layout for post pages
- Use `site.posts` collection in templates to iterate posts

---

### 3. Pagination for Blog Index

**Question**: How to implement pagination for the blog index page when there are many posts?

**Research**:
- Jekyll has a `jekyll-paginate` plugin, but it's deprecated
- Jekyll has a `jekyll-paginate-v2` plugin, but GitHub Pages doesn't support it
- GitHub Pages supports `jekyll-paginate` (v1) but only for `_posts` collection
- Custom Liquid pagination can be implemented manually
- Client-side pagination using JavaScript is an option
- Build-time pagination using Liquid filters (`limit`, `offset`) can create multiple pages

**Decision**: Implement client-side pagination using JavaScript for the blog index page.

**Rationale**:
- GitHub Pages limitations prevent using advanced pagination plugins
- Client-side pagination works with any collection
- No build-time complexity (single HTML page)
- Better user experience (instant filtering/pagination)
- Can combine with tag filtering seamlessly
- All posts loaded once, paginated client-side (acceptable for blog scale)

**Alternatives Considered**:
- `jekyll-paginate-v2`: Rejected because not supported on GitHub Pages
- Build-time pagination with Liquid: Rejected because creates multiple files and complexity
- No pagination: Rejected because spec requires pagination for many posts

**Implementation**:
- Load all posts in blog index HTML
- Use JavaScript to paginate posts client-side (10 per page)
- Add pagination controls (Previous/Next, page numbers)
- Store current page in URL hash or state

---

### 4. Tag-Based Filtering

**Question**: How to implement tag-based filtering for blog posts?

**Research**:
- Build-time filtering: Generate separate pages for each tag using Liquid
- Client-side filtering: Filter posts using JavaScript after page load
- URL-based filtering: Use query parameters or hash to filter
- Jekyll Collections support filtering with Liquid filters
- Tag pages can be generated at build time for each unique tag

**Decision**: Implement client-side tag filtering using JavaScript, with URL hash support for shareable filtered views.

**Rationale**:
- Works seamlessly with client-side pagination
- No build-time complexity (single page handles all tags)
- Better user experience (instant filtering)
- Can combine with pagination (filter then paginate)
- URL hash allows shareable filtered views
- All posts loaded once, filtered client-side

**Alternatives Considered**:
- Build-time tag pages: Rejected because creates many pages and complexity
- Server-side filtering: Rejected because GitHub Pages is static
- Query parameter filtering: Considered but hash is simpler for static site

**Implementation**:
- Extract tags from post front matter in Liquid template
- Render all posts with data attributes for tags
- Use JavaScript to filter posts by tag on click
- Update URL hash when filtering (e.g., `#tag=ai`)
- Clear filter to show all posts

---

### 5. Date-Based Slug Disambiguation

**Question**: How to handle duplicate slugs using date-based disambiguation (e.g., `2025-01-27-post-slug`)?

**Research**:
- Jekyll Collections use front matter `slug` field for permalink
- Can prepend date to slug in front matter or permalink pattern
- Permalink pattern supports `:date` and `:slug` variables
- Date can be formatted in permalink (e.g., `:year/:month/:day/:slug`)
- Slug uniqueness can be enforced at build time or in front matter

**Decision**: Use date-prefixed slugs in front matter (`slug: 2025-01-27-post-slug`) and configure permalink to use slug directly (`/blog/:slug/`).

**Rationale**:
- Simple and explicit - slug includes date for uniqueness
- No complex permalink pattern needed
- Author controls slug uniqueness in front matter
- Date prefix makes slugs human-readable and sortable
- Compatible with Jekyll Collections permalink system

**Alternatives Considered**:
- Permalink pattern with date: Considered (`/blog/:year/:month/:day/:slug/`) but rejected because spec requires `/blog/post-slug` format
- Auto-generate unique slugs: Rejected because requires build-time processing complexity
- Error on duplicate slugs: Rejected because spec requires graceful handling

**Implementation**:
- Require authors to include date in slug when creating posts (e.g., `slug: 2025-01-27-my-post`)
- Use `slug` field directly in permalink: `/blog/:slug/`
- Document slug format in post template or README

---

## Summary of Decisions

1. **Custom Directory**: Use Jekyll Collections with `posts` collection pointing to `/posts` directory
2. **Post URLs**: Use collection permalink `/blog/:slug/` with `_layouts/post.html` layout
3. **Pagination**: Client-side JavaScript pagination (10 posts per page)
4. **Tag Filtering**: Client-side JavaScript filtering with URL hash support
5. **Slug Disambiguation**: Date-prefixed slugs in front matter (e.g., `slug: 2025-01-27-post-slug`)

All decisions are compatible with GitHub Pages hosting and Jekyll static site generation requirements.

