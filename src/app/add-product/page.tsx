import { createProduct } from "@/actions/productActions";
import FormSubmitButton from "@/components/FormSubmitButton";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "add product",
};

export default async function Page() {
  const session = await auth();

  if (!session) redirect("/api/auth/signin?callbackUrl=/add-product");
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">add product</h1>
      <form action={createProduct}>
        <input
          type="text"
          required
          name="name"
          placeholder="name"
          className="input input-bordered mb-3 w-full"
        />
        <textarea
          required
          name="description"
          placeholder="description"
          className="textarea textarea-bordered mb-3 w-full text-sm"
        />
        <input
          type="url"
          required
          name="imageUrl"
          placeholder="image url"
          className="input input-bordered mb-3 w-full"
        />
        <input
          type="number"
          required
          name="price"
          placeholder="price"
          className="input input-bordered mb-3 w-full"
        />

        <FormSubmitButton className="btn-block">add product</FormSubmitButton>
      </form>
    </div>
  );
}
