const express = require("express");
const router = express.Router();
// Uncomment when running locally
// require("dotenv").config();

router.get("/test", (req, res) => {
  res.send("Banner route testing");
});

const { Banner } = require("../../models/model");

router.get("/", (req, res) => {
  Banner.find()
    .then((banners) => res.json(banners))
    .catch((err) =>
      res.status(404).json({ nobannersfound: "No banners found" })
    );
});

module.exports = router;
