# Quality Assurance DAO (QA-DAO)

QA-DAO is a consultancy that supports open-source projects in Blockchain, Artificial Intelligence and Decentralised Community Building.

We have worked in the SingularityNet and Cardano Communities. 

Quality Assurance DAO was founded by Stephen Whitenstall in April 2021 and grew out of a Project Catalyst Fund 5 Proposal.

## Local Development Setup

This site is built with Jekyll and GitHub Pages. To run it locally:

### Prerequisites
- Ruby 2.7 or higher
- Bundler (`gem install bundler`)

### Installation
```bash
# Clone the repository
git clone https://github.com/Quality-Assurance-DAO/quality-assurance-dao.github.io.git
cd quality-assurance-dao.github.io

# Install dependencies
bundle install

# Run the Jekyll server
bundle exec jekyll serve

# Visit http://localhost:4000 in your browser
```

### Project Structure
```
├── _config.yml           # Site configuration
├── _data/                # Data files for dynamic content
│   ├── gitbooks.yml     # GitBook links and descriptions
│   ├── github-organisations.yml  # GitHub org links
│   └── projects.yml     # Project board links
├── _layouts/            # HTML templates
│   └── default.html     # Main page layout
├── assets/              # Static assets
│   └── images/          # Images and icons
└── README.md            # This file
```

### Adding Content
- **GitBooks**: Edit `_data/gitbooks.yml`
- **GitHub Organisations**: Edit `_data/github-organisations.yml`
- **Project Boards**: Edit `_data/projects.yml`
- **Main Content**: Edit this `README.md` file

## Documentation and Communication

> We provide everything from summaries to detailed exposition using common tools such as GitBook and GitHub.

## Open Source

> Integrating existing best practice open-source community guidelines into all Catalyst Projects. https://opensource.guide/

## Governance Development and Analysis 

> Since 2021 we have provided analysis of Cardano blockchain governance developments.
> Since 2022 we have built a community archive for the SingularityNet (https://singularitynet.io) Ambassadors Programme.
