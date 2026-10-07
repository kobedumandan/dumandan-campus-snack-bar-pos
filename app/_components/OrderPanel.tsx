import Icon from "./Icon";
import ProductImage from "./ProductImage";
import QtyStepper from "./QtyStepper";
import type { ProductImages } from "../_lib/products";
import { formatPeso, itemCount, type OrderLine } from "../_lib/pos";

type Props = {
  images: ProductImages;
  ticketId: string;
  lines: OrderLine[];
  total: number;
  onChangeQty: (productId: string, delta: number) => void;
  onRemove: (productId: string) => void;
  onClear: () => void;
};

export default function OrderPanel({ images, ticketId, lines, total, onChangeQty, onRemove, onClear }: Props) {
  const count = itemCount(lines);

  return (
    <section aria-labelledby="order-heading" className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-start justify-between gap-3 border-b border-line px-6 py-5">
        <div>
          <h2 id="order-heading" className="text-xl font-extrabold tracking-tight">
            Current Order
          </h2>
          <p className="mt-0.5 text-xs font-medium text-muted tabular-nums">
            Ticket {ticketId} · {count} {count === 1 ? "item" : "items"}
          </p>
        </div>
        <button
          type="button"
          onClick={onClear}
          disabled={lines.length === 0}
          aria-label="Clear order"
          title="Clear order"
          className="grid h-11 w-11 place-items-center rounded-2xl bg-surface-2 text-ink transition hover:bg-danger-soft hover:text-danger focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-surface-2 disabled:hover:text-ink"
        >
          <Icon name="reset" className="h-5 w-5" />
        </button>
      </div>

      <div className="soft-scroll min-h-40 flex-1 overflow-y-auto px-6 py-4">
        {lines.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 py-8 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-surface-2">
              <Icon name="bag" className="h-7 w-7 text-muted" />
            </span>
            <div>
              <p className="font-semibold">No items yet</p>
              <p className="mt-1 text-sm text-muted">Choose items from the menu to start an order.</p>
            </div>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {lines.map(({ product, qty, subtotal }) => (
              <li key={product.id} className="rise-in flex gap-3 rounded-2xl border border-line p-3">
                <ProductImage
                  product={product}
                  url={images[product.id]}
                  className="h-16 w-16 shrink-0 rounded-xl"
                  artClassName="h-12 w-12"
                />

                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-snug">{product.name}</p>
                      <p className="text-xs text-muted tabular-nums">{formatPeso(product.price)} each</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemove(product.id)}
                      aria-label={`Remove ${product.name}`}
                      title="Remove"
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted transition hover:bg-danger-soft hover:text-danger focus-visible:outline-2 focus-visible:outline-brand"
                    >
                      <Icon name="trash" className="h-4.5 w-4.5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <QtyStepper
                      name={product.name}
                      qty={qty}
                      onIncrease={() => onChangeQty(product.id, 1)}
                      onDecrease={() => onChangeQty(product.id, -1)}
                      size="sm"
                    />
                    <p className="font-bold tabular-nums text-brand">{formatPeso(subtotal)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="px-6 pb-2">
        <dl className="flex flex-col gap-2 rounded-2xl bg-surface-2 p-4 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-muted">Items</dt>
            <dd className="tabular-nums">{count}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3 border-t border-dashed border-line pt-2">
            <dt className="text-base font-bold">Total Amount</dt>
            <dd className="text-xl font-extrabold tabular-nums">{formatPeso(total)}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
