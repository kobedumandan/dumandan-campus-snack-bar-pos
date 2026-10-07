import { findProduct, type Product } from "./products";

export type CartItem = { productId: string; qty: number };

export type OrderLine = { product: Product; qty: number; subtotal: number };

export type Receipt = {
  ticketId: string;
  issuedAt: Date;
  lines: OrderLine[];
  total: number;
  paid: number;
  change: number;
};

const peso = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" });

export function formatPeso(amount: number): string {
  return peso.format(amount);
}

export function formatTicket(sequence: number): string {
  return `SB-${String(sequence).padStart(4, "0")}`;
}

// Turns the raw cart (product id + qty) into display lines with subtotals.
export function buildOrderLines(cart: CartItem[]): OrderLine[] {
  return cart.flatMap((item) => {
    const product = findProduct(item.productId);
    if (!product) return [];
    return [{ product, qty: item.qty, subtotal: product.price * item.qty }];
  });
}

export function orderTotal(lines: OrderLine[]): number {
  return lines.reduce((sum, line) => sum + line.subtotal, 0);
}

export function itemCount(lines: OrderLine[]): number {
  return lines.reduce((sum, line) => sum + line.qty, 0);
}

export type PaymentResult =
  | { ok: true; paid: number; change: number }
  | { ok: false; error: string };

// Validates the cash typed by the cashier. `badInput` comes from the number
// input's validity state: the browser reports it when the text is not a number.
export function validatePayment(raw: string, total: number, badInput = false): PaymentResult {
  const text = raw.trim();

  if (badInput || (text !== "" && !Number.isFinite(Number(text)))) {
    return { ok: false, error: "Please enter a valid payment amount. Use numbers only, like 200 or 200.50." };
  }
  if (text === "") {
    return { ok: false, error: "Please enter a valid payment amount." };
  }

  const paid = Math.round(Number(text) * 100) / 100;

  if (paid < 0) {
    return { ok: false, error: "Please enter a valid payment amount. The amount cannot be negative." };
  }
  if (paid < total) {
    return { ok: false, error: `Insufficient payment. Please enter at least ${formatPeso(total)}.` };
  }

  return { ok: true, paid, change: Math.round((paid - total) * 100) / 100 };
}
