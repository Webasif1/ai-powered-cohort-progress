import productModel from "../models/product.models.js";
import { uploadFile } from "../services/store.service.js";

export async function createProduct(req, res) {
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
    const product = await productModel.create({
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

export async function getSellerProducts(req, res) {
  const seller = req.user;
  try {
    const products = await productModel.find({ seller: seller._id });
    return res.status(200).json({
      message: "Seller products fetched successfully",
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getAllProducts(req, res) {
  try {
    const products = await productModel.find();
    return res.status(200).json({
      message: "All products fetched successfully",
      success: true,
      products,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error:" + err });
  }
}

export async function getSingleProduct(req, res) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Product ID is required" });
  }
  try {
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({
      message: "Product fetched successfully",
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function addProductVariant(req,res){
  const files = req.files;
  const images = [];

  if(files || files.length !== 0){
    await Promise.all(
      files.map(async(file)=>{
        const image = await uploadFile({
          buffer: file.buffer,
          fileName: file.originalname
        })
      })
    ).map(image => images.push(image))
  }
}
