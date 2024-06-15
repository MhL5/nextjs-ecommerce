import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mt-4 space-y-6 text-center">
      <h1 className="text-3xl font-semibold">
        This page could not be found :(
      </h1>
      <Link
        href="/"
        className="bg-accent-500 text-primary-800 btn btn-primary inline-block px-6 py-3 text-lg"
      >
        Go back home
      </Link>
    </div>
  );
}
