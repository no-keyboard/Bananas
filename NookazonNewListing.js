const puppeteer = require('puppeteer');
 
const initBrowser = async () => {
      const browser = await puppeteer.launch({
        //headless: false,
        executablePath: 'chromium-browser',
        defaultViewport: null
      });
      const page = (await browser.pages())[0];
      await page.goto('https://nookazon.com/product/2130270020');
      //await page.waitForSelector('div .listing-table');
      // let testvar = await page.$('div .listing-table');

      let prevListing = {};

      while(0 != 1) {
        await page.reload();

        result = await page.evaluate(() => {         
          let latestListing = document.querySelector('div.listing-table > div.row > :first-child > div.listing-content > div.listing-item-link > div.listing-product-info');
          let listingName = latestListing.querySelector('div > a').innerText;
          let listingId = latestListing.querySelector('div > a').href;
          let listingPrice = latestListing.querySelector(':scope div div div div a').innerText;

          let latestListingJson = {
              "url": listingId,
              "item": listingName,
              "price": listingPrice
          }

          return latestListingJson;
        });

        let now = new Date();
        let timestamp = ("0" + now.getHours()).slice(-2)   + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2);

        if(prevListing.url != result.url) {
          prevListing = Object.assign({}, result);
          console.log(timestamp, "NEW LISTING!", result);
        } else {
          console.log(timestamp, 'Nothing new this time. :(');
        }

        await page.waitFor(20000);
      }
}

initBrowser();
