"use client";

import React from "react";
import Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./ui/card";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Props {
  products: Stripe.Product[];
}

const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length); // ex current = 1 และ total products = 5  ===> next (1 + 1) % 5 = 2/5 เศษ 2 // ถ้าเป็น 5/5 เศษ 0 จะ"วนลูป"กลับมาตัวแรก
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

  const currentProduct = products[current];
  const price = currentProduct.default_price as Stripe.Price;

  return (
    <Card className="relative h-80 overflow-hidden rounded-lg shadow-md border-gray-300">
      {currentProduct.images && currentProduct.images[0] && (
        <div className="absolute inset-0">
          <div className="relative h-full w-full">
            <Image
              priority
              alt={currentProduct.name}
              src={currentProduct.images[0]}
              fill
              className="transition-opacity duration-500 ease-in-out object-cover"
            />
          </div>
        </div>
      )}
      <CardContent className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
        <CardTitle className="text-3xl font-bold text-white mb-2">
          {currentProduct.name}
        </CardTitle>
        {price && price.unit_amount && (
          <p className="text-white text-xl">{price.unit_amount / 100} Bath</p>
        )}
      </CardContent>
    </Card>
  );
};

export default Carousel;
