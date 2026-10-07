import type { ReactNode } from "react";
import FoodArt, { ART_TINT } from "./FoodArt";
import type { Product } from "../_lib/products";

type Props = {
  product: Product;
  url?: string; // photo from public/products/; falls back to the drawing when missing
  className?: string;
  artClassName?: string;
  children?: ReactNode; // badges laid over the picture
};

export default function ProductImage({ product, url, className = "", artClassName = "h-3/4 w-3/4", children }: Props) {
  return (
    <div
      className={`relative grid place-items-center overflow-hidden ${className}`}
      style={{ backgroundColor: ART_TINT[product.art] }}
    >
      {url ? (
        // Plain <img>: photos come from our own API and change at runtime.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt={product.name} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <FoodArt kind={product.art} className={artClassName} />
      )}
      {children}
    </div>
  );
}
