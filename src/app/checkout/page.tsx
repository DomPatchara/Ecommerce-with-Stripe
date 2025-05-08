"use client";

import React from "react";
import useCartStore from "@/store/store";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { checkoutAction } from "./checkout-action";
import Link from "next/link";

const CheckoutPage =  () => {
  const { items, addItem, removeItem } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (total === 0 || items.length === 0) {
    return (
      <div className="w-screen h-[80vh] flex flex-col items-center justify-center gap-2">
        <h1 className="text-2xl font-bold text-gray-800">
          Your Cart is Empty !
        </h1>
        <Link
          href="/products"
          className="px-4 py-2 bg-gray-500 rounded-2xl hover:bg-gray-600 text-lg font-semibold text-white"
        >
          Select some products
        </Link>
      </div>
    );
  }
  return (
    <div className="px-[7%] py-10 h-[calc(100vh-60px)] w-screen flex flex-col justify-center items-center gap-3 overflow-hidden">
      <h1 className="text-3xl font-bold text-center"> Checkout </h1>
      <Card className="md:w-xl mx-auto overflow-y-auto">
        <CardHeader className="p-2 bg-gray-100 rounded-xl">
          <CardTitle className="text-2xl font-bold px-8">
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b pb-4"
              >
                {/**Image */}
                <div className="relative h-30 w-30">
                  {item.imageUrl && (
                    <Image
                      alt={item.name}
                      src={item.imageUrl}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover rounded-2xl"
                    />
                  )}
                </div>

                {/** Name & Button */}
                <div className="flex flex-col items-center justify-center gap-2 w-48">
                  <span className="font-bold">{item.name}</span>
                  <div className="flex gap-5 items-center justify-center">
                    <Button
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => removeItem(item.id)}
                    >
                      -
                    </Button>
                    <span className="text-lg font-semibold">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => addItem({ ...item, quantity: 1 })}
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/** Item Price */}
                <span className="text-lg font-semibold">
                  {((item.price * item.quantity) / 100).toLocaleString()} Bath
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      {/** Total All Price */}
      <div className="w-sm md:w-xl py-2 rounded-2xl bg-gray-100 text-xl font-bold text-center mt-5">
        Total: {(total / 100).toLocaleString()} Bath
      </div>

      {/** Payment Button */}
      <form action={checkoutAction} className="w-sm md:w-xl mx-auto">
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <Button
          type="submit"
          variant={"default"}
          className="cursor-pointer w-full text-xl font-semibold py-5"
        >
          Proceed to Payment
        </Button>
      </form>
    </div>
  );
};

export default CheckoutPage;
