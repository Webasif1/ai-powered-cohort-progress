import Link from "next/link";

const ProductCard = ({ product }) => {
  const { title, image, price, category, description, rating, id } = product;

  return (
    <div className="bg-card text-card-foreground border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">

      {/* Product Image */}
      <div className="h-64 bg-muted p-5 flex items-center justify-center overflow-hidden">
        <Link
          href={`/products/${id}`}
          className="w-full h-full flex items-center justify-center"
        >
          <img
            src={image}
            alt={title}
            className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
          />
        </Link>
      </div>

      {/* Product Content */}
      <div className="p-5">

        {/* Category */}
        <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium capitalize">
          {category}
        </span>

        {/* Title */}
        <h2 className="mt-3 text-lg font-semibold line-clamp-2">
          {title}
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-4">
          <span>
            {"⭐".repeat(Math.round(rating.rate))}
          </span>
          <span className="text-sm text-muted-foreground">
            ({rating.rate}) • {rating.count} reviews
          </span>
        </div>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-5">
          <h3 className="text-2xl font-bold">
            ${price}
          </h3>

          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition">
            Add Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
