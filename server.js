const express = require('express');
const request = require('request');
const app = express();

app.use(express.json());

app.put('/update-tags', (req, res) => {
    const accessToken = req.headers['x-shopify-access-token'];
    const shop = req.headers['x-shopify-shop-domain'];
    const productId = req.body.productId;
    const newTags = req.body.tags;

    const options = {
        method: 'PUT',
        url: `https://${shop}/admin/api/2021-01/products/${productId}/tags.json`,
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': accessToken
        },
        json: {
            tags: newTags
        }
    };

    request(options, (error, response, body) => {
        if (error) {
            return res.status(500).send(error.message);
        }

        if (response.statusCode !== 200) {
            return res.status(response.statusCode).send(body);
        }

        res.status(200).send(body);
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on port 3000');
});
