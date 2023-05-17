const express = require("express");
const router = express.Router();

const { Product } = require("../../models/model");
router.get("/test", (req, res) => {
  res.send("Product route testing");
});

router.get("/", (req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) =>
      res.status(404).json({ noproductsfound: "No products found" })
    );
});

router.get("/:slug", (req, res) => {
  Product.findOne({ slug: req.params.slug })
    .then((product) => res.json(product))
    .catch((err) =>
      res.status(404).json({ nosuchproduct: "No Product found" })
    );
});

module.exports = router;
