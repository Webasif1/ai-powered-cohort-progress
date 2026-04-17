import produntModel from "../models/product.models.js";
import { uploadFile } from "../services/store.service.js";

export async function createProductController(req, res) {
  const { title, description, priceAmount, priceCurrency } = req.body;
  const seller = req.user;
  const images = req.files
    ? await Promise.all(
        req.files.map(async (file) => {
          return await uploadFile({
            buffer: file.buffer,
            fileName: file.originalname,
          });
        }),
      )
    : [];
  console.log(images);
  try {
    const product = await produntModel.create({
      title,
      description,
      price: {
        amount: priceAmount,
        currency: priceCurrency || "BDT",
      },
      images,
      seller: seller._id,
    });
    return res
      .status(201)
      .json({ message: "Product created successfully", product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getSellerProductsController(req, res) {
  const seller = req.user;
  try {
    const products = await produntModel.find({ seller: seller._id });
    return res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
