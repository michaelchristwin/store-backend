const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const imageFolderPath = "/home/michael/Documents/Node/ecomm/images/";

app.get("/images", (req, res) => {
  fs.readdir(imageFolderPath, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }

    const images = files.filter((file) => {
      const extension = path.extname(file).toLowerCase();
      return (
        extension === ".jpg" || extension === ".webp" || extension === ".png"
      );
    });

    const imageUrls = images.map(
      (image) => `${req.protocol}://${req.get("host")}/images/${image}`
    );
    res.json(imageUrls);
  });
});

app.use("/images", express.static(imageFolderPath));

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

const products = require("./routes/api/products");
const banners = require("./routes/api/banners");
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/products", products);
app.use("/api/banners", banners);

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}.....`)
);
