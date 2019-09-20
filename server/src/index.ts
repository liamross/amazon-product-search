import cors from 'cors';
import express from 'express';
import {AmazonItem} from '../../shared/types';

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

/* --- All items --- */

app.use(cors());

app.get('/item', (_req, res) => res.send(Array.from(mockItems.values())));

app.delete('/item', (_req, res) => {
  // TODO: delete.
  res.status(204).send();
});

/* --- Specific item --- */

app.get('/item/:asin', (req, res) => {
  const item = mockItems.get(req.params.asin);
  if (item) {
    res.send(item);
  } else {
    // TODO: crawl the item.
  }
});

app.delete('/item/:asin', (req, res) => {
  if (mockItems.has(req.params.asin)) {
    // TODO: delete.
    res.status(204).send();
  } else {
    res.status(404).send('Item does not exist.');
  }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
