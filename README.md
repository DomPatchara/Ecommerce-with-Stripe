# Eccomerce with Stripe ( Next.JS )
  Intregation Eccomerce กับ ระบบบริการชำระเงินของ Stripe โดยใช้ Next.JS

## Why we should use Stripe payment  ?

- เป็นระบบบริการชำระเงินที่ง่าย และ intregate ง่ายสำหรับ developer
- Support การชำระเงินหลายรูปแบบ — Card, Promptpay, Wallet, etc…
- **Admin Dashboard** — add products  + summary transaction
- **Secure** — จัดการตาม Security rule credit/debit card ให้ทุกอย่าง

---

## 💸 Stripe Fees ( for 2025 )

> **3.65% + ฿10.00  per successful transaction**
> 

---

## ⚙️ Stripe Intregation ( 5 Steps )

### [ 1 . ] สร้างบัญชี Stripe — Login

 https://dashboard.stripe.com/

### [ 2. ] Get API Key

- สำหรับ API Key จะอยู่หน้า dashboard เลย —> เราจะใช้ตัว Test key สำหรับ Developer
  > ขึ้นต้นด้วย xx_test_ = **Test key**
  
    - Publishable key ( client side )  : eg. pk_test_dfsfsdg…
    - Secret key  ( server side ) :  eg. sk_test_51RKFQ62cj…
    
### [ 3. ] เลือกวิธี Intregation methods (2)

  3.1 /  **Stripe Checkout**  — ใช้ UI page payment จาก Stripe เลย ( ง่ายกว่า ) ✅
  
  3.2 /  **Stripe Elements** — สำหรับ Custom UI payment page เอง 

### [ 4. ] 🧪 Testing

  สำหรับ test ว่าระบบชำระเงินใช้ได้ไหม ? —>  โดยใส่ test card number  + fake ข้อมูลอะไรก็ได้ 

// after success payment // 
หลังจากชำระเสร็จก็ควรส่ง user ไป success page ( custom by frontend ) ต่อ

 https://docs.stripe.com/testing

> **Test card number** : 4242 4242 4242 4242
> Test ชำระเงินโดยไม่ใช้เงินจริง

### [ 5. ]  Go Live
  ใส่ “Live key” แทน Test key

- **ใช้ sk_live_**  แทน ~~sk_test_~~

### How to get Live key ?

   [ 5.1 ] : ต้อง Verify account ก่อน — กรอกข้อมูล business details ( bank info, taxID, etc… )       

<aside>
  
❗
ถ้าไม่ได้ยืนยันตัวตน หรือ Active payment —  Live mode จะใช้ไม่ได้ ( disable )
  
</aside>

   [ 5.2 ] : Toggle :  Test mode —> Live mode ( อยู่แถบบนๆสักมุมบน dashboard )

   [ 5.3 ] : Get Live key — 

   go to **Developer —> API Keys** 

> กด “reveal live key token”


## 🎯Live Demo ( Test Mode API Key )
https://ecommerce-with-stripe-pi.vercel.app/ 

## 📷 Screen Shot
![image](https://github.com/user-attachments/assets/8a3a45a9-3c49-43ae-8372-34eb2d135a44)
