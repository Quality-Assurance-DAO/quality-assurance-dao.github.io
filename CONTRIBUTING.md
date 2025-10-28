# Contributing to QA-DAO Website

Thank you for your interest in contributing to the Quality Assurance DAO website!

## How to Contribute

### Reporting Issues
- Check if the issue already exists
- Provide clear description and steps to reproduce
- Include screenshots if relevant

### Suggesting Enhancements
- Open an issue describing the enhancement
- Explain why it would be useful
- Provide examples if possible

### Making Changes

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
   - Follow existing code style
   - Test your changes locally
   - Update documentation if needed
4. **Commit your changes**
   ```bash
   git commit -m "Description of changes"
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request**
   - Provide clear description of changes
   - Link any relevant issues

### Adding Content

#### GitBooks
Edit `_data/gitbooks.yml`:
```yaml
- name: Your GitBook Name
  description: Brief description
  url: https://your-gitbook-url.com
```

#### GitHub Organisations
Edit `_data/github-organisations.yml`:
```yaml
- name: Organisation Name
  description: Brief description
  url: https://github.com/your-org
```

#### Project Boards
Edit `_data/projects.yml`:
```yaml
- name: Project Name
  description: Brief description
  url: https://github.com/orgs/your-org/projects/1
```

## Code of Conduct
- Be respectful and inclusive
- Focus on constructive feedback
- Help maintain a positive community

## Questions?
Feel free to open an issue for any questions about contributing.

