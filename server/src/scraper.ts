import puppeteer from 'puppeteer';
import {AmazonItem, Rank} from '../../shared/types';
import {Omit} from '../../shared/typeUtils';

const INFORMATION_TABLE_SELECTOR = 'div.pdTab';

// https://github.com/GoogleChrome/puppeteer/issues/3051

export async function scrapeByAsin(asin: string): Promise<Omit<AmazonItem, 'storedDate'>> {
  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage();
    await page.goto(`https://www.amazon.com/dp/${asin}`);

    // Wait for information table to load before parsing information.
    await page.waitForSelector(INFORMATION_TABLE_SELECTOR);

    const name = await page.evaluate(() => {
      const element = document.getElementById('productTitle') as HTMLSpanElement;
      return element.innerText;
    });

    const imgUrl = await page.evaluate(() => {
      const element = document.getElementById('imgTagWrapperId') as HTMLDivElement;
      const img = element.firstElementChild as HTMLImageElement;
      return img.src;
    });

    const category = await page.evaluate(() => {
      const element = document.getElementById('wayfinding-breadcrumbs_feature_div') as HTMLDivElement;
      const ul = element.firstElementChild as HTMLUListElement;
      const allLIChildren: HTMLLIElement[] = Array.prototype.slice.call(ul.children);
      const textLIChildren = allLIChildren.filter((_li, index) => index % 2 == 0);
      return textLIChildren.map(li => {
        const span = li.firstElementChild as HTMLSpanElement;
        const a = span.firstElementChild as HTMLAnchorElement;
        return a.innerText;
      });
    });

    const rank = await page.evaluate(() => {
      const element = document.getElementById('SalesRank') as HTMLTableRowElement;
      const valueTD = element.querySelectorAll('td')[1];
      const splitRanks = valueTD.innerText.split('\n');
      return splitRanks.map<Rank>(splitRank => {
        const cleanRank = splitRank.split(/\s\(/)[0];
        console.log({cleanRank});
        const [rankString, category] = cleanRank.split(/\sin\s/);
        console.log({rankString, category});
        return {rank: Number(rankString.substring(1)), category};
      });
    });

    const dimensions = await page.evaluate(() => {
      const element = document.querySelectorAll('tr.size-weight')[1] as HTMLTableRowElement;
      const valueTD = element.querySelectorAll('td')[1];
      const dimensionString = valueTD.innerText;
      const [x, z, yAndUnits] = dimensionString.split(/\sx\s/);
      const [y, units] = yAndUnits.split(/\s/);
      return {x: Number(x), z: Number(z), y: Number(y), units};
    });

    await browser.close();

    return {asin, name, imgUrl, category, rank, dimensions};
  } catch (error) {
    console.error(error);
    await browser.close();
    throw new Error();
  }
}
