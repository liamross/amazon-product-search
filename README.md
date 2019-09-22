# Amazon Product Search

A full-stack app for displaying product information for an item on Amazon. To
search for an item, simply enter the ASIN number.

## To start

1. Run `yarn` or `npm i` in `client` and `server`.
1. Run `yarn start` or `npm run start` in both the `client` and `server`
directories.

## The stack

### Front end (client)

- Language: [TypeScript](https://www.typescriptlang.org)
- Framework: [React](https://reactjs.org)
- Style: [Sass](https://sass-lang.com/)
- Data layer: [Use Data](https://www.npmjs.com/package/use-data) - My own data
  fetching hook.
- UI-Kit: [Blueprint](https://blueprintjs.com)
- Starter: [Create React App](https://create-react-app.dev)
- Linter: [ESLint](https://eslint.org)
- Formatter: [Prettier](https://prettier.io)

### Back end (server)

- Language: [TypeScript](https://www.typescriptlang.org)
- Framework: [Express](https://expressjs.com)
- Web scraper: [Puppeteer](https://pptr.dev)
- ORM: [TypeORM](https://typeorm.io)
- DB: [SQLite](https://www.sqlite.org)
