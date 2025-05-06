"use server";

import { CartItem } from "@/store/store"; // Type Item
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export const checkoutAction = async (formData: FormData): Promise<void> => {

  // 1. get data from input field name "items" ---> return เป็น string type เสมอ ต้องแปลงค่าก่อน
  const itemsJSON = formData.get("items") as string;   
  const items = JSON.parse(itemsJSON);         // แปลง string type = '[]' ----->  array type = [] ( เอาไปใช้งาน map ต่อได้ )
  

  // 2. create line_items : map ข้อมูลสินค้าแต่ละชิ้น ( name, price, image, qauntity )
  const line_items = items.map((item: CartItem) => ({
    price_data: {
      currency: "thb",
      product_data: { name: item.name, images: [item.imageUrl] },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  }));

  // 3. create "stripe sessions"
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "promptpay"],
    line_items,
    mode: "payment",

    // 3.1 สร้าง navigate page สำหรับชำระเงินเสร็จ หรือ สำหรับ cancel payment ( Frontend )
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,

    // 3.2 สำหรับต้องการ Address ให้ลูกค้ากรอกที่อยู่ส่งของ
    // billing_address_collection: "required",
    // shipping_address_collection: { allowed_countries: ["TH"] },
  });

    redirect(session.url!);   // sending user ไปยัง Stripe payment page ที่สร้าง UI ไว้เรียบร้อย
};
