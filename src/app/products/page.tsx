import React from 'react'
import { stripe } from '@/lib/stripe'
import ProductList from '@/components/ProductList'

const ProductPage = async () => {

    const products = await stripe.products.list({
        expand: ["data.default_price"]
    })
  return (
    <div className='px-[5%] sm:px-[6%] md:px-[8%] lg:px-[10%] mt-5'>
        <h1 className='text-[36px] font-bold text-center'>All Products</h1>
        <ProductList products={products.data}/>
    </div>
  )
}

export default ProductPage