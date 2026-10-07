import Icon from "./Icon";
import { formatPeso, itemCount, type Receipt } from "../_lib/pos";

const receiptDate = new Intl.DateTimeFormat("en-PH", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "numeric",
  minute: "2-digit",
});

type Props = {
  receipt: Receipt;
  onNewTransaction: () => void;
};

export default function ReceiptModal({ receipt, onNewTransaction }: Props) {
  const issued = receiptDate.format(receipt.issuedAt);

  return (
    <div className="fade-in fixed inset-0 z-20 overflow-y-auto bg-ink/40 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-heading"
          className="rise-in grid w-full max-w-3xl overflow-hidden rounded-[2rem] bg-surface shadow-float md:grid-cols-[1fr_340px]"
        >
          {/* Payment confirmation */}
          <section className="flex flex-col gap-6 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white">
                <Icon name="check" className="h-6 w-6" />
              </span>
              <div>
                <h2 id="confirm-heading" className="text-xl font-extrabold tracking-tight">
                  Payment successful
                </h2>
                <p className="text-sm text-muted">Ticket {receipt.ticketId} is paid.</p>
              </div>
            </div>

            <div className="rounded-2xl bg-brand-soft p-5">
              <p className="text-sm font-semibold text-brand-dark">Change to give</p>
              <p className="mt-1 text-5xl font-extrabold tracking-tight tabular-nums text-brand-dark">
                {formatPeso(receipt.change)}
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-3 text-sm">
              {[
                ["Items", String(itemCount(receipt.lines))],
                ["Total due", formatPeso(receipt.total)],
                ["Cash received", formatPeso(receipt.paid)],
                ["Change", formatPeso(receipt.change)],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-line px-4 py-3">
                  <dt className="text-xs text-muted">{label}</dt>
                  <dd className="mt-0.5 font-bold tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>

            <button
              type="button"
              onClick={onNewTransaction}
              autoFocus
              className="mt-auto h-14 rounded-2xl bg-brand text-base font-bold text-white shadow-card transition hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-[0.99]"
            >
              Start New Transaction
            </button>
          </section>

          {/* Digital receipt */}
          <section aria-labelledby="receipt-heading" className="bg-surface-2 p-6 sm:p-8">
            <article className="rounded-2xl bg-surface px-5 py-6 font-mono text-[12.5px] leading-relaxed shadow-card">
              <header className="text-center">
                <h3 id="receipt-heading" className="font-sans text-base font-extrabold tracking-tight">
                  Campus Snack Bar
                </h3>
                <p className="text-[11px] text-muted">Official Receipt · Counter 1</p>
              </header>

              <hr className="my-4 border-t border-dashed border-muted/50" />

              <div className="flex justify-between gap-3">
                <span className="text-muted">Txn No.</span>
                <span className="font-semibold">{receipt.ticketId}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-muted">Date</span>
                <span>{issued}</span>
              </div>

              <hr className="my-4 border-t border-dashed border-muted/50" />

              <ul className="flex flex-col gap-2">
                {receipt.lines.map(({ product, qty, subtotal }) => (
                  <li key={product.id}>
                    <p className="font-semibold">{product.name}</p>
                    <p className="flex justify-between gap-3 tabular-nums">
                      <span>
                        {qty} x {formatPeso(product.price)}
                      </span>
                      <span>{formatPeso(subtotal)}</span>
                    </p>
                  </li>
                ))}
              </ul>

              <hr className="my-4 border-t border-dashed border-muted/50" />

              <dl className="flex flex-col gap-1 tabular-nums">
                <div className="flex justify-between gap-3 text-sm font-semibold">
                  <dt>TOTAL</dt>
                  <dd>{formatPeso(receipt.total)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt>Cash</dt>
                  <dd>{formatPeso(receipt.paid)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt>Change</dt>
                  <dd>{formatPeso(receipt.change)}</dd>
                </div>
              </dl>

              <hr className="my-4 border-t border-dashed border-muted/50" />

              <p className="text-center text-[11px] text-muted">Thank you. Come again!</p>
            </article>
          </section>
        </div>
      </div>
    </div>
  );
}
