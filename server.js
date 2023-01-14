const express = require("express");
const cors = require("cors");
const request = require("request");
const app = express();

app.use(cors({ origin: "https://brewed.online" }));
app.get('/', (req, res, next) => {

    res.status(200).json({
        status: 'success',
        data: {
            name: 'name of your app',
            version: '0.1.0'
        }
    });

});
app.put("/update-product-tags", (req, res) => {
  const accessToken = "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";
  const productId = req.body.productId;
  const tags = req.body.tags;

  const options = {
    method: "PUT",
    url: `https://www.brewed.online/admin/api/2021-01/products/${productId}/tags.json`,
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken
    },
    body: JSON.stringify({ tags: tags })
  };

  request(options, (error, response) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(response);
    }
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});






