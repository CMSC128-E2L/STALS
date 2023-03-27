# STALS

An information system that allows users to search, get information, review, and
report hotels, apartments, bed space, dormitories, and transient spaces in Los Baños.

## Install

<details><summary>Linux, WSL</summary>

## Setup

Install nvm

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```
or
```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
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
> it should be "v18.15.0"

Create .env file (TODO: update for production)

```
cp .env.example .env
```

Generate Database (TODO: change sqlite to mysql for production)

```
npx prisma db push
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