# Verdant

## Current State
Single-page React app with hero, product categories, reviews, delivery/payment, and contact sections. Product cards have "Order via WhatsApp" buttons that link directly to WhatsApp. Navbar has: Home, Shop, About, Contact.

## Requested Changes (Diff)

### Add
- Cart system: global cart state (array of items with name, price, qty)
- Cart icon in navbar showing item count badge
- "Add to Cart" button + quantity selector on each product card
- Separate Order Details page/view with fields: Full Name, Phone, Address; auto-populated cart summary (product, qty, total); "Confirm Order via WhatsApp" button
- Messenger contact link in Contact section
- Navbar link: "Order Details" (scrolls to or navigates to order details view)

### Modify
- Product cards: remove "Order via WhatsApp" button; show only product, price, quantity picker, Add to Cart
- Navbar links: Home, Shop Now, Order Details, Contact
- WhatsApp message format in checkout: exact emoji-rich format specified
- Contact section: add Messenger link

### Remove
- All "Order via WhatsApp" buttons from product cards
- "Order on WhatsApp" button from navbar header

## Implementation Plan
1. Add CartItem interface and cart state (useState in App, passed down or via context)
2. Update ProductCard to show qty picker + Add to Cart button (no WhatsApp link)
3. Add cart icon with badge count to navbar; clicking navigates to Order Details view
4. Add OrderDetails page component with form + WhatsApp sendOrder function using exact format
5. Implement page-based routing (simple state: 'home' | 'order') to switch views
6. Update navbar links to: Home, Shop Now, Order Details, Contact
7. Update CONTACT_ITEMS to include Messenger
8. WhatsApp checkout URL uses exact format: 🧾 New Order - Verdant header + all fields
