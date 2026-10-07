"use client";

import { useState } from "react";
import Clock from "./Clock";
import FoodArt from "./FoodArt";
import Icon from "./Icon";
import ProductImage from "./ProductImage";
import QtyStepper from "./QtyStepper";
import { CATEGORIES, PRODUCTS, type Category, type ProductImages } from "../_lib/products";
import { formatPeso } from "../_lib/pos";

type Props = {
  images: ProductImages;
  qtyInCart: (productId: string) => number;
  onAdd: (productId: string) => void;
  onChangeQty: (productId: string, delta: number) => void;
};

export default function MenuGrid({ images, qtyInCart, onAdd, onChangeQty }: Props) {
  const [category, setCategory] = useState<Category | "All">("All");
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();
  const visible = PRODUCTS.filter(
    (p) => (category === "All" || p.category === category) && p.name.toLowerCase().includes(query),
  );

  const chips = [
    { name: "All" as const, count: PRODUCTS.length, art: null },
    ...CATEGORIES.map((c) => ({
      name: c.name,
      count: PRODUCTS.filter((p) => p.category === c.name).length,
      art: c.art,
    })),
  ];

  return (
    <div className="flex flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      {/* Search + clock */}
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex h-12 min-w-0 flex-1 basis-64 items-center gap-3 rounded-2xl bg-surface px-4 shadow-card focus-within:outline-2 focus-within:outline-brand">
          <Icon name="search" className="h-5 w-5 shrink-0 text-muted" />
          <span className="sr-only">Search products</span>
          <input
            id="product-search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products…"
            className="h-full w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted"
          />
        </label>
        <Clock />
      </div>

      {/* Category chips */}
      <div className="soft-scroll -mx-1 flex gap-3 overflow-x-auto px-1 pb-2" role="group" aria-label="Filter by category">
        {chips.map((chip) => {
          const active = category === chip.name;
          return (
            <button
              key={chip.name}
              type="button"
              aria-pressed={active}
              onClick={() => setCategory(chip.name)}
              className={`flex min-w-32 shrink-0 flex-col items-start gap-3 rounded-2xl border p-4 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                active
                  ? "border-brand/30 bg-brand-soft"
                  : "border-transparent bg-surface shadow-card hover:border-brand/20"
              }`}
            >
              <span className={`grid h-10 w-10 place-items-center rounded-xl ${active ? "bg-surface" : "bg-surface-2"}`}>
                {chip.art ? (
                  <FoodArt kind={chip.art} className="h-8 w-8" />
                ) : (
                  <Icon name="grid" className="h-5 w-5 text-brand" />
                )}
              </span>
              <span>
                <span className="block text-sm font-bold">{chip.name}</span>
                <span className="block text-xs text-muted">
                  {chip.count} {chip.count === 1 ? "item" : "items"}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Products */}
      <section aria-labelledby="menu-heading" className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between gap-3">
          <h2 id="menu-heading" className="text-lg font-bold tracking-tight">
            {category === "All" ? "All items" : category}
          </h2>
          <p className="text-xs font-medium text-muted">Click Add to put an item on the order</p>
        </div>

        {visible.length === 0 ? (
          <p className="rounded-2xl bg-surface p-10 text-center text-sm text-muted shadow-card">
            No items match “{search}”. Try another name or pick a different category.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((product) => {
              const qty = qtyInCart(product.id);
              const inOrder = qty > 0;
              return (
                <li
                  key={product.id}
                  className={`flex flex-col gap-3 rounded-3xl bg-surface p-3 shadow-card ring-2 transition ${
                    inOrder ? "ring-brand" : "ring-transparent"
                  }`}
                >
                  <ProductImage
                    product={product}
                    url={images[product.id]}
                    className="aspect-[4/3] rounded-2xl"
                    artClassName="h-[72%] w-[72%]"
                  >
                    <span className="absolute left-3 top-3 rounded-full bg-surface/90 px-2.5 py-1 text-[11px] font-semibold text-muted">
                      No. {product.code}
                    </span>
                    {inOrder && (
                      <span className="absolute right-3 top-3 rounded-full bg-brand px-2.5 py-1 text-[11px] font-semibold text-white">
                        {qty} in order
                      </span>
                    )}
                  </ProductImage>

                  <div className="flex flex-1 flex-col gap-1 px-1">
                    <p className="font-semibold leading-snug">{product.name}</p>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-lg font-bold tabular-nums text-brand">{formatPeso(product.price)}</p>
                      <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[11px] font-medium text-muted">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {inOrder ? (
                    <div className="flex h-11 items-center justify-center rounded-2xl border border-line">
                      <QtyStepper
                        name={product.name}
                        qty={qty}
                        onIncrease={() => onChangeQty(product.id, 1)}
                        onDecrease={() => onChangeQty(product.id, -1)}
                        size="sm"
                      />
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onAdd(product.id)}
                      aria-label={`Add ${product.name} to order`}
                      className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-brand-soft text-sm font-semibold text-brand-dark transition hover:bg-brand hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-[0.98]"
                    >
                      <Icon name="plus" className="h-4 w-4" />
                      Add to Order
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
