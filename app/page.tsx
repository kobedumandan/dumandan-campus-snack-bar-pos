"use client";

import MenuGrid from "./_components/MenuGrid";
import OrderPanel from "./_components/OrderPanel";
import PaymentForm from "./_components/PaymentForm";
import { usePos } from "./_lib/pos-context";

// Menu page: products on the left, current order and payment on the right.
// All transaction state lives in PosProvider (app/_lib/pos-context.tsx).
export default function Home() {
  const pos = usePos();

  return (
    <>
      <main className="soft-scroll min-w-0 flex-1 lg:overflow-y-auto">
        <MenuGrid images={pos.images} qtyInCart={pos.qtyInCart} onAdd={pos.addItem} onChangeQty={pos.changeQty} />
      </main>

      <aside className="flex w-full shrink-0 flex-col bg-surface lg:h-full lg:w-100 lg:border-l lg:border-line">
        <OrderPanel
          images={pos.images}
          ticketId={pos.ticketId}
          lines={pos.lines}
          total={pos.total}
          onChangeQty={pos.changeQty}
          onRemove={pos.removeItem}
          onClear={pos.clearOrder}
        />
        <PaymentForm
          total={pos.total}
          value={pos.cashInput}
          error={pos.paymentError}
          disabled={pos.lines.length === 0}
          onChange={pos.updateCashInput}
          onPay={pos.pay}
        />
      </aside>
    </>
  );
}
