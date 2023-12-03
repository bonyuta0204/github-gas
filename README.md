# GitHub GAS

## Overview
GitHub GAS is a Google Apps Script library that provides a simplified interface to interact with GitHub's API. This library allows for easy management and automation of GitHub workflows, making it an ideal tool for software engineers and developers working with GitHub within Google Apps Script.

## Features
- **Automated GitHub Interaction**: Simplify tasks like pull request management and repository monitoring.
- **Pull Request Management**: Fetch and manage pull requests with ease.
- **Efficient Navigation**: Navigate through pull requests using criteria like oldest ID.

## Deployment
`GitHub GAS` is designed to used as Google App Script library.
You need to Deploy the code to Google App Script before using it as library.

1. **Clone This Repository**: Clone the GitHub GAS project from the Git repository:

2. **Enable Google Apps Script API**: Ensure that the Google Apps Script API is enabled in your Google Cloud Platform project.

3. **Install Clasp**: If not already installed, install `clasp` globally using npm:
   ```bash
   npm install -g @google/clasp
   ```

4. **Log in to Clasp**: Authenticate `clasp` with your Google account:
   ```bash
   clasp login
   ```
   This opens a browser window for authentication.

5. **Create a New Apps Script Project**: Create a new Google Apps Script project:
   ```bash
   clasp create --title "GitHub GAS"
   ```
   This command links your local project to a new Apps Script project in your Google Drive.

6. **Push Your Code**: Push the local code to the Apps Script project:
   ```bash
   clasp push
   ```

8. **Deploy Your Project**: Deploy the GitHub GAS project:
   ```bash
   clasp deploy
   ```

## Usage
Once you deploy the GitHub GAS project, you can use it in your Google Apps Script projects.

To Use GitHub GAS in your Google Apps Script project, You have to add GitHub GAS as a library to your project.

You need to production
   - In the Apps Script editor of your other project, select "Resources" > "Libraries".
   - Enter the script ID of the GitHub GAS project.
   - Choose a version and set an identifier (e.g., `GitHubGAS`), then click "Add".



## Quick Start  
To use GitHub GAS in your Google Apps Script project:


```javascript
function main() {
  /**
   * You only need to set token once.
   * once you run following line, your token will be stored in UserProperty and you don't need to set token again.
   */ 
  GitHubGAS.setToken("YOUR_GITHUB_TOKEN")


  const client = GitHubGAS.client()

  const pulls = client.fetchPullsByOldestId("bonyuta0204/github-gas", 0)
  Logger.log(pulls)
}
```
Replace `'YOUR_GITHUB_TOKEN'` with your personal GitHub token.


## Reference
<!-- Interface for Client method -->

### Client Class

The `Client` class is used to interact with the GitHub API to fetch pull requests from repositories.

### Constructor

- `constructor(token: string)`: Initializes a new instance of the `Client` class.
  - `token`: A string representing the GitHub API token.

#### Methods

##### fetchPulls

- `fetchPulls(repo: string, params?: Record<string, string>)`: Fetches a list of pull requests from a specified repository.
  - `repo`: The name of the repository (e.g., "google/clasp").
  - `params`: Optional parameters for the request as a key-value pair object.
  
  **Example:**
  ```javascript
  const client = GitHubGAS.client()
  client.fetchPulls('google/clasp', { state: 'open' }).then(pulls => {
    console.log(pulls);
  });
  ```

##### fetchPullsByOldestId

- `fetchPullsByOldestId(repo: string, id: number)`: Fetches all pull requests from the specified repository that are newer than the given pull request ID.
  - `repo`: The name of the repository (e.g., "google/clasp").
  - `id`: The ID number of the pull request.
  
  **Example:**
  ```javascript
  const client = GitHubGAS.client()
  client.fetchPullsByOldestId('google/clasp', 123).then(pulls => {
    console.log(pulls);
  });
  ```

## Disclaimer
This is not an official Google product.

## Support
For support, please open an issue in the GitHub issue tracker or contact the maintainers.