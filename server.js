const express = require('express');
const request = require('request');
const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req, res, next) => {

    res.status(200).json({
        status: 'success',
        data: {
            name: 'name of your app',
            version: '0.1.0'
        }
    });

});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.put('/tag-product', (req, res) => {
  const { productId, accessToken, tags } = req.body;
  const url = `https://your-store.myshopify.com/admin/api/2021-01/products/${productId}/tags.json`;

  request.put({
    url,
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken
    },
    body: JSON.stringify({ tags })
  }, (err, httpResponse, body) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).send(body);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
