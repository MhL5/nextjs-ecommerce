import { cookies } from "next/headers";
import prisma from "./prisma";
import { Cart, CartItem, Prisma } from "@prisma/client";
import { auth } from "../../../auth";

export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;
export type CartWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;
export type ShoppingCart = CartWithProducts & {
  size: number;
  subTotal: number;
};

export async function getCart(): Promise<ShoppingCart | null> {
  const session = await auth();
  let cart: CartWithProducts | null = null;

  if (session?.user?.id) {
    cart = await prisma.cart.findFirst({
      where: { userId: session.user.id },
      include: { items: { include: { product: true } } },
    });
  } else {
    const localCartId = cookies().get("localCartId")?.value;
    cart = localCartId
      ? await prisma.cart.findUnique({
          where: { id: localCartId },
          include: { items: { include: { product: true } } },
        })
      : null;
  }

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
  const session = await auth();

  let newCart: Cart;

  if (session) {
    newCart = await prisma.cart.create({ data: { userId: session.user?.id } });
  } else {
    newCart = await prisma.cart.create({ data: {} });
    // TODO: this requires encryption + secure settings for production
    cookies().set("localCartId", newCart.id);
  }

  return { ...newCart, items: [], size: 0, subTotal: 0 };
}

export async function mergeAnonymousCartIntoUserCart(userId: string) {
  const localCartId = cookies().get("localCartId")?.value;

  const anonymousCart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: { items: true },
      })
    : null;

  if (!anonymousCart) return null;

  const userCart = await prisma.cart.findFirst({
    where: { userId },
    include: { items: true },
  });

  await prisma.$transaction(async (xt) => {
    if (userCart) {
      const mergedCartItems = mergeCartItems(
        anonymousCart.items,
        userCart.items,
      );

      await xt.cartItem.deleteMany({ where: { cartId: userCart.id } });
      await xt.cartItem.createMany({
        data: mergedCartItems.map((item) => ({
          cartId: userCart.id,
          productId: item.productId,
          quantity: item.quantity,
        })),
      });
    } else {
      await xt.cart.create({
        data: {
          userId,
          items: {
            createMany: {
              data: anonymousCart.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });
    }

    await xt.cart.delete({ where: { id: anonymousCart.id } });
    cookies().set("localCartId", "");
  });
}

function mergeCartItems(...cartItems: CartItem[][]) {
  return cartItems.reduce((acc, items) => {
    items.forEach((item) => {
      const existingItems = acc.find((i) => i.productId === item.productId);
      if (existingItems) existingItems.quantity += item.quantity;
      else acc.push(item);
    });

    return acc;
  }, [] as CartItem[]);
}
