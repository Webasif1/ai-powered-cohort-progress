import mongoose from "mongoose";
import priceSchema from "./price.schema.js";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
    },
    description: {
      type: String,
      required: [true, "Product description is require"],
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Seller is required"],
    },
    price: {
      type: priceSchema,
      required: [true, "Price is required"],
    },
    images: [
      {
        url: {
          type: String,
          required: [true, "Image url is required"],
        },
      },
    ],
    variants: [
      {
        image: {
          url: {
            type: String,
            required: [true, "Image url is required"],
          },
        },
        stock: {
          type: Number,
          required: [true, "Stock is required"],
        },
        attributes:{
          type:Map,
          of:String,
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
