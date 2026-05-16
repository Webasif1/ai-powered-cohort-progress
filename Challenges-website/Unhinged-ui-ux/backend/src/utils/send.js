const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

const products = [
  {
    name: "Quantum Bluetooth Toothbrush Pro Max Ultra",
    price: 29.99,
    fakeOriginalPrice: 299.99,
    image: "https://picsum.photos/seed/1/300/300",
    stock: 1,
    rating: 4.9,
    fakeReviews: 18472,
  },
  {
    name: "AI-Powered Organic Artisanal Pen",
    price: 9.99,
    fakeOriginalPrice: 89.99,
    image: "https://picsum.photos/seed/2/300/300",
    stock: 1,
    rating: 4.8,
    fakeReviews: 6391,
  },
  {
    name: "Smart Hydration Reminder Cup",
    price: 49.99,
    fakeOriginalPrice: 499.99,
    image: "https://picsum.photos/seed/3/300/300",
    stock: 1,
    rating: 5.0,
    fakeReviews: 99999,
  },
  {
    name: "Nano Fiber Ergonomic Mouse Pad",
    price: 19.99,
    fakeOriginalPrice: 179.99,
    image: "https://picsum.photos/seed/4/300/300",
    stock: 1,
    rating: 4.7,
    fakeReviews: 3241,
  },
  {
    name: "Blockchain-Verified Sticky Notes",
    price: 14.99,
    fakeOriginalPrice: 149.99,
    image: "https://picsum.photos/seed/5/300/300",
    stock: 1,
    rating: 4.6,
    fakeReviews: 11082,
  },
  {
    name: "Organic WiFi Signal Booster Crystal",
    price: 39.99,
    fakeOriginalPrice: 399.99,
    image: "https://picsum.photos/seed/6/300/300",
    stock: 1,
    rating: 5.0,
    fakeReviews: 42069,
  },
];

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/uxcrimes")
  .then(async () => {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Seeded!");
    process.exit();
  });
