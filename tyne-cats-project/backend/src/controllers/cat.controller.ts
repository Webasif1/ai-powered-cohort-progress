import type { Request, Response } from "express";
import {
  createCatService,
  getAllCatsService,
  getSingleCatService,
  recommendService,
  searchCatsService,
} from "../services/cat.service.ts";

export const createCatController = async (req: Request, res: Response) => {
  const result = createCatService(req.body);

  return res.status(201).json({
    success: true,
    message: "Cat Created",
    data: result,
  });
};

export const getAllCatsController = async (req: Request, res: Response) => {
  const result = getAllCatsService();

  return res.status(200).json({
    success: true,
    message: "Cats fetched successfully",
    data: result,
  });
};

export const getSingleCatController = async (req: Request, res: Response) => {
  const result = getSingleCatService(req.body);

  return res.status(200).json({
    success: true,
    message: "Cat fetched successfully",
    data: result,
  });
};

export const searchCatsController = async (req: Request, res: Response) => {
  let q = req.query.q as string;
  const result = searchCatsService(q);

  return res.status(200).json({
    success: true,
    message: "Cat successfully fetched..",
    data: result,
  });
};

export const recommendCatsController = async (req: Request, res: Response) => {
  const {kidsFriendly,apartmentFriendly} = req.body
  const result = await recommendService(kidsFriendly,apartmentFriendly);

    return res.status(200).json({
    success: true,
    message: "Cat successfully fetched..",
    data: result,
  });
};
