# Galatix Zone Admin Frontend

## Development

### Setup environment variables
```bash
cp .env.example .env
```
Now `.env` file contains env for development environment.

### Install dependencies

```bash
yarn
# or
yarn install
```

Run the development server:

```bash
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

### Production optimization build
 - Update `.env` file for production build

- Run command to build project

```bash
yarn build
```

### Deploy into Nodejs environment
#### PM2

Install `pm2`
```bash
yarn add global pm2
```

Run optimization build (`./build` folder) on `pm2` by running command
```bash
pm2 serve ./build 3000 --name "galactixzone-fe-admin" --spa
pm2 show galactixzone-fe-admin
```
Production admin app now is ready on port `3000`
