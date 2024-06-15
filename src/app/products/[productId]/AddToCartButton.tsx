"use client";

import { useState, useTransition } from "react";
import { incrementProductQuantity } from "./actions";

type AddToCartButtonProps = {
  productId: string;
};

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <button
        className="btn btn-primary"
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await incrementProductQuantity(productId);
            setSuccess(true);
          });
        }}
      >
        Add to cart 🛒
      </button>

      {isPending && <span className="loading loading-spinner loading-md" />}
      {!isPending && success && (
        <span className="text-success">Added to cart.</span>
      )}
    </div>
  );
}
