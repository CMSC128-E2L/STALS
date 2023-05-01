<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h1 align="center">Student Accommodation and Lodging System (STALS)</h1>

  <p align="center">
    Welcome to the codebase for STALS project! This README file contains all the information you need to contribute to this project.
    <br />
    <a href="https://stals.vercel.app/"><strong>Site »</strong></a>
    <br />
    <br />
    <a href="https://github.com/orgs/CMSC128-E2L/projects/1">Backend Kanban</a>
    •
    <a href="https://github.com/orgs/CMSC128-E2L/projects/3">Database Kanban</a>
    •
     <a href="https://github.com/orgs/CMSC128-E2L/projects/2">Frontend Kanban</a>
    <br>
    <a href="https://discord.com/channels/1080321297386573915/1080321297856348270">Discord</a>
    •
    <a href="https://docs.google.com/document/d/1OVWfs7WSUFBU0-07O3GtBHcDNcOc6PyLjbrRZUITfvQ/edit#">SRS</a>
    •
    <a href="https://www.figma.com/file/r41xtwCWWtvQBmCLfqSmDB/STALS?node-id=0-1&t=ncPezdfXGRkoGyvN-0">Figma</a>
    •
    <a href="https://drive.google.com/drive/folders/1VBz97XxZ5TEWmWrTrvKH7JaqT6MI-0Ay?usp=sharing">GDrive</a> 
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#how-to-pull-request">How To Pull Request</a></li>
      </ul>
    </li>
    <li><a href="#installation">Team Files</a></li>
     <li><a href="#installation">Roadmap</a></li>
     <li><a href="#installation">Contact</a></li>
    <li><a href="#installation">Acknowledgements</a></li>
  </ol>
</details>

<!-- GETTING STARTED -->
# Getting Started

To get a local copy up and running, follow the steps for installation first. If there is already an existing codebase environment on your machine, you may proceed in following the steps for pull request:

## Installation

<details><summary>GitHub Repository</summary> 

### Setup
  
1. (Optional) On your code editor, make sure you have logged-in your GitHub account. 

2. Go to GitHub then `Fork` the develop branch of the main repository.
  
3. In your forked repository, click `Code` then copy the `HTTPS` or `SSH` link.
  
4. Go to your local directory on which you want your codebase to be located. 

5. On your terminal, `clone` your forked repository.
     ```
     git clone <link>
     ```
  
### Commands
  
- Create a branch from `develop`.
    ```
    git checkout -b NEWBRANCH
    ``` 
  
- Displays your current branch.
    ```
    git branch
    ``` 
  
-  Displays the state of the working directory and the staging area.
    ```
    git status
    ```
</details>
  
<details><summary>Linux, WSL</summary>

### Setup

1. Install [nvm](https://github.com/nvm-sh/nvm).
    ```
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
    ```
    or
    ```
    wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
    ```

2. Update shell configs.
    ```
    exec $SHELL
    ```

3. Install and use the Nodejs LTS version.
    ```
    nvm install --lts
    nvm use --lts
    ```

4. Check node version.
    ```
    node --version
    ```
    > it should be "v18.XX.X"

5. Get the .env file in the [discord](https://discord.com/channels/1080321297386573915/1089892717905064036/1097765581278687262) channel general-resources.   
    > Place this file into the root project folder then rename it into `.env`.

6. Download dependencies.
    ```
    npm install
    ```

7. Run this command to deploy locally.
    ```
    npm run dev
    ```

### Usage
Use Nodejs LTS
    ```
    nvm use --lts
    npm run dev
    ```

### Commands
  
- Check for warnings and errors in the codebase.
    ```
    npm run lint
    ```
- Format all files in the src/ directory.
    ```
    npm run format
    ```
</details>

<details><summary>Windows</summary> 

### Setup

1. Go to https://nodejs.org/en/download, select LTS, and under Windows Installer (.msi) click 32-bit or 64-bit depending on your device.

2. Check node version.
    ```
    node --version
    ```
    > it should be "v18.XX.X"
3. Get the .env file in the [discord](https://discord.com/channels/1080321297386573915/1089892717905064036/1097765581278687262) channel general-resources.   
    > Place this file into the root project folder then rename it into `.env`.

4. Download dependencies.
    ```
    npm install
    ```
  
5. Run this command to deploy locally.
    ```
    npm run dev
    ```
    
### Commands
  
- Check for warnings and errors in the codebase.
    ```
    npm run lint
    ```
  
- Format all files in the src/ directory.
    ```
    npm run format
    ```
</details>

## How To Pull Request

<details> <summary> Sync Repo and Setup New Branch </summary>

1. Check the ISSUES for the features or pages you will add to the website.
      > [Backend](https://github.com/orgs/CMSC128-E2L/projects/1), [Database](https://github.com/orgs/CMSC128-E2L/projects/3), [Frontend](https://github.com/orgs/CMSC128-E2L/projects/2) 

2. In your forked repository, `Sync Fork` your develop branch to the develop branch in the main repository.

3. Pull the changes in your local machine.
      ```
      git checkout develop
      git pull
      ```

4. Create a branch from develop.
      ```
      git checkout -b NEWBRANCH
      ```  
      > short method OR
     ```
     git branch NEWBRANCH
     git checkout NEWBRANCH
     ```
      > long method
  
5. Start working on your code inside the newly created branch. Make sure that no changes will be done under the develop branch.

6. To check for errors and to format your code, run:
     ```
     npm run lint
     ```
</details>

<details> <summary> Publish Code Changes </summary>

  1. To check the state of your working directory:
        ```
        git status
        ```
  2. On your code editor, if you have Git extensions, click `Commit and Push`. Then check the naming convention for commits. Otherwise, proceed to step 3.
      
  3. Else, add your code changes.
        ```
        git add .
        ```
  4. Commit your changes in your new branch and include the commit type in your commit message.
        ```
        git commit -m "<insert message>"
        ```
        <details> <summary> IMPORTANT: Commit Naming Convention </summary> 
        <ol>
          <li> feat – a new feature is introduced with the changes </li>
          <li> fix – a bug fix has occurred </li>
          <li> chore – changes that do not relate to a fix or feature and don't modify src or test files (for example updating dependencies) </li>
          <li> refactor – refactored code that neither fixes a bug nor adds a feature </li>
          <li> docs – updates to documentation such as a the README or other markdown files </li>
        </details>
  
  5. If your branch is not in the origin yet, run: 
      ```
      git push --set-upstream origin NEWBRANCH
      ```
  6. If your branch is already existing in the origin, push these changes.
      ```
      git push
      ```

  </details>
  
<details> <summary> Create Pull Request </summary>
  
1. In GitHub, go to your forked repository.
  
2. If there is a prompt for your pushed changes, click `Compare & pull request`. Otherwise, follow step 3.
  
3. Else, click `Contribute` then `Open Pull Request`.
  
4. Link the issue that you have created.
    > [Backend](https://github.com/orgs/CMSC128-E2L/projects/1), [Database](https://github.com/orgs/CMSC128-E2L/projects/3), [Frontend](https://github.com/orgs/CMSC128-E2L/projects/2) 

  5. Once your pull request is merged, <b>close</b> the issue and <b>delete</b> the branch containing the merged code. To implement new changes and features, create a new branch and follow the workflow from the start.
