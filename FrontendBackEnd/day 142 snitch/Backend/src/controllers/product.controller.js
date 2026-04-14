import produntModel from "../models/product.models.js";
import { uploadFile } from "../services/store.service.js";

export async function createProductController(req, res) {
  const { title, description, price } = req.body;
  const seller = req.user;
  const images = await Promise.all(
    req.files.map(async (file) => {
      return await uploadFile({
        buffer: file.buffer,
        fileName: file.originalname,
      });
    }),
  );
  try {
    const product = await produntModel.create({
      title,
      description,
      price: {
        amount: price,
        currency: "INR",
      },
      seller: seller._id,
      images,
    });
    return res
      .status(201)
      .json({ message: "Product created successfully", product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
