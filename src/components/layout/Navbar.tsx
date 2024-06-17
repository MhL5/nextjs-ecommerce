import Image from "next/image";
import Link from "next/link";
import logoImg from "@/assets/logo.png";
import { redirect } from "next/navigation";
import { getCart } from "@/lib/db/cart";
import ShoppingCartButton from "../ShoppingCartButton";
import UserMenuButton from "../UserMenuButton";
import { auth } from "../../../auth";

async function searchProducts(formData: FormData) {
  "use server";
  const searchQuery = formData.get("searchQuery")?.toString();
  if (searchQuery) redirect(`/search?query=${searchQuery}`);
}

export default async function Navbar() {
  const cart = await getCart();

  const session = await auth();

  return (
    <nav className="bg-base-200">
      <div className="navbar m-auto max-w-7xl flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost">
            <Image src={logoImg} alt="logo" height={40} width={40} />
            <span className="text-xl font-bold">Ecommerce</span>
          </Link>
        </div>

        <div className="flex-none gap-2">
          <form action={searchProducts}>
            <div className="form-control">
              <input
                type="text"
                name="searchQuery"
                placeholder="Search..."
                className="input input-bordered w-full min-w-[200px]"
              />
            </div>
          </form>

          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session} />
        </div>
      </div>
    </nav>
  );
}
