import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
  price: {
    amount: {
      type: Number,
      require: [true, "Product price is require"],
    },
    currency: {
      type: String,
      enum: [
        "USD",
        "EUR",
        "GBP",
        "JPY",
        "CAD",
        "AUD",
        "CHF",
        "CNY",
        "INR",
        "BDT",
      ],
      default: "BDT",
    },
  },
});

export default priceSchema;
