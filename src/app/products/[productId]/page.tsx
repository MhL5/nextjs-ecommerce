import PriceTag from "@/components/PriceTag";
import prisma from "@/lib/db/prisma";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";

type PageProps = {
  params: { productId: string };
};

// automatic caching only happens for fetch so here we have cache it manually
const getProducts = cache(async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) notFound();
  return product;
});

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { name, description, imageUrl } = await getProducts(params.productId);

  return {
    title: name,
    description: description,
    openGraph: { images: [{ url: imageUrl }] },
  };
}

export default async function Page({ params }: PageProps) {
  const { imageUrl, name, description, price } = await getProducts(
    params.productId,
  );

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
      <Image
        src={imageUrl}
        alt={name}
        width={500}
        height={500}
        className="rounded-lg"
        priority
      />

      <div>
        <h1 className="text-5xl font-bold">{name}</h1>
        <PriceTag price={price} className="badge badge-primary mt-4" />
        <p className="py-6">{description}</p>
      </div>
    </div>
  );
}
