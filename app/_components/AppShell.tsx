"use client";

import type { ReactNode } from "react";
import ConfirmModal from "./ConfirmModal";
import Icon from "./Icon";
import ReceiptModal from "./ReceiptModal";
import Sidebar, { MobileNav } from "./Sidebar";
import { usePos } from "../_lib/pos-context";

// Frame shared by every page: sidebar, confirmation and receipt popups, and the notice pill.
export default function AppShell({ children }: { children: ReactNode }) {
  const pos = usePos();
  const { receipt, pending, startNewTransaction, notice } = pos;

  return (
    <>
      <div
        inert={receipt !== null || pending !== null}
        className="flex min-h-dvh flex-col lg:h-dvh lg:overflow-hidden xl:flex-row"
      >
        <Sidebar />
        <MobileNav />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col lg:flex-row">{children}</div>
      </div>

      {pending && (
        <ConfirmModal
          ticketId={pos.ticketId}
          lines={pos.lines}
          total={pos.total}
          payment={pending}
          images={pos.images}
          onConfirm={pos.confirmPayment}
          onCancel={pos.cancelPayment}
        />
      )}

      {receipt && <ReceiptModal receipt={receipt} onNewTransaction={startNewTransaction} />}

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-30 flex justify-center px-4">
        {notice && (
          <p
            key={notice.id}
            className="rise-in flex items-center gap-2.5 rounded-full bg-surface py-2 pl-2 pr-5 text-sm font-semibold shadow-float"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-brand text-white">
              <Icon name="check" className="h-4 w-4" />
            </span>
            {notice.text}
          </p>
        )}
      </div>
    </>
  );
}
