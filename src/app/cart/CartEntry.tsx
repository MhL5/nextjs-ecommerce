"use client";

import { CartWithProduct } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { ReactElement, useTransition } from "react";
import { setProductQuantity } from "./actions";

type CartEntryProps = {
  cartItem: CartWithProduct;
};

const quantityOptions: ReactElement[] = Array.from({ length: 99 }).map(
  (_, i) => (
    <option value={i + 1} key={i * i}>
      {i + 1}
    </option>
  ),
);

export default function CartEntry({
  cartItem: { product, quantity },
}: CartEntryProps) {
  const [isPending, startTransition] = useTransition();
  const { imageUrl, name, price, id } = product;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Image
          src={imageUrl}
          alt={name}
          width={200}
          height={200}
          className="rounded-lg"
        />

        <div>
          <Link href={`/products/${product.id}`} className="font-bold">
            {name}
          </Link>

          <div>Price: {formatPrice(price)}</div>

          <div className="my-1 flex items-center gap-2">
            Quantity:
            <select
              className="select select-bordered w-full max-w-[80px]"
              defaultValue={quantity}
              disabled={isPending}
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value);
                startTransition(
                  async () => await setProductQuantity(id, newQuantity),
                );
              }}
            >
              <option value="0">0 (Remove)</option>
              {quantityOptions}
            </select>
          </div>

          <div className="flex items-center gap-2">
            Total: {formatPrice(price * quantity)}
            {isPending && (
              <span className="loading loading-spinner loading-sm" />
            )}
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
}
