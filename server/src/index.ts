import cors from 'cors';
import express from 'express';
import {AmazonItem} from '../../shared/types';
import {scrapeByAsin} from './scraper';

const PORT = 3001;

const mockItems = new Map<string, AmazonItem>([
  [
    '1',
    {
      asin: '1',
      name: 'Some item',
      imgUrl: 'https://m.media-amazon.com/images/S/aplus-media/mg/a34f35d5-77a5-4867-9ce9-e6ad14c144c1._SL300__.jpg',
      category: ['AA', 'BB', 'CC', 'DD', 'EE'],
      rank: [{rank: 1, category: 'EE'}, {rank: 55, category: 'DD'}, {rank: 99, category: 'CC'}],
      dimensions: {x: 4.9, z: 0.8, y: 22.7, units: 'inches'},
      storedDate: 1568771788344,
    },
  ],
  [
    'B002QYW8LW',
    {
      asin: 'B002QYW8LW',
      name: 'Baby Banana Infant Training Toothbrush and Teether',
      imgUrl: 'https://m.media-amazon.com/images/S/aplus-media/mg/a34f35d5-77a5-4867-9ce9-e6ad14c144c1._SL300__.jpg',
      category: ['Baby Products', 'Baby Care', 'Pacifiers', 'Teethers & Teething Relief', 'Teethers'],
      rank: [
        {rank: 33, category: 'Baby'},
        {rank: 2, category: 'Baby Health Care Products'},
        {rank: 2, category: 'Baby Teether Toys'},
      ],
      dimensions: {x: 4.3, z: 0.4, y: 7.9, units: 'inches'},
      storedDate: 1568771788544,
    },
  ],
]);

const app = express();
app.use(cors());

/* --- All items --- */

/** Get all stored items. */
app.get('/item', (_req, res, next) => {
  console.log('GET /item');

  try {
    // TODO: Get items from DB.
    const returnVal = Array.from(mockItems.values());
    console.log(returnVal);
    res.send(returnVal);
  } catch (error) {
    next(error);
  }
});

/** Delete all stored items. */
app.delete('/item', (_req, res, next) => {
  console.log('DELETE /item');

  try {
    // TODO: Delete items in DB.
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
    // TODO: Get items from DB, or null/undefined if none.
    const item = mockItems.get(asin);
    if (item) {
      console.log('Item is already saved, returning.');
      console.log(item);
      res.send(item);
    } else {
      const amazonItem = await scrapeByAsin(asin);
      console.log('Item scraped, returning.');
      // TODO: store item, then return with stored date.
      console.log(amazonItem);
      res.send(amazonItem);
    }
  } catch (error) {
    next(error);
  }
});

/** Delete an item by asin. */
app.delete('/item/:asin', (req, res, next) => {
  const asin = req.params.asin;
  console.log(`DELETE /item/${asin}`);

  try {
    if (mockItems.has(asin)) {
      // TODO: delete.
      res.status(204).send();
    } else {
      throw new Error('Item does not exist.');
    }
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
