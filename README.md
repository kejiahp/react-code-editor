# Code Editor

This code editor was done as an attempt to a Full Stack Engineer Assessment task.

Belows a link to the hosted editor:

- [Editor demo](https://react-code-editor-production.up.railway.app)

## Setting up the environment

- Clone the repository, repo link `https://github.com/kejiahp/react-code-editor` or download the zip

- Run the script below in your terminal to install dependencies:

```bash
npm install
```

#### Running the development server

- Run the script below in your terminal to start the development server

```bash
npm run dev
#or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

#### Running the production server

- For my `start` script i'm using [serve](https://www.npmjs.com/package/serve) from vercel.

1. Replace the $PORT with `3000` in the package.json file

```js
    start: "serve dist -s -n -L -p 3000",
```

2. Then run the scripts below:

```bash
npm run build
#then
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
