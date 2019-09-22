import {AmazonItem} from '../../../shared/types';
import {Item} from '../models/amazon_item';

export function parseItem(item: Item): AmazonItem {
  return {
    ...item,
    category: JSON.parse(item.category) as AmazonItem['category'],
    rank: JSON.parse(item.rank) as AmazonItem['rank'],
    dimensions: JSON.parse(item.dimensions) as AmazonItem['dimensions'],
    storedDate: Number(item.storedDate),
  };
}
