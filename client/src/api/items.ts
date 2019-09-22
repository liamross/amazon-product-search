import {AmazonItem} from '../../../shared/types';
import {Include} from '../../../shared/typeUtils';

const SERVER = process.env.REACT_APP_API_ROOT;

export type AmazonListItem = Include<AmazonItem, 'asin' | 'imgUrl' | 'name'>;

export async function getAllItems() {
  const response = await fetch(`${SERVER}/item`);
  if (response.status !== 200) {
    console.error(`Status code: ${response.status}`);
    throw new Error(response.status.toString());
  }
  const items: AmazonListItem[] = await response.json();
  return items;
}

export async function deleteAllItems() {
  const response = await fetch(`${SERVER}/item`, {method: 'DELETE'});
  if (response.status !== 204) {
    console.error(`Status code: ${response.status}`);
    throw new Error(response.status.toString());
  }
  return true;
}

export async function getItemByAsin(asin: string) {
  const response = await fetch(`${SERVER}/item/${asin}`);
  if (response.status !== 200) {
    console.error(`Status code: ${response.status}`);
    throw new Error(response.status.toString());
  }
  const item: AmazonItem = await response.json();
  return item;
}

export async function deleteItemByAsin(asin: string) {
  const response = await fetch(`${SERVER}/item/${asin}`, {method: 'DELETE'});
  if (response.status !== 204) {
    console.error(`Status code: ${response.status}`);
    throw new Error(response.status.toString());
  }
  return true;
}
