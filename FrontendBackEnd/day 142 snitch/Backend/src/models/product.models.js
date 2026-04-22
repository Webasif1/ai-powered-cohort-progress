import mongoose from "mongoose";
import priceSchema from "./price.schema.js";

const productSchema = new mongoose.Schema(
  {
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
      type: priceSchema,
      require: [true, "Price is require"],
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
    variants: [
      {
        image: {
          url: {
            type: String,
            require: [true, "Image url is require"],
          },
          alt: {
            type: String,
            require: [true, "Image alt is require"],
          },
        },
        stock: {
          type: Number,
          require: [true, "Stock is require"],
        },
        price: {
          type: priceSchema,
        },
      },
    ],
  },
  { timestamps: true },
);

const productModel = mongoose.model("product", productSchema);

export default productModel;
