import type { ArtKind } from "../_components/FoodArt";

export type Category = "Burgers" | "Sandwiches" | "Sides" | "Drinks";

export type Product = {
  id: string;
  code: string;
  name: string;
  category: Category;
  price: number;
  art: ArtKind;
};

// Hard-coded menu for Scenario 4 (Campus Snack Bar). Prices are in Philippine pesos.
export const PRODUCTS: Product[] = [
  { id: "classic-burger", code: "101", name: "Classic Burger", category: "Burgers", price: 55, art: "burger" },
  { id: "cheeseburger", code: "102", name: "Cheeseburger", category: "Burgers", price: 65, art: "cheeseburger" },
  { id: "ham-sandwich", code: "201", name: "Ham Sandwich", category: "Sandwiches", price: 40, art: "sandwich" },
  { id: "french-fries", code: "301", name: "French Fries (Regular)", category: "Sides", price: 45, art: "fries" },
  { id: "nachos", code: "302", name: "Nachos", category: "Sides", price: 50, art: "nachos" },
  { id: "soda-can", code: "401", name: "Soda (Can)", category: "Drinks", price: 25, art: "soda" },
];

export const CATEGORIES: { name: Category; art: ArtKind }[] = [
  { name: "Burgers", art: "burger" },
  { name: "Sandwiches", art: "sandwich" },
  { name: "Sides", art: "fries" },
  { name: "Drinks", art: "soda" },
];

// productId → picture URL from public/products/. Products without a photo are missing.
export type ProductImages = Record<string, string>;

export function findProduct(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}
