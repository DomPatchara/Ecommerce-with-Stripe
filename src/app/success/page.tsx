"use client";

import React from "react";
import Link from "next/link";
import { useEffect } from "react";
import useCartStore from "@/store/store";

const SuccessPage = () => {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);
  return (
    <div className="w-screen h-[80vh] flex flex-col items-center justify-center gap-5">
      <div className="text-center text-2xl font-semibold">
        <h1 className="text-green-600">Payment successfull !</h1>
        <p className="text-gray-700"> Thank you for purchase. Your order is being processed.</p>
      </div>

      <Link href="/products" className="px-4 py-2 bg-gray-500 rounded-2xl text-white hover:bg-gray-600">Continue Shopping</Link>
    </div>
  );
};

export default SuccessPage;
