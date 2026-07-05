import mongoose from "mongoose";
import type { ICat } from "../types/cates.types.ts";

const catSchema = new mongoose.Schema<ICat>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    breed: {
      type: String,
      required: [true, "Breed is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    lifeSpan: {
      type: Number,
      required: [true, "LifeSpan is required"],
    },
    energyLevel: {
      type: String,
      required: [true, "Energy Level is required"],
    },
    kidsFriendly: {
      type: Boolean,
      default: true,
    },
    apartmentFriendly: {
      type: Boolean,
      default: true,
    },
    image: String,
    color: String,
  },
  {
    timestamps: true,
  },
);

const CatModel = mongoose.model("Cat", catSchema);

export default CatModel;
