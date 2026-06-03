import React from "react";

const ProductCard = ({ product }) => {
  const {
    title,
    image,
    price,
    category,
    description,
    rating,
  } = product;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">

      {/* Product Image */}
      <div className="h-64 bg-gray-100 p-5 flex items-center justify-center">
        <img
          src={image}
          alt={title}
          className="h-full object-contain"
        />
      </div>

      {/* Product Content */}
      <div className="p-5">

        {/* Category */}
        <span className="inline-block px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-600 rounded-full capitalize">
          {category}
        </span>

        {/* Title */}
        <h2 className="mt-3 text-lg font-bold text-gray-800 line-clamp-2">
          {title}
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm text-gray-500 line-clamp-3">
          {description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-4">
          <span className="text-yellow-500">
            {"⭐".repeat(Math.round(rating.rate))}
          </span>
          <span className="text-sm text-gray-600">
            ({rating.rate}) • {rating.count} reviews
          </span>
        </div>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-5">
          <h3 className="text-2xl font-bold text-green-600">
            ${price}
          </h3>

          <button className="px-4 py-2 bg-black text-white cursor-pointer rounded-lg hover:bg-gray-800 transition">
            Add Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
