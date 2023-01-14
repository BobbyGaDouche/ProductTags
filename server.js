const express = require("express");
const cors = require("cors");
const request = require("request");

const app = express();
app.use(cors());

const accessToken = "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";
const productId = 7965002858709;

app.get("/tag-product", (req, res) => {
  request.put(
    {
      url: `https://brewedonline.myshopify.com/admin/api/2021-01/products/${productId}/tags.json`,
      headers: {
        "X-Shopify-Access-Token": accessToken,
        "Content-Type": "application/json"
      },
      json: { tags: "tagged" }
    },
    (error, response, body) => {
      if (error) {
        return res.status(500).json({ error });
      }
      res.json({ message: "Product tagged successfully" });
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
