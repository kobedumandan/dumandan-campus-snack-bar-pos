// Server-only: finds product photos dropped into public/products/.
// A file counts when its name matches a product id, e.g. public/products/cheeseburger.jpg.

import { readdirSync } from "node:fs";
import path from "node:path";
import { PRODUCTS, type ProductImages } from "./products";

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".avif"];

export function findProductImages(): ProductImages {
  let files: string[];
  try {
    files = readdirSync(path.join(process.cwd(), "public", "products"));
  } catch {
    return {}; // no folder: every product shows its drawing
  }

  const images: ProductImages = {};
  for (const product of PRODUCTS) {
    const file = files.find((name) => {
      const { name: base, ext } = path.parse(name);
      return base.toLowerCase() === product.id && IMAGE_EXTENSIONS.includes(ext.toLowerCase());
    });
    if (file) images[product.id] = `/products/${encodeURIComponent(file)}`;
  }
  return images;
}
