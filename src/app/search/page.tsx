import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/db/prisma";
import { title } from "process";

type PageProps = {
  searchParams: { query: string };
};

export function generateMetadata({ searchParams: { query = `` } }: PageProps) {
  return { title: `search: ${query}` };
}

export default async function Page({
  searchParams: { query = `` },
}: PageProps) {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { id: "desc" },
  });

  if (products.length === 0)
    return <div className="text-center">not products found</div>;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
