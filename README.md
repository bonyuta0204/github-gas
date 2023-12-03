# GitHub GAS

## Overview
GitHub GAS is a Google Apps Script library that provides a simplified interface to interact with GitHub's API. This library allows for easy management and automation of GitHub workflows, making it an ideal tool for software engineers and developers working with GitHub within Google Apps Script.

## Features
- **Automated GitHub Interaction**: Simplify tasks like pull request management and repository monitoring.
- **Pull Request Management**: Fetch and manage pull requests with ease.
- **Efficient Navigation**: Navigate through pull requests using criteria like oldest ID.

## Installation

1. **Enable Google Apps Script API**: Ensure that the Google Apps Script API is enabled in your Google Cloud Platform project.

2. **Install Clasp**: If not already installed, install `clasp` globally using npm:
   ```bash
   npm install -g @google/clasp
   ```

3. **Log in to Clasp**: Authenticate `clasp` with your Google account:
   ```bash
   clasp login
   ```
   This opens a browser window for authentication.

4. **Clone the Git Repository**: Clone the GitHub GAS project from the Git repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

5. **Create a New Apps Script Project**: Create a new Google Apps Script project:
   ```bash
   clasp create --title "GitHub GAS"
   ```
   This command links your local project to a new Apps Script project in your Google Drive.

6. **Push Your Code**: Push the local code to the Apps Script project:
   ```bash
   clasp push
   ```

7. **Include the Library in Your Project** (If using GitHub GAS as a library in another Apps Script project):
   - In the Apps Script editor of your other project, select "Resources" > "Libraries".
   - Enter the script ID of the GitHub GAS project.
   - Choose a version and set an identifier (e.g., `GitHubGAS`), then click "Add".

8. **Deploy Your Project**: Deploy the GitHub GAS project:
   ```bash
   clasp deploy
   ```

### Note:
- Replace `<repository-url>` and `<repository-directory>` with the actual URL and name of the repository.
- Ensure you have an `appsscript.json` file in your project directory.

## Usage
To use GitHub GAS in your Google Apps Script project:

```javascript
function exampleUsage() {
    var client = new GitHubGAS.Client('YOUR_GITHUB_TOKEN');
    // Fetch pull requests for a specific repository
    var pulls = client.fetchPulls('your/repo');
}
```
Replace `'YOUR_GITHUB_TOKEN'` with your personal GitHub token.

## Advanced Usage
```javascript
// Fetch pull requests by oldest ID
function fetchPullsByOldestIdExample() {
    var client = new GitHubGAS.Client('YOUR_GITHUB_TOKEN');
    var pulls = client.fetchPullsByOldestId('your/repo', 123);
}
```

## Disclaimer
This is not an official Google product.

## Support
For support, please open an issue in the GitHub issue tracker or contact the maintainers.