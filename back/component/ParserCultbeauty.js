const axios = require('axios');
const cheerio = require('cheerio');

const site = 'https://www.cultbeauty.co.uk';

class ParserCultbeauty {

    constructor(store) {
        this.store = store;
    };

    async scrap() {
        try {
            const response = await axios.get(site);
            if(response.status === 200) {
                await this.store.removeAllProducts();
                const html = response.data;
                const $ = cheerio.load(html);

                let bestSelling = $('ul[data-list=best-selling] li');
                bestSelling = bestSelling.map(function() {
                    return site + $(this).find('a').attr('href');
                }).get();
                bestSelling = await Promise.all(bestSelling.map((url) => {
                    return this.scrapProduct(url, 'bestSelling');
                }));

                let trending = $('ul[data-list=trending] li');
                trending = trending.map(function() {
                    return site + $(this).find('a').attr('href');
                }).get();
                trending = await Promise.all(trending.map((url) => {
                    return this.scrapProduct(url, 'trending');
                }));

                return [...bestSelling, ...trending];
            }
        } catch (error) {
            console.log(error, 'scrap');
        }

    };

    async scrapProduct(url, type) {
        const response = await axios.get(url);
        try {
            if(response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);

                let product = {
                    'name': $('h1 .productBrandTitle').text(),
                    'photo': $('img.js-big-image').attr('src'),
                    'brand': $('div.productTitle').text(),
                    'description': $('ul.productInfoInner [data-name=description]').parents('li').find('.itemContent').text(),
                    'ingredients': $('ul.productInfoInner [data-name=ingredients]').parents('li').find('.itemContent').text(),
                    'price': $('.price-box .productPrice').text(),
                    'type': type,
                };
                const productId = await this.store.insertProduct(product);
                product._id = productId;
                return product;
            }
        } catch (error) {
            console.log(error, 'scrapProduct');
        }
    };
}

module.exports = ParserCultbeauty;