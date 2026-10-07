"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { findProduct, type ProductImages } from "./products";
import {
  buildOrderLines,
  formatTicket,
  orderTotal,
  validatePayment,
  type OrderLine,
  type CartItem,
  type Receipt,
} from "./pos";

type Notice = { id: number; text: string };

// A validated payment waiting for the cashier to confirm it.
export type PendingPayment = { paid: number; change: number };

type PosState = {
  lines: OrderLine[];
  total: number;
  ticketId: string;
  cashInput: string;
  paymentError: string | null;
  pending: PendingPayment | null;
  receipt: Receipt | null;
  completedCount: number;
  salesTotal: number;
  notice: Notice | null;
  images: ProductImages;
  qtyInCart: (productId: string) => number;
  addItem: (productId: string) => void;
  changeQty: (productId: string, delta: number) => void;
  removeItem: (productId: string) => void;
  clearOrder: () => void;
  updateCashInput: (value: string) => void;
  pay: (badInput: boolean) => void;
  confirmPayment: () => void;
  cancelPayment: () => void;
  startNewTransaction: () => void;
  notify: (text: string) => void;
};

const PosContext = createContext<PosState | null>(null);

export function usePos(): PosState {
  const value = useContext(PosContext);
  if (!value) throw new Error("usePos must be used inside <PosProvider>");
  return value;
}

// Holds the whole transaction. `images` comes from the server (see app/_lib/product-images.ts).
export function PosProvider({ images, children }: { images: ProductImages; children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cashInput, setCashInput] = useState("");
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [pending, setPending] = useState<PendingPayment | null>(null);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [ticketNumber, setTicketNumber] = useState(1);
  const [completedCount, setCompletedCount] = useState(0);
  const [salesTotal, setSalesTotal] = useState(0);
  const [notice, setNotice] = useState<Notice | null>(null);

  // Subtotals and the total are derived from the cart on every render,
  // so they always match whatever is currently in the cart.
  const lines = buildOrderLines(cart);
  const total = orderTotal(lines);
  const ticketId = formatTicket(ticketNumber);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), 2200);
    return () => clearTimeout(timer);
  }, [notice]);

  function notify(text: string) {
    setNotice({ id: Date.now(), text });
  }

  function qtyInCart(productId: string) {
    return cart.find((item) => item.productId === productId)?.qty ?? 0;
  }

  function addItem(productId: string) {
    const product = findProduct(productId);
    if (!product) return;
    setCart((prev) =>
      prev.some((item) => item.productId === productId)
        ? prev.map((item) => (item.productId === productId ? { ...item, qty: item.qty + 1 } : item))
        : [...prev, { productId, qty: 1 }],
    );
    setPaymentError(null);
    notify(`${product.name} added to order`);
  }

  function changeQty(productId: string, delta: number) {
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, qty: Math.max(1, item.qty + delta) } : item,
      ),
    );
    setPaymentError(null);
  }

  function removeItem(productId: string) {
    const product = findProduct(productId);
    setCart((prev) => prev.filter((item) => item.productId !== productId));
    setPaymentError(null);
    if (product) notify(`${product.name} removed`);
  }

  function clearOrder() {
    setCart([]);
    setCashInput("");
    setPaymentError(null);
    notify("Order cleared");
  }

  function updateCashInput(value: string) {
    setCashInput(value);
    setPaymentError(null);
  }

  // Step 1: validate the cash. A valid amount opens the confirmation popup;
  // nothing is charged yet.
  function pay(badInput: boolean) {
    const result = validatePayment(cashInput, total, badInput);
    if (!result.ok) {
      setPaymentError(result.error);
      return;
    }
    setPaymentError(null);
    setPending({ paid: result.paid, change: result.change });
  }

  // Step 2: the cashier confirmed with the customer, so complete the sale.
  function confirmPayment() {
    if (!pending) return;
    setReceipt({
      ticketId,
      issuedAt: new Date(),
      lines,
      total,
      paid: pending.paid,
      change: pending.change,
    });
    setPending(null);
    setCompletedCount((n) => n + 1);
    setSalesTotal((sum) => sum + total);
  }

  function cancelPayment() {
    setPending(null);
  }

  function startNewTransaction() {
    setCart([]);
    setCashInput("");
    setPaymentError(null);
    setReceipt(null);
    setTicketNumber((n) => n + 1);
    notify("Ready for the next customer");
  }

  const value: PosState = {
    lines,
    total,
    ticketId,
    cashInput,
    paymentError,
    pending,
    receipt,
    completedCount,
    salesTotal,
    notice,
    images,
    qtyInCart,
    addItem,
    changeQty,
    removeItem,
    clearOrder,
    updateCashInput,
    pay,
    confirmPayment,
    cancelPayment,
    startNewTransaction,
    notify,
  };

  return <PosContext.Provider value={value}>{children}</PosContext.Provider>;
}
