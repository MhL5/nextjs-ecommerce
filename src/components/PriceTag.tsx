import { formatPrice } from "@/lib/format";

type PriceTagProps = { price: number; className?: string };

export default function PriceTag({ price, className }: PriceTagProps) {
  return <span className={`${className} badge`}>{formatPrice(price)}</span>;
}
