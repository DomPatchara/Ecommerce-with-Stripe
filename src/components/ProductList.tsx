"use client"

import React from "react";
import Stripe from "stripe";
import ProductCard from "./ProductCard";
import { useState } from "react";

interface Props {
  products: Stripe.Product[];
}

const ProductList = ({ products }: Props) => {

    const [searchTerm, setSearchTerm] = useState<string>("")

    // Filter Product ( match with lower case ) ---> use filter + + includes
    const filterdProduct = products.filter((product)=>{
        const term = searchTerm.toLowerCase(); // ปรับตัวอักษรค้นหาให้เป็น พิมพ์เล็กเหมือนกัน
        
        const nameMatch = product.name.toLowerCase().includes(term);
        const descriptionMatch = product.description ? product.description.toLowerCase().includes(term) : false;

        return nameMatch || descriptionMatch;
    })
  return (
    <div>
      <div className=" my-5 flex justify-center">
        <input
          type="text"
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filterdProduct.map((product, index) => (
          <li key={index}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
