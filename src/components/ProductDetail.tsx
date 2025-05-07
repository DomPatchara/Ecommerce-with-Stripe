"use client";

import React from "react";
import Stripe from "stripe";
import Image from "next/image";
import { Button } from "./ui/button";
import useCartStore from "@/store/store";
import { useState, useEffect } from "react";
import Toastify from "./Toastify";

interface Props {
  product: Stripe.Product;
}

const ProductDetail = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;

  const { addItem } = useCartStore();
  // const cartItem = items.find((item) => item.id === product.id);
  // const quantity = cartItem ? cartItem.quantity : 0;

  const [showToast, setShowToast] = useState(false);
  const [qty, setQty] = useState(0);

  const increment = () => {
    if (qty < 9) {
      setQty((prev) => prev + 1);
    }
  };

  const decrement = () => {
    if (qty > 0) {
      setQty((prev) => prev - 1);
    }
  };

  const onAddItem = () => {
    addItem({
      // (item)
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: qty,
    });

    if ( qty > 0 ) {
      setShowToast(true);
      setQty(0);
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="h-[calc(100vh-60px)] w-full flex items-center justify-center">
      <div className="relative border rounded-2xl shadow-2xl w-[80%] h-[80%] p-5 flex flex-col md:flex-row gap-3">
        {/** 1. Image Product */}
        {product.images && product.images[0] && (
          <div className="relative h-full w-full ">
            <Image
              priority
              alt={product.name}
              src={product.images[0]}
              fill // like absolute
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="group-hover:opacity-90 transition-opacity duration-500 ease-in-out rounded-lg object-cover"
            />
          </div>
        )}

        {/** 2. Text Content & Button*/}
        <div className="h-full w-full  flex flex-col gap-2 justify-center">
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
              onClick={decrement}
            >
              -
            </Button>
            <span className="text-lg font-semibold"> {qty} </span>
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={increment}
            >
              +
            </Button>
          </div>

          {/**Add to Cart */}
          <div className="flex w-full justify-center">
            <Button className="cursor-pointer w-60" onClick={onAddItem}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      
      {/** show notification เมื่อ added สินค้าลงตระกร้าแล้ว */}
      <div className={`${showToast ? 'opacity-100' : 'opacity-0'} duration-500 transition-opacity z-50`}>
        <Toastify message={'Successfully added to cart !'}/>
      </div>
    </div>
  );
};

export default ProductDetail;
