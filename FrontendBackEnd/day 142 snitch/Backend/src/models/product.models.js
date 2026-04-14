import mongoose from "mongoose";

const productSchema = mongoose.schema({
  title: {
    type: String,
    required: [true, "Product title is require"],
  },
  description: {
    type: String,
    require: [true, "Product description is require"],
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: [true, "Seller is require"],
  },
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
  images: [
    {
      url: {
        type: String,
        require: [true, "Image url is require"],
      },
      alt: {
        type: String,
        require: [true, "Image alt is require"],
      },
    },
  ],
});

const produntModel = monggose.model("product", productSchema);

export default produntModel;
