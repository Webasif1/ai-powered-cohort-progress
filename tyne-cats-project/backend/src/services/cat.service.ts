import CatModel from "../models/cate.model.ts";

//create service
export const createCatService = async (payload: object) => {
  return await CatModel.create(payload);
};

//getAllCat service
export const getAllCatsService = async () => {
  return await CatModel.find();
};

//getSingleCat service
export const getSingleCatService = async (id: string) => {
  return await CatModel.findById(id);
};

//Search Cat Service
export const searchCatsService = async (query: string) => {
  return await CatModel.find({
    $or: [
      {
        name: {
          $regex: query,
          $options: "i",
        },
        breed: {
          $regex: query,
          $options: "i",
        },
      },
    ],
  });
};

//Cat recommended Service
export const recommendService = async (kidsFriendly:boolean, apartmentFriendly:boolean) => {
  return await CatModel.find({
    kidsFriendly,
    apartmentFriendly
  });
};
