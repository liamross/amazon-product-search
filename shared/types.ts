export interface Dimensions {
  /** Width when looking from the front. */
  x: number;
  /** Depth when looking from the front. */
  z: number;
  /** Height when looking from the front. */
  y: number;
  /** The units of measurement used for the item. */
  units: string;
}

export interface Rank {
  /** The rank number. */
  rank: number;
  /** The category of the rank. */
  category: string;
}

export interface AmazonItem {
  /** The asin number of the item. */
  asin: string;
  /** The name of the item. */
  name: string;
  /** Item preview url. */
  imgUrl: string;
  /** Array of categories from least to most specific. */
  category: string[];
  /** Rank within various categories */
  rank: Rank[];
  /** Dimensions of the product. */
  dimensions: Dimensions;
  /** The stored date of the item. */
  storedDate: number;
}
