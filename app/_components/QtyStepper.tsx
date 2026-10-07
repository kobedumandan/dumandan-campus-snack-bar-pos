import Icon from "./Icon";

type Props = {
  name: string;
  qty: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: "sm" | "md";
};

// − qty + control. The quantity never goes below 1; use Remove to take an item off the order.
export default function QtyStepper({ name, qty, onIncrease, onDecrease, size = "md" }: Props) {
  const box = size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const icon = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  const ring = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

  return (
    <div className="flex items-center gap-1" role="group" aria-label={`Quantity of ${name}`}>
      <button
        type="button"
        onClick={onDecrease}
        disabled={qty <= 1}
        aria-label={`Decrease ${name}`}
        className={`${box} ${ring} grid place-items-center rounded-full border-2 border-brand text-brand transition hover:bg-brand-soft disabled:cursor-not-allowed disabled:border-line disabled:text-muted disabled:hover:bg-transparent`}
      >
        <Icon name="minus" className={icon} />
      </button>
      <output
        aria-live="polite"
        className={`${size === "sm" ? "w-7 text-sm" : "w-9"} text-center font-semibold tabular-nums`}
      >
        {qty}
      </output>
      <button
        type="button"
        onClick={onIncrease}
        aria-label={`Increase ${name}`}
        className={`${box} ${ring} grid place-items-center rounded-full bg-brand text-white transition hover:bg-brand-dark`}
      >
        <Icon name="plus" className={icon} />
      </button>
    </div>
  );
}
