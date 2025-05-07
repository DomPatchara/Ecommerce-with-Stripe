import React from 'react'
import { stripe } from '@/lib/stripe';
import ProductDetail from '@/components/ProductDetail';

interface ProductProps {
    params : Promise<{ id: string }>
}

const ProductPage = async ( { params }: ProductProps) => {
    const { id } = await params // ดึง dinamic id มา
    const productId = id 
    const product =  await stripe.products.retrieve(productId, {    // retrieve คือ fetch "one object" -- ส่วนใหญ่ใช้กับ fetch specific id
        expand: ["default_price"]  // ขอข้อมูลเพิ่มเติมส่วนของ Price จะได้ดึงมาใช้ได้
    })

    const plainProduct = JSON.parse(JSON.stringify(product))
    
  return (
    <div>
        <ProductDetail product={plainProduct}/>
    </div>
  )
}

export default ProductPage