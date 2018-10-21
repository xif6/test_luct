const express = require('express');

const ParserCultbeauty = require('./component/ParserCultbeauty');
const Store = require('./Store');

const store = new Store();
const parserCultbeauty = new ParserCultbeauty(store);

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    let products = await store.getAllProducts();
    res.header('Access-Control-Allow-Origin', '*');
    return res.json(products);
});

app.get('/scrap', async (req, res) => {
    let products = await parserCultbeauty.scrap();
    res.header('Access-Control-Allow-Origin', '*');
    return res.json(products);
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));