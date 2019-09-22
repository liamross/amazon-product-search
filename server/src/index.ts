import cors from 'cors';
import express from 'express';
import {ConnectionOptions, createConnection} from 'typeorm';
import {Item} from './models/amazon_item';
import {scrapeByAsin} from './scraper';
import {parseItem} from './utils/ormUtils';

const PORT = 3001;

(async () => {
  const app = express();
  app.use(cors());

  /* --- Set up ORM --- */

  const connectionOptions: ConnectionOptions = {
    type: 'sqlite',
    database: './store.sqlite',
    // host: 'localhost',
    // port: 3306,
    // username: 'username', // TODO: update
    // password: 'password', // TODO: update
    entities: [Item],
    synchronize: true,
    logging: 'all',
  };

  const connection = await createConnection(connectionOptions);

  /* --- All items --- */

  /** Get slimmed-down all stored items. */
  app.get('/item', async (_req, res, next) => {
    console.log('GET /item');

    try {
      const itemRepo = connection.getRepository(Item);
      const items = (await itemRepo.find()).map(item => parseItem(item));

      const returnVal = items
        .sort((itemA, itemB) => {
          if (itemA.storedDate > itemB.storedDate) return -1;
          if (itemA.storedDate < itemB.storedDate) return 1;
          return 0;
        })
        .map(item => ({
          asin: item.asin,
          imgUrl: item.imgUrl,
          name: item.name,
        }));
      console.log(returnVal);
      res.send(returnVal);
    } catch (error) {
      next(error);
    }
  });

  /** Delete all stored items. */
  app.delete('/item', async (_req, res, next) => {
    console.log('DELETE /item');

    try {
      const itemRepo = connection.getRepository(Item);
      await itemRepo.clear();

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  });

  /* --- Specific item --- */

  /**
   * Get an item by asin.
   * 1. If it exists in DB, return it.
   * 2. If not, scrape amazon site for data and store, then return.
   */
  app.get('/item/:asin', async (req, res, next) => {
    const asin = req.params.asin;
    console.log(`GET /item/${asin}`);

    try {
      const itemRepo = connection.getRepository(Item);
      const items = (await itemRepo.find({where: [{asin: asin}]})).map(item => parseItem(item));

      if (items.length) {
        console.log('Item is already saved, returning.');
        console.log(items[0]);
        res.send(items[0]);
      } else {
        console.log('Item scraped, returning.');
        const amazonItem = await scrapeByAsin(asin);
        const newItem = new Item();
        newItem.asin = amazonItem.asin;
        newItem.category = JSON.stringify(amazonItem.category);
        newItem.dimensions = JSON.stringify(amazonItem.dimensions);
        newItem.imgUrl = amazonItem.imgUrl;
        newItem.name = amazonItem.name;
        newItem.rank = JSON.stringify(amazonItem.rank);
        newItem.storedDate = new Date().getTime();
        const savedItem = await itemRepo.save(newItem);
        const item = parseItem(savedItem);
        console.log(item);
        res.send(item);
      }
    } catch (error) {
      next(error);
    }
  });

  /** Delete an item by asin. */
  app.delete('/item/:asin', async (req, res, next) => {
    const asin = req.params.asin;
    console.log(`DELETE /item/${asin}`);

    try {
      const itemRepo = connection.getRepository(Item);
      const items = (await itemRepo.find({where: [{asin: asin}]})).map(item => parseItem(item));

      if (items.length) {
        await itemRepo.delete({asin});
        res.status(204).send();
      } else {
        throw new Error('Item does not exist.');
      }
    } catch (error) {
      next(error);
    }
  });

  app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
})();
