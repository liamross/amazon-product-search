# Server

## Available routes

### `GET /item`

- Get all of the stored (previously parsed) items.

### `DELETE /item`

- Delete all of the stored items.

### `GET /item/:asin`

- Get a specific item.
  - If it is stored, will return the stored item.
  - If it is not stored, will parse the item and return it.

### `DELETE /item/:asin`

- Delete a stored item.
