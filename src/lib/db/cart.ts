import { cookies } from "next/headers";
import prisma from "./prisma";
import { Prisma } from "@prisma/client";

export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;
export type ShoppingCart = CartWithProducts & {
  size: number;
  subTotal: number;
};

export async function getCart(): Promise<ShoppingCart | null> {
  const localCartId = cookies().get("localCartId")?.value;
  const cart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: { items: { include: { product: true } } },
      })
    : null;

  if (!cart) return null;

  return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subTotal: cart.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    ),
  };
}

export async function createCart(): Promise<ShoppingCart> {
  const newCart = await prisma.cart.create({ data: {} });

  // TODO: this requires encryption + secure settings for production
  cookies().set("localCartId", newCart.id);

  return { ...newCart, items: [], size: 0, subTotal: 0 };
}
