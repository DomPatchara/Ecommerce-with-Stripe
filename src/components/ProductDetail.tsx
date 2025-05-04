"use client";

import React from "react";
import Stripe from "stripe";
import Image from "next/image";
import { Button } from "./ui/button";
import useCartStore from "@/store/store";

interface Props {
  product: Stripe.Product;
}

const ProductDetail = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;

  const { items, addItem, removeItem } = useCartStore();
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const onAddItem = () => {
    addItem({
      // (item)
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: 1,
    });
  };
  return (
    <div className="h-[calc(100vh-60px)] w-full flex items-center justify-center">
      <div className="border rounded-2xl shadow-2xl w-[80%] h-[80%] p-5 flex flex-col md:flex-row gap-6">
        {/** 1. Image Product */}
        {product.images && product.images[0] && (
          <div className="relative h-full w-full md:w-[50%]">
            <Image
              priority
              alt={product.name}
              src={product.images[0]}
              fill // like absolute
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="group-hover:opacity-90 transition-opacity duration-500 ease-in-out rounded-lg object-cover"
            />
          </div>
        )}

        {/** 2. Text Content & Button*/}
        <div className="w-full md:w-[50%] flex flex-col gap-6 justify-center">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            {product.description && <p>{product.description}</p>}

            {price && price.unit_amount && (
              <p className="text-lg text-gray-900 font-semibold">
                {price.unit_amount / 100} Bath
              </p>
            )}
          </div>

          <div className="flex gap-5 items-center justify-center">
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => removeItem(product.id)}
            >
              -
            </Button>
            <span className="text-lg font-semibold"> {quantity} </span>
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={onAddItem}
            >
              +
            </Button>
          </div>

          {/**Add to Cart */}
          <div className="flex w-full justify-center">
            <Button className="cursor-pointer w-60">Add to Cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
