import Icon from "./Icon";
import ProductImage from "./ProductImage";
import { formatPeso, itemCount, type OrderLine } from "../_lib/pos";
import type { PendingPayment } from "../_lib/pos-context";
import type { ProductImages } from "../_lib/products";

type Props = {
  ticketId: string;
  lines: OrderLine[];
  total: number;
  payment: PendingPayment;
  images: ProductImages;
  onConfirm: () => void;
  onCancel: () => void;
};

// Shown after the cash is validated and before the sale is completed,
// so the customer can check the order and a misclick cannot finish a sale.
export default function ConfirmModal({ ticketId, lines, total, payment, images, onConfirm, onCancel }: Props) {
  const count = itemCount(lines);

  return (
    <div
      className="fade-in fixed inset-0 z-20 overflow-y-auto bg-ink/40 backdrop-blur-sm"
      onKeyDown={(e) => {
        if (e.key === "Escape") onCancel();
      }}
    >
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="review-heading"
          aria-describedby="review-help"
          className="rise-in flex w-full max-w-md flex-col gap-5 rounded-[2rem] bg-surface p-6 shadow-float sm:p-7"
        >
          <div className="flex items-start gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
              <Icon name="receipt" className="h-6 w-6" />
            </span>
            <div>
              <h2 id="review-heading" className="text-xl font-extrabold tracking-tight">
                Confirm this purchase
              </h2>
              <p id="review-help" className="mt-0.5 text-sm text-muted">
                Ticket {ticketId} · Read the order back to the customer before completing it.
              </p>
            </div>
          </div>

          <ul className="soft-scroll flex max-h-64 flex-col divide-y divide-line overflow-y-auto rounded-2xl border border-line">
            {lines.map(({ product, qty, subtotal }) => (
              <li key={product.id} className="flex items-center gap-3 px-3 py-2.5">
                <ProductImage
                  product={product}
                  url={images[product.id]}
                  className="h-11 w-11 shrink-0 rounded-xl"
                  artClassName="h-8 w-8"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold leading-snug">{product.name}</p>
                  <p className="text-xs text-muted tabular-nums">
                    {qty} × {formatPeso(product.price)}
                  </p>
                </div>
                <p className="text-sm font-bold tabular-nums">{formatPeso(subtotal)}</p>
              </li>
            ))}
          </ul>

          <dl className="flex flex-col gap-2 rounded-2xl bg-surface-2 p-4 text-sm tabular-nums">
            <div className="flex justify-between gap-3">
              <dt className="text-muted">
                Total due ({count} {count === 1 ? "item" : "items"})
              </dt>
              <dd className="font-semibold">{formatPeso(total)}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Cash received</dt>
              <dd className="font-semibold">{formatPeso(payment.paid)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-3 border-t border-dashed border-line pt-2">
              <dt className="text-base font-bold">Change</dt>
              <dd className="text-xl font-extrabold text-brand">{formatPeso(payment.change)}</dd>
            </div>
          </dl>

          <div className="grid grid-cols-2 gap-3">
            {/* Focus starts on "Go back" so a stray Enter press cannot complete the sale. */}
            <button
              type="button"
              onClick={onCancel}
              autoFocus
              className="h-13 rounded-2xl border border-line text-sm font-bold transition hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              Go back
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="h-13 rounded-2xl bg-brand text-sm font-bold text-white shadow-card transition hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-[0.99]"
            >
              Complete Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
