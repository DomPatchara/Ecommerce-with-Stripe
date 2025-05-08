"use client"

import React from "react";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import useCartStore from "@/store/store";

const Navbar = () => {

  const { items } = useCartStore();
  const count = items.reduce((sum, item) => sum + item.quantity, 0 );

  return (
    <nav className="px-[7%] sticky top-0 z-50 bg-white shadow font-semibold">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 font-semibold">
        <Link href="/" className="hover:text-blue-600 ">
          My Ecommerce
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/products" className="hover:text-blue-600">
            Product
          </Link>
          <Link href="/checkout" className="hover:text-blue-600">
            Checkout
          </Link>
        </div>
        <div className="">
          <Link href="/checkout" className="relative">
            <FaShoppingCart size={25} />
            <span className="absolute bottom-0 right-0 leading-3.5 text-center text-green-800 font-bold text-[10px]  translate-x-1 size-3.5 rounded-full bg-gray-300">
              {count}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
