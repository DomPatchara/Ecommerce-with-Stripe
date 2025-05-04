import React from "react";
import Stripe from "stripe";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
  product: Stripe.Product;
}

const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;
  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <Card className="group hover:shadow-2xl transition duration-300 py-0 h-full flex flex-col border-gray-300 gap-0">
        {product.images && product.images[0] && (
          <div className="relative h-60 w-full">
            <Image
              priority
              alt={product.name}
              src={product.images[0]}
              fill // like absolute
              className="group-hover:opacity-90 transition-opacity duration-500 ease-in-out rounded-t-lg object-cover"
            />
          </div>
        )}

        <CardHeader className="p-4">
          <CardTitle className="text-xl font-bold text-gray-800">
            {product.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col p-4 justify-between">
          {product.description && (
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
          )}

          {price && price.unit_amount && (
            <p className="text-lg text-gray-900 font-semibold">{price.unit_amount / 100} Bath</p>
          )}
          <Button className="mt-4 bg-black text-white cursor-pointer">View Details</Button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
