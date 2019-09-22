# Server

## The stack

- Language: [TypeScript](https://www.typescriptlang.org)
- Framework: [Express](https://expressjs.com)
- Web scraper: [Puppeteer](https://pptr.dev)
- ORM: [TypeORM](https://typeorm.io)
- DB: [SQLite](https://www.sqlite.org)

## Available routes

### `GET /item`

- Get all of the stored (previously scraped) items (slimmed down to just `name`,
  `asin`, and `imgUrl`).

### `DELETE /item`

- Delete all of the stored items.

### `GET /item/:asin`

- Get a specific item.
  - If it is stored, will return the stored item.
  - If it is not stored, will scrape the item and return it.

### `DELETE /item/:asin`

- Delete a stored item.
