const express = require('express');
const request = require('request');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.put('/tag-product', (req, res) => {
  const { productId, accessToken, tags } = req.body;
  const url = `https://brewedonline.myshopify.com/admin/api/2021-01/products/${productId}/tags.json`;

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
