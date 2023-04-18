# Student Accommodation and Lodging System (STALS)

<details>
    <summary> GitHub Pull Request (to be updated) </summary>  
    
  #### Developers
  1. Fork the  develop/master branch (not clone)
  2. Create a branch on your forked repository.  
  3. git add, commit, and push your changes on your local repository 
  4. Click "Compare & pull request" for your ticket, git pull (pull request) -- for approval by Team Leads
  5. git merge (developed) -- merged by Team Leads
 #### Team Leads:
  1. testing and approval of the developer's new code in the develop branch
  2. once approved, escalate the new code to the developTest branch
  3. in developTest branch, other TLs and PM will test the new code
  4. if the new code is final, it will be pushed to the master branch   
  
</details>

## Install

<details><summary>Linux, WSL</summary>

## Setup

Install [nvm](https://github.com/nvm-sh/nvm)

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```
or
```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

Update shell configs

```
exec $SHELL
```

Install and use the Nodejs LTS version

```
nvm install --lts
nvm use --lts
```

Check node version
```
node --version
```
> it should be "v18.XX.X"

Get the .env file in the discord channel general-rources

https://discord.com/channels/1080321297386573915/1089892717905064036/1097765581278687262

Download dependencies
```
npm install
```

Then run this command to deploy locally
```
npm run dev
```

## Usage
Use Nodejs LTS

```
nvm use --lts
npm run dev
```

</details>

<details><summary>Windows (TODO)</summary>

## Setup

## Usage

</details>