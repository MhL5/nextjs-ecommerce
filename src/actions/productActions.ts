"use server";

import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  // todo: data validation ?! :|
  const name = String(formData.get("name"));
  const description = String(formData.get("description"));
  const imageUrl = String(formData.get("imageUrl"));
  const price = Number(formData.get("price"));

  if (!name || !description || !imageUrl || !price)
    throw new Error(
      "Missing required fields: (name, description, imageUrl, price)",
    );

  await prisma.product.create({ data: { description, imageUrl, name, price } });

  redirect("/");
}
