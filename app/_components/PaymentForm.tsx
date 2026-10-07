import type { FormEvent } from "react";
import Icon from "./Icon";
import { formatPeso } from "../_lib/pos";

type Props = {
  total: number;
  value: string;
  error: string | null;
  disabled: boolean;
  onChange: (value: string) => void;
  onPay: (badInput: boolean) => void;
};

const QUICK_CASH = [100, 200, 500, 1000];

export default function PaymentForm({ total, value, error, disabled, onChange, onPay }: Props) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = event.currentTarget.elements.namedItem("cash") as HTMLInputElement;
    // badInput is true when the browser could not read the typed text as a number.
    onPay(input.validity.badInput);
  }

  const chip =
    "h-9 rounded-full border border-line bg-surface text-xs font-semibold tabular-nums transition hover:border-brand hover:bg-brand-soft hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:bg-surface disabled:hover:text-ink";

  return (
    <section aria-labelledby="payment-heading" className="border-t border-line px-6 pb-6 pt-4">
      {/* noValidate: we show our own messages instead of the browser's popups */}
      <form noValidate onSubmit={handleSubmit}>
        <fieldset disabled={disabled} className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 id="payment-heading" className="text-sm font-bold">
              <label htmlFor="cash">Cash received</label>
            </h2>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-semibold text-brand-dark">
              <Icon name="cash" className="h-3.5 w-3.5" />
              Cash payment
            </span>
          </div>

          <div
            className={`flex h-14 items-center gap-2 rounded-2xl border-2 bg-surface px-4 transition focus-within:border-brand ${
              error ? "border-danger" : "border-line"
            }`}
          >
            <span aria-hidden="true" className="text-xl font-semibold text-muted">
              ₱
            </span>
            <input
              id="cash"
              name="cash"
              type="number"
              inputMode="decimal"
              step="0.01"
              placeholder="0.00"
              autoComplete="off"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              aria-invalid={error ? true : undefined}
              aria-describedby="cash-message"
              className="h-full w-full min-w-0 bg-transparent text-2xl font-bold tabular-nums outline-none placeholder:font-semibold placeholder:text-muted/50"
            />
          </div>

          <div className="grid grid-cols-5 gap-2">
            <button type="button" className={chip} onClick={() => onChange(total.toFixed(2))}>
              Exact
            </button>
            {QUICK_CASH.map((amount) => (
              <button key={amount} type="button" className={chip} onClick={() => onChange(String(amount))}>
                {amount}
              </button>
            ))}
          </div>

          {error ? (
            <p
              id="cash-message"
              role="alert"
              className="rise-in flex items-start gap-2 rounded-xl bg-danger-soft px-3 py-2.5 text-sm font-medium text-danger"
            >
              <Icon name="alert" className="mt-px h-4.5 w-4.5 shrink-0" />
              {error}
            </p>
          ) : (
            <p id="cash-message" className="text-xs text-muted">
              {disabled ? "Add an item to take payment." : "Type the cash handed over, then press Enter."}
            </p>
          )}

          <button
            type="submit"
            className="mt-1 h-14 rounded-2xl bg-brand text-base font-bold text-white shadow-card transition hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-line disabled:text-muted disabled:shadow-none"
          >
            Review Payment · {formatPeso(total)}
          </button>
        </fieldset>
      </form>
    </section>
  );
}
