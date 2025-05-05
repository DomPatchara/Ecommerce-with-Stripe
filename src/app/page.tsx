import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Carousel from "@/components/Carousel";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 3,
  });

  return (
    <div className="px-7 sm:px-[6%] md:px-[7%] lg:px-[10%] mt-6">
      <section className="rounded bg-neutral-100 py-8 sm:py-12">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 items-center justify-items-center gap-8 px-8 sm:px-16">

          {/** Text  */}
          <div className="max-w-md space-y-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Welcome to My Ecommerce
            </h2>
            <p className="text-neutral-600">
              Discover the latest product at the best prices.
            </p>
            <Button
              asChild
              variant={"default"}
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-black text-white"
            >
              <Link href="/products">Browse All Products</Link>
            </Button>
          </div>

          {/** Image  */}
          <Image
            priority
            alt="Banner Image"
            width={450}
            height={450}
            src={products.data[0].images[0]}
            className="rounded"
          />
        </div>
      </section>
      <section className="py-8"> 
        <Carousel products={products.data} />
      </section>
    </div>
  );
}
