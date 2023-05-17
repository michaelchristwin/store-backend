const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.ATLAS_URL)
  .then(() => console.log("Connection Successful"))
  .catch((error) => console.error("Couldn't Connect to mongodb", error));

const productSchema = new mongoose.Schema({
  name: String,
  images: [String],
  price: Number,
  details: String,
  slug: String,
});

const bannerSchema = new mongoose.Schema({
  image: String,
  buttonText: String,
  product: String,
  desc: String,
  smallText: String,
  midText: String,
  largeText: String,
  largeText2: String,
  discount: String,
  saleTime: String,
});

const Product = mongoose.model("Product", productSchema, "products");
const Banner = mongoose.model("Banner", bannerSchema, "banners");
module.exports = { Banner, Product };
