import { getCart } from "@/lib/db/cart";
import CartEntry from "./CartEntry";
import { formatPrice } from "@/lib/format";

export const metadata = {
  title: "Cart",
};

export default async function Page() {
  const cart = await getCart();

  return (
    <div>
      <h1 className="mb-6 border-b-2 border-gray-700 pb-2 text-3xl font-bold">
        Shopping cart
      </h1>

      {cart?.items.map((cartItem) => (
        <CartEntry cartItem={cartItem} key={cartItem.id} />
      ))}

      {!cart?.items.length && <p>Your cart is empty</p>}

      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total: {formatPrice(cart?.subTotal || 0)}
        </p>
        <button className="btn btn-primary sm:w-[200px]">Checkout</button>
      </div>
    </div>
  );
}
