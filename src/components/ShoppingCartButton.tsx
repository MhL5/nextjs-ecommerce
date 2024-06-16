"use client";

import { ShoppingCart } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import Link from "next/link";

type ShoppingCartButtonProps = { cart: ShoppingCart | null };

export default function ShoppingCartButton({ cart }: ShoppingCartButtonProps) {
  function closeDropDown() {
    const elem = document.activeElement as HTMLElement;
    if (elem) elem.blur();
  }

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-circle btn-ghost">
        <div className="indicator">
          🛒
          <span className="badge indicator-item badge-sm">
            {cart?.size ?? 0}
          </span>
        </div>
      </label>

      <div
        tabIndex={0}
        className="card dropdown-content card-compact z-30 mt-3 w-52 bg-base-200 shadow"
      >
        <div className="card-body">
          <span className="text-lg font-bold">{cart?.size ?? 0} items</span>
          <span className="text-info">
            Sub total: {formatPrice(cart?.subTotal ?? 0)}
          </span>
          <div className="card-actions">
            <Link
              className="btn btn-primary btn-block"
              href="/cart"
              onClick={closeDropDown}
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
