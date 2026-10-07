# Campus Snack Bar POS

A computer-based food ordering and point-of-sale (POS) system for a campus snack bar, built for the
IT 415 Midterm Practical Examination (Scenario 4: Campus Snack Bar POS). The cashier picks items from
the menu, adjusts quantities, takes a cash payment, confirms it with the customer, and issues a digital receipt.

## Features

- Menu of six products with photos, names, and prices in Philippine pesos (₱), with category filters and search
- Add items to the order with on-screen buttons; increase, decrease, or remove items
- Subtotals and the total update automatically whenever the order changes
- Order summary panel showing every item, its quantity, and its subtotal
- Cash payment through a numeric input field, with quick-amount buttons
- Payment validation with on-screen messages for blank, non-numeric, negative, and insufficient amounts
- Change computed as `Amount Paid − Total Amount`
- Confirmation step before a sale is completed, to prevent misclicks
- Digital receipt with items, quantities, subtotals, total, cash, change, and a transaction number (e.g. `SB-0001`)
- "Start New Transaction" clears the cart, payment amount, and receipt

## Transaction flow

1. **Browse products:** the menu shows each product's name and price.
2. **Add to cart:** click **Add to Order**; use **−** / **+** to change the quantity, or the trash icon to remove an item.
3. **Review order:** the Current Order panel lists items, quantities, subtotals, and the total amount.
4. **Enter payment:** type the cash received in the **Cash received** field.
5. **Validate and compute:** click **Review Payment** (or press Enter). Invalid amounts show an error message.
6. **Confirm payment:** a popup shows the order, total, cash, and change. Click **Complete Payment**, or **Go back** to edit.
7. **Receipt / new transaction:** the receipt is shown; click **Start New Transaction** for the next customer.

Example: 2 × Cheeseburger (₱130.00) + 1 × French Fries (₱45.00) + 1 × Soda (₱25.00) = **₱200.00**.
Paying ₱500.00 gives **₱300.00** change. Paying ₱100.00 shows
"Insufficient payment. Please enter at least ₱200.00."

## Menu

| No. | Product                | Category   | Price  |
| --- | ---------------------- | ---------- | ------ |
| 101 | Classic Burger         | Burgers    | ₱55.00 |
| 102 | Cheeseburger           | Burgers    | ₱65.00 |
| 201 | Ham Sandwich           | Sandwiches | ₱40.00 |
| 301 | French Fries (Regular) | Sides      | ₱45.00 |
| 302 | Nachos                 | Sides      | ₱50.00 |
| 401 | Soda (Can)             | Drinks     | ₱25.00 |

## Running the app

Requires Node.js 20 or later.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Tech stack

- [Next.js](https://nextjs.org) (App Router) with React and TypeScript
- Tailwind CSS for styling
- No database: products are hard-coded, and the cart and transactions are kept in memory

## Project structure

```
app/
  layout.tsx              Root layout: fonts, POS state provider, app shell
  page.tsx                Menu page: product grid, order panel, payment form
  _lib/
    products.ts           Hard-coded menu (names, prices, categories)
    pos.ts                Order lines, totals, peso formatting, payment validation and change
    pos-context.tsx       Transaction state: cart, payment, confirmation, receipt
    product-images.ts     Finds product photos in public/products/
  _components/
    MenuGrid.tsx          Search, category filters, product cards
    OrderPanel.tsx        Current order with quantity controls and total
    PaymentForm.tsx       Cash input, validation messages, Review Payment button
    ConfirmModal.tsx      Purchase confirmation popup
    ReceiptModal.tsx      Payment success and digital receipt
    Sidebar.tsx, AppShell.tsx, ...  Layout pieces
public/products/          Product photos, named after the product id (e.g. cheeseburger.jpg)
```

## Product photos

Each product's photo is read from `public/products/<product-id>.jpg` (PNG, WEBP, and AVIF also work).
A product without a photo shows a built-in drawing instead. See `public/products/README.md` for the file names.
