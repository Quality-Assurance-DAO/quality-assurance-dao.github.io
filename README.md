# Quality Assurance DAO (QA-DAO)

QA-DAO is a consultancy that supports open-source projects in Blockchain, Artificial Intelligence and Decentralised Community Building.

We have worked in the SingularityNet and Cardano Communities. 

Quality Assurance DAO was founded by Stephen Whitenstall in April 2021 and grew out of a Project Catalyst Fund 5 Proposal.

## Documentation and Communication

We provide everything from summaries to detailed exposition using common tools such as GitBook and GitHub.

## Open Source

Integrating existing best practice open-source community guidelines into all Catalyst Projects. https://opensource.guide/

## Governance Development and Analysis 

Since 2021 we have provided analysis of Cardano blockchain governance developments.
Since 2022 we have built a community archive for the SingularityNet (https://singularitynet.io) Ambassadors Programme.

## Data Schema

This site uses standardized YAML data files in the `_data/` directory. All data items follow a consistent schema:

### Required Fields (All Data Types)
- `id`: URL-safe slug identifier (auto-generated from name)
- `name`: Display name
- `description`: Text description

### Conditional Required
- `url`: Required for projects, GitBooks, and GitHub organizations; optional for services

### Optional Fields
- `logo`: Path to logo image (relative to site root)
- `year`: Numeric year
- `tags`: Array of tag strings
- `status`: Status indicator (active, archived, in-progress, completed, deprecated)
- `featured`: Boolean flag for featured items
- `category`: Category classification
- `repo`: Repository URL
- `contact`: Contact information

### Data Files
- `_data/projects.yml` - Project data
- `_data/services.yml` - Service data
- `_data/gitbooks.yml` - GitBook data
- `_data/github-organisations.yml` - GitHub organization data

### Validation
Run the validation script before committing:
```bash
ruby scripts/validate-data.rb
```

See [specs/001-standardize-yaml-data/quickstart.md](specs/001-standardize-yaml-data/quickstart.md) for detailed documentation.
