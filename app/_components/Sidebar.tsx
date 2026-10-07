"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import FoodArt from "./FoodArt";
import Icon, { type IconName } from "./Icon";
import { formatPeso } from "../_lib/pos";
import { usePos } from "../_lib/pos-context";

const NAV: { href: string; label: string; icon: IconName }[] = [
  { href: "/", label: "Menu", icon: "grid" },
];

export function Brand() {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-soft">
        <FoodArt kind="cheeseburger" className="h-8 w-8" />
      </span>
      <div className="leading-tight">
        <p className="text-[15px] font-extrabold tracking-tight">Campus Snack Bar</p>
        <p className="text-xs font-medium text-muted">Point of Sale</p>
      </div>
    </div>
  );
}

function NavLinks({ layout }: { layout: "column" | "row" }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className={layout === "column" ? "flex flex-col gap-1.5" : "flex gap-1.5"}>
      {NAV.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-3 rounded-2xl text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
              layout === "column" ? "px-4 py-3" : "px-3.5 py-2"
            } ${active ? "bg-brand text-white shadow-card" : "text-ink hover:bg-surface-2"}`}
          >
            <Icon name={item.icon} className="h-5 w-5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

// Top bar shown instead of the sidebar on smaller screens.
export function MobileNav() {
  return (
    <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3 sm:px-6 xl:hidden">
      <Brand />
      <NavLinks layout="row" />
    </header>
  );
}

export default function Sidebar() {
  const { ticketId, completedCount, salesTotal } = usePos();

  return (
    <aside className="hidden w-60 shrink-0 flex-col gap-8 bg-surface px-5 py-6 xl:flex">
      <Brand />
      <NavLinks layout="column" />

      <section aria-labelledby="session-heading" className="rounded-2xl bg-surface-2 p-4">
        <h2 id="session-heading" className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
          This session
        </h2>
        <dl className="mt-3 flex flex-col gap-2.5 text-sm">
          <div className="flex justify-between gap-2">
            <dt className="text-muted">Current ticket</dt>
            <dd className="font-semibold tabular-nums">{ticketId}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-muted">Completed</dt>
            <dd className="font-semibold tabular-nums">{completedCount}</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-muted">Cash sales</dt>
            <dd className="font-semibold tabular-nums text-brand">{formatPeso(salesTotal)}</dd>
          </div>
        </dl>
      </section>

      <div className="mt-auto flex items-center gap-3 rounded-full border border-line py-1.5 pl-1.5 pr-4">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-amber text-xs font-bold">C1</span>
        <div className="leading-tight">
          <p className="text-sm font-semibold">Counter 1</p>
          <p className="text-xs text-muted">Cashier on duty</p>
        </div>
      </div>
    </aside>
  );
}
