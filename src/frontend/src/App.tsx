import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  ChevronRight,
  Facebook,
  Leaf,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Package,
  Phone,
  Plus,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
  Wallet,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { SiFacebook, SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";

const WA_NUMBER = "8801945273697";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

function waLink(productName?: string) {
  if (productName) {
    const msg = encodeURIComponent(
      `Hello, I want to order ${productName} from your website.`,
    );
    return `${WA_BASE}?text=${msg}`;
  }
  return WA_BASE;
}

interface CartItem {
  name: string;
  price: number;
  qty: number;
}

interface Product {
  name: string;
  description: string;
  price: string;
  image?: string;
  bestSeller?: boolean;
}

interface Category {
  id: string;
  label: string;
  title: string;
  products: Product[];
}

const CATEGORIES: Category[] = [
  {
    id: "indoor-plants",
    label: "Indoor Plants",
    title: "Indoor Plants",
    products: [
      {
        name: "Monstera Royale",
        description: "Purifies air & adds tropical drama to any room",
        price: "৳850",
        image: "/assets/generated/product-monstera.dim_600x600.jpg",
        bestSeller: true,
      },
      {
        name: "Fiddle Leaf Fig",
        description: "Statement tree that elevates any interior space",
        price: "৳1,200",
        image: "/assets/generated/product-fiddle-leaf.dim_600x600.jpg",
      },
      {
        name: "Pothos Aureum",
        description: "Low-maintenance trailing vine for shelves and tables",
        price: "৳450",
      },
    ],
  },
  {
    id: "outdoor-plants",
    label: "Outdoor",
    title: "Outdoor Plants",
    products: [
      {
        name: "Crimson Rose Bush",
        description: "Fragrant blooms to beautify your garden year-round",
        price: "৳950",
        image: "/assets/generated/product-outdoor-rose.dim_600x600.jpg",
        bestSeller: true,
      },
      {
        name: "Bougainvillea Blaze",
        description: "Vivid cascading blooms for walls and trellises",
        price: "৳750",
      },
      {
        name: "Bamboo Privacy Screen",
        description: "Fast-growing natural screening for your garden",
        price: "৳1,100",
      },
    ],
  },
  {
    id: "plant-pots",
    label: "Plant Pots",
    title: "Plant Pots",
    products: [
      {
        name: "Artisan Ceramic Set",
        description: "Handcrafted glazed pots in earth tones",
        price: "৳1,500",
        image: "/assets/generated/product-ceramic-pots.dim_600x600.jpg",
        bestSeller: true,
      },
      {
        name: "Matte Nordic Planter",
        description: "Minimalist design for modern interiors",
        price: "৳800",
      },
      {
        name: "Terracotta Heritage Pot",
        description: "Classic unglazed terracotta for breathable roots",
        price: "৳350",
      },
    ],
  },
  {
    id: "gardening-tools",
    label: "Tools",
    title: "Gardening Tools",
    products: [
      {
        name: "Copper & Wood Tool Set",
        description: "Premium 5-piece set for home gardeners",
        price: "৳2,200",
        image: "/assets/generated/product-tools.dim_600x600.jpg",
        bestSeller: true,
      },
      {
        name: "Ergonomic Pruning Shears",
        description: "Sharp precision blades with soft-grip handle",
        price: "৳650",
        image:
          "/assets/uploads/image-019d2839-9a54-716b-afa9-643894bc53f1-1.png",
      },
      {
        name: "Raised Bed Soil Knife",
        description: "Japanese-style hori hori for transplanting",
        price: "৳850",
      },
    ],
  },
  {
    id: "fertilizers",
    label: "Fertilizers",
    title: "Organic Fertilizers",
    products: [
      {
        name: "Bloom Boost Blend",
        description: "Rich NPK formula for lush flowering plants",
        price: "৳480",
        image: "/assets/generated/product-fertilizer.dim_600x600.jpg",
      },
      {
        name: "Vermicompost Elixir",
        description: "Pure worm castings for vibrant foliage",
        price: "৳380",
      },
      {
        name: "Seaweed Growth Tonic",
        description: "Natural liquid fertilizer for root strength",
        price: "৳320",
      },
    ],
  },
  {
    id: "seeds",
    label: "Seeds",
    title: "Seeds",
    products: [
      {
        name: "Heritage Tomato Collection",
        description: "6 heirloom varieties for kitchen gardens",
        price: "৳250",
        image: "/assets/generated/product-seeds.dim_600x600.jpg",
      },
      {
        name: "Wildflower Meadow Mix",
        description: "100+ native species for pollinators",
        price: "৳180",
      },
      {
        name: "Microgreens Starter Pack",
        description: "Fast-growing nutritious greens for home",
        price: "৳220",
      },
    ],
  },
];

const FEATURES = [
  {
    id: "healthy",
    icon: <Leaf className="w-6 h-6" />,
    title: "100% Healthy Plants",
    desc: "Carefully inspected and nurtured for quality",
  },
  {
    id: "curated",
    icon: <Sparkles className="w-6 h-6" />,
    title: "Curated Selection",
    desc: "Only the finest plants and accessories",
  },
  {
    id: "beginner",
    icon: <Package className="w-6 h-6" />,
    title: "Beginner Friendly",
    desc: "Easy care guides included with every order",
  },
  {
    id: "delivery",
    icon: <Truck className="w-6 h-6" />,
    title: "Fast Delivery",
    desc: "Nationwide delivery across Bangladesh",
  },
];

const REVIEWS = [
  {
    id: "fatima",
    name: "Fatima Rahman",
    rating: 5,
    text: "The plants arrived fresh and healthy. My room feels alive now! Exceptional packaging and quick delivery.",
    initials: "FR",
    ocid: "reviews.item.1",
  },
  {
    id: "karim",
    name: "Karim Hossain",
    rating: 5,
    text: "Amazing quality pots and fast delivery. The ceramic set looks stunning in my living room. Highly recommended!",
    initials: "KH",
    ocid: "reviews.item.2",
  },
  {
    id: "nasrin",
    name: "Nasrin Akter",
    rating: 5,
    text: "Perfect for beginners like me. Loved the service, packaging, and the care guide that came with the plant!",
    initials: "NA",
    ocid: "reviews.item.3",
  },
];

const PAYMENT_OPTIONS = [
  {
    id: "cod",
    icon: <Wallet className="w-6 h-6" />,
    title: "Cash on Delivery",
    desc: "Pay when your order arrives at your door",
  },
  {
    id: "mobile",
    icon: <Phone className="w-6 h-6" />,
    title: "bKash & Nagad",
    desc: "Easy mobile payment options available",
  },
  {
    id: "nationwide",
    icon: <MapPin className="w-6 h-6" />,
    title: "Nationwide Delivery",
    desc: "We deliver to all 64 districts of Bangladesh",
  },
];

const CONTACT_ITEMS = [
  {
    id: "email",
    icon: <Mail className="w-5 h-5" />,
    label: "Email",
    value: "whiiam@gmail.com",
    href: "mailto:whiiam@gmail.com",
  },
  {
    id: "phone",
    icon: <Phone className="w-5 h-5" />,
    label: "Phone",
    value: "+8801945273697",
    href: "tel:+8801945273697",
  },
  {
    id: "whatsapp",
    icon: <MessageCircle className="w-5 h-5" />,
    label: "WhatsApp",
    value: "+8801945273697",
    href: waLink(),
  },
  {
    id: "messenger",
    icon: <MessageCircle className="w-5 h-5" />,
    label: "Messenger",
    value: "facebook.com/Jisanchowdhury69",
    href: "https://m.me/Jisanchowdhury69",
  },
  {
    id: "facebook",
    icon: <Facebook className="w-5 h-5" />,
    label: "Facebook",
    value: "facebook.com/Jisanchowdhury69",
    href: "https://www.facebook.com/Jisanchowdhury69/",
  },
];

const FOOTER_LINKS = [
  { label: "Home", id: "home" },
  { label: "Shop", id: "indoor-plants" },
  { label: "Contact", id: "contact" },
];

function parsePriceNumber(priceStr: string): number {
  return Number.parseFloat(priceStr.replace(/[৳,]/g, "")) || 0;
}

function PlantPlaceholder({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <span className="text-4xl mb-2">🪴</span>
      <span className="text-xs font-semibold text-brand-green/60 tracking-wider">
        {initials}
      </span>
    </div>
  );
}

function ProductCard({
  product,
  index,
  onAddToCart,
}: {
  product: Product;
  index: number;
  onAddToCart: (name: string, price: number, qty: number) => void;
}) {
  const [qty, setQty] = useState(1);

  return (
    <div
      data-ocid={`products.item.${index + 1}`}
      className="group bg-card rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col"
    >
      <div className="p-4 pb-0">
        <div
          className="relative rounded-2xl overflow-hidden border border-border/60"
          style={{ aspectRatio: "1/1" }}
        >
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <PlantPlaceholder name={product.name} />
          )}
          {product.bestSeller && (
            <span className="absolute top-2.5 right-2.5 bg-brand-gold text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-gold">
              Best Seller
            </span>
          )}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-foreground text-base leading-snug mb-1">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-xs leading-relaxed flex-1 mb-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto mb-3">
          <span className="text-brand-gold font-bold text-lg font-serif">
            {product.price}
          </span>
        </div>
        {/* Quantity Selector */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Qty:
          </span>
          <div className="flex items-center border border-border rounded-full overflow-hidden">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-7 h-7 flex items-center justify-center text-brand-green hover:bg-brand-green/10 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-8 text-center text-sm font-semibold text-foreground">
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setQty((q) => Math.min(99, q + 1))}
              className="w-7 h-7 flex items-center justify-center text-brand-green hover:bg-brand-green/10 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            onAddToCart(product.name, parsePriceNumber(product.price), qty);
            setQty(1);
          }}
          data-ocid={`products.item.${index + 1}`}
          className="flex items-center justify-center gap-2 bg-brand-green text-white text-sm font-semibold py-2.5 rounded-full hover:bg-brand-green/90 transition-colors duration-200 shadow-xs"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function StarRating({
  rating,
  onRate,
}: {
  rating: number;
  onRate?: (r: number) => void;
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onRate?.(s)}
          className={`transition-colors ${
            s <= rating ? "text-brand-gold" : "text-muted-foreground/30"
          } ${onRate ? "hover:text-brand-gold cursor-pointer" : "cursor-default"}`}
        >
          <Star className="w-4 h-4 fill-current" />
        </button>
      ))}
    </div>
  );
}

function OrderDetailsPage({
  cart,
  setPage,
  onRemoveFromCart,
}: {
  cart: CartItem[];
  setPage: (p: "home" | "order") => void;
  onRemoveFromCart: (name: string) => void;
}) {
  const [form, setForm] = useState({ name: "", phone: "", address: "" });

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  function sendOrder() {
    if (!form.name || !form.phone || !form.address) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    const productText = cart
      .map((item) => `${item.name} x${item.qty} (৳${item.price} each)`)
      .join(", ");
    const message = `🧾 New Order - Verdant\n\n👤 Name: ${form.name}\n📞 Phone: ${form.phone}\n📍 Address: ${form.address}\n🛒 Product: ${productText}`;
    const url = `https://wa.me/8801945273697?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Back button */}
        <button
          type="button"
          onClick={() => setPage("home")}
          data-ocid="order.secondary_button"
          className="flex items-center gap-2 text-brand-green font-semibold text-sm mb-8 hover:text-brand-green/70 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </button>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-2">
          Order Details
        </h1>
        <div className="w-16 h-0.5 bg-brand-gold mb-10" />

        {cart.length === 0 ? (
          <div
            data-ocid="order.empty_state"
            className="text-center py-20 bg-card rounded-3xl shadow-card border border-border/60"
          >
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Add some beautiful plants to get started!
            </p>
            <button
              type="button"
              onClick={() => setPage("home")}
              data-ocid="order.primary_button"
              className="inline-flex items-center gap-2 bg-brand-green text-white font-semibold px-6 py-2.5 rounded-full hover:bg-brand-green/90 transition-colors text-sm"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {/* Cart Summary */}
            <div className="bg-card rounded-3xl shadow-card border border-border/60 overflow-hidden mb-8">
              <div className="px-6 py-4 border-b border-border bg-brand-green/5">
                <h2 className="font-serif text-xl font-bold text-foreground">
                  Cart Summary
                </h2>
              </div>
              <div className="divide-y divide-border">
                {cart.map((item, idx) => (
                  <div
                    key={item.name}
                    data-ocid={`order.item.${idx + 1}`}
                    className="flex items-center justify-between px-6 py-4 gap-4"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <button
                        type="button"
                        onClick={() => onRemoveFromCart(item.name)}
                        data-ocid={`order.delete_button.${idx + 1}`}
                        className="w-6 h-6 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-400 hover:text-red-600 transition-colors flex-shrink-0"
                        aria-label={`Remove ${item.name}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <span className="font-medium text-foreground text-sm truncate">
                        {item.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 flex-shrink-0 text-sm">
                      <span className="text-muted-foreground">x{item.qty}</span>
                      <span className="text-muted-foreground w-20 text-right">
                        ৳{item.price} each
                      </span>
                      <span className="font-bold text-foreground w-20 text-right">
                        ৳{(item.price * item.qty).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-brand-gold/5">
                <span className="font-serif font-bold text-foreground text-lg">
                  Total
                </span>
                <span className="font-serif font-bold text-brand-gold text-xl">
                  ৳{total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Order Form */}
            <div className="bg-card rounded-3xl shadow-card border border-border/60 p-8">
              <h2 className="font-serif text-xl font-bold text-foreground mb-6">
                Your Details
              </h2>
              <div className="space-y-5">
                <div>
                  <Label
                    htmlFor="order-name"
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block"
                  >
                    Full Name *
                  </Label>
                  <Input
                    id="order-name"
                    data-ocid="order.input"
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="e.g. Fatima Rahman"
                    className="rounded-xl border-border/80 bg-background focus:border-brand-gold focus:ring-brand-gold"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="order-phone"
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block"
                  >
                    Phone Number *
                  </Label>
                  <Input
                    id="order-phone"
                    data-ocid="order.input"
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    placeholder="e.g. +8801XXXXXXXXX"
                    className="rounded-xl border-border/80 bg-background focus:border-brand-gold focus:ring-brand-gold"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="order-address"
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block"
                  >
                    Delivery Address *
                  </Label>
                  <Textarea
                    id="order-address"
                    data-ocid="order.textarea"
                    value={form.address}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, address: e.target.value }))
                    }
                    placeholder="House, Road, Area, District"
                    rows={3}
                    className="rounded-xl border-border/80 bg-background resize-none focus:border-brand-gold"
                  />
                </div>
                <button
                  type="button"
                  onClick={sendOrder}
                  data-ocid="order.submit_button"
                  className="w-full flex items-center justify-center gap-2 bg-brand-green text-white font-semibold py-3.5 rounded-full hover:bg-brand-green/90 transition-colors shadow-xs text-base mt-2"
                >
                  <SiWhatsapp className="w-5 h-5" />
                  Confirm Order via WhatsApp
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [page, setPage] = useState<"home" | "order">("home");
  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5,
  });
  const [submitting, setSubmitting] = useState(false);
  const shopRef = useRef<HTMLDivElement>(null);

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  function addToCart(name: string, price: number, qty: number) {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === name);
      if (existing) {
        return prev.map((i) =>
          i.name === name ? { ...i, qty: i.qty + qty } : i,
        );
      }
      return [...prev, { name, price, qty }];
    });
    toast.success(`${name} added to cart 🛒`);
  }

  function removeFromCart(name: string) {
    setCart((prev) => prev.filter((i) => i.name !== name));
  }

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.message) {
      toast.error("Please fill in your name and message.");
      return;
    }
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      toast.success("Thank you for your review! 🌿");
      setReviewForm({ name: "", email: "", message: "", rating: 5 });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const navLinks = [
    {
      label: "Home",
      id: "home",
      action: () => {
        setPage("home");
        setTimeout(() => scrollTo("home"), 50);
      },
    },
    {
      label: "Shop Now",
      id: "indoor-plants",
      action: () => {
        setPage("home");
        setTimeout(() => scrollTo("indoor-plants"), 50);
      },
    },
    {
      label: "Order Details",
      id: "order",
      action: () => setPage("order"),
    },
    {
      label: "Contact",
      id: "contact",
      action: () => {
        setPage("home");
        setTimeout(() => scrollTo("contact"), 50);
      },
    },
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      <Toaster position="top-right" />

      {/* Top bar */}
      <div className="h-2 bg-brand-green w-full" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <img
                src="/assets/generated/verdant-logo-transparent.dim_400x160.png"
                alt="Verdant"
                className="h-10 w-auto object-contain"
              />
            </div>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => link.action()}
                  data-ocid="nav.link"
                  className="text-sm font-medium text-foreground/70 hover:text-brand-green transition-colors tracking-wide uppercase"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {/* Cart Icon */}
              <button
                type="button"
                onClick={() => setPage("order")}
                data-ocid="nav.primary_button"
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-brand-green/10 hover:bg-brand-green/20 text-brand-green transition-colors"
                aria-label="View cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-gold text-white text-[10px] font-bold flex items-center justify-center shadow-gold">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>
              <button
                type="button"
                className="md:hidden p-2 rounded-md text-foreground/70"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                data-ocid="nav.toggle"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-border px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => {
                  link.action();
                  setMobileOpen(false);
                }}
                className="text-sm font-medium text-foreground/70 hover:text-brand-green transition-colors py-2 text-left uppercase tracking-wide"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {page === "order" ? (
        <OrderDetailsPage
          cart={cart}
          setPage={setPage}
          onRemoveFromCart={removeFromCart}
        />
      ) : (
        <main>
          {/* Hero */}
          <section
            id="home"
            className="relative w-full flex items-center justify-center"
            style={{ minHeight: "600px" }}
          >
            <img
              src="/assets/generated/hero-bg.dim_1400x800.jpg"
              alt="Verdant — luxury plant store"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 text-center text-white px-4 py-24 max-w-4xl mx-auto">
              <span className="inline-block border border-white/50 text-white/90 text-xs font-semibold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm bg-white/10">
                Premium Botanical Store
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Transform Your Space
                <br />
                with Nature's Luxury
              </h1>
              <p className="text-white/85 text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                Premium plants and gardening essentials for a healthier, greener
                life
              </p>
              <button
                type="button"
                onClick={() => scrollTo("indoor-plants")}
                data-ocid="hero.primary_button"
                className="inline-flex items-center gap-2 bg-brand-gold text-white font-semibold text-base px-8 py-3.5 rounded-full hover:bg-brand-gold/90 transition-all duration-200 shadow-gold hover:shadow-lg hover:-translate-y-0.5"
              >
                Shop Now <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </section>

          {/* Category Nav */}
          <div
            className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-border shadow-xs"
            ref={shopRef}
          >
            <div className="max-w-7xl mx-auto px-4 py-3 overflow-x-auto">
              <div className="flex gap-2 min-w-max">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => scrollTo(cat.id)}
                    data-ocid="categories.tab"
                    className="text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full border border-brand-green/30 text-brand-green hover:bg-brand-green hover:text-white transition-all duration-200 whitespace-nowrap"
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Features */}
          <section id="features" className="bg-background py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {FEATURES.map((f) => (
                  <div
                    key={f.id}
                    className="flex flex-col items-center text-center p-6 bg-card rounded-2xl shadow-xs border border-border/60"
                  >
                    <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green mb-4">
                      {f.icon}
                    </div>
                    <h3 className="font-semibold text-sm text-foreground mb-1 leading-snug">
                      {f.title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Product Categories */}
          {CATEGORIES.map((cat) => (
            <section key={cat.id} id={cat.id} className="py-16 px-4">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <p className="text-brand-gold text-xs font-bold uppercase tracking-[0.2em] mb-2">
                    Shop Now
                  </p>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
                    {cat.title}
                  </h2>
                  <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-4" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cat.products.map((product, idx) => (
                    <ProductCard
                      key={product.name}
                      product={product}
                      index={idx}
                      onAddToCart={addToCart}
                    />
                  ))}
                </div>
              </div>
            </section>
          ))}

          {/* Testimonials */}
          <section className="bg-background py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-brand-gold text-xs font-bold uppercase tracking-[0.2em] mb-2">
                  Reviews
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
                  What Our Customers Say
                </h2>
                <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-4" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {REVIEWS.map((review) => (
                  <div
                    key={review.id}
                    data-ocid={review.ocid}
                    className="bg-card rounded-2xl shadow-card p-6 flex flex-col"
                  >
                    <StarRating rating={review.rating} />
                    <p className="text-foreground/80 text-sm leading-relaxed mt-4 flex-1 italic font-serif">
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 mt-6 pt-5 border-t border-border">
                      <div className="w-9 h-9 rounded-full bg-brand-green/15 flex items-center justify-center text-brand-green font-bold text-sm flex-shrink-0">
                        {review.initials}
                      </div>
                      <span className="font-semibold text-sm text-foreground">
                        {review.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Review Form */}
              <div className="max-w-2xl mx-auto bg-card rounded-3xl shadow-card p-8 border border-border/60">
                <h3 className="font-serif text-2xl font-bold text-foreground mb-2 text-center">
                  Share Your Experience
                </h3>
                <p className="text-muted-foreground text-sm text-center mb-8">
                  We'd love to hear from you
                </p>
                <form onSubmit={handleReviewSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label
                        htmlFor="review-name"
                        className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block"
                      >
                        Your Name
                      </Label>
                      <Input
                        id="review-name"
                        data-ocid="review.input"
                        value={reviewForm.name}
                        onChange={(e) =>
                          setReviewForm((p) => ({ ...p, name: e.target.value }))
                        }
                        placeholder="Fatima Rahman"
                        className="rounded-xl border-border/80 bg-background focus:border-brand-gold focus:ring-brand-gold"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="review-email"
                        className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block"
                      >
                        Email (optional)
                      </Label>
                      <Input
                        id="review-email"
                        type="email"
                        data-ocid="review.input"
                        value={reviewForm.email}
                        onChange={(e) =>
                          setReviewForm((p) => ({
                            ...p,
                            email: e.target.value,
                          }))
                        }
                        placeholder="you@example.com"
                        className="rounded-xl border-border/80 bg-background"
                      />
                    </div>
                  </div>
                  <div>
                    <Label
                      htmlFor="review-message"
                      className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block"
                    >
                      Your Review
                    </Label>
                    <Textarea
                      id="review-message"
                      data-ocid="review.textarea"
                      value={reviewForm.message}
                      onChange={(e) =>
                        setReviewForm((p) => ({
                          ...p,
                          message: e.target.value,
                        }))
                      }
                      placeholder="Share your experience with Verdant..."
                      rows={4}
                      className="rounded-xl border-border/80 bg-background resize-none focus:border-brand-gold"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                      Rating
                    </Label>
                    <StarRating
                      rating={reviewForm.rating}
                      onRate={(r) =>
                        setReviewForm((p) => ({ ...p, rating: r }))
                      }
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submitting}
                    data-ocid="review.submit_button"
                    className="w-full bg-brand-green text-white rounded-full py-3 font-semibold text-sm hover:bg-brand-green/90 transition-colors"
                  >
                    {submitting ? "Submitting..." : "Submit Review"}
                  </Button>
                </form>
              </div>
            </div>
          </section>

          {/* Delivery & Payment */}
          <section className="bg-white py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-brand-gold text-xs font-bold uppercase tracking-[0.2em] mb-2">
                  Hassle-Free
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
                  Delivery & Payment
                </h2>
                <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-4" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {PAYMENT_OPTIONS.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col items-center text-center p-8 rounded-3xl border border-border bg-background shadow-card"
                  >
                    <div className="w-14 h-14 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green mb-5">
                      {item.icon}
                    </div>
                    <h3 className="font-serif font-bold text-lg text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="bg-brand-green py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-brand-gold text-xs font-bold uppercase tracking-[0.2em] mb-3">
                We're Here
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
                Get In Touch
              </h2>
              <p className="text-white/70 mb-12 text-sm">
                Reach out to us via any of the channels below
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {CONTACT_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    data-ocid="contact.link"
                    className="flex items-center gap-4 p-5 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors group text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wider mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-white font-semibold text-sm group-hover:text-brand-gold transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="contact.primary_button"
                className="inline-flex items-center gap-2 bg-brand-gold text-white font-semibold px-8 py-3.5 rounded-full hover:bg-brand-gold/90 transition-all duration-200 shadow-gold text-sm"
              >
                <SiWhatsapp className="w-5 h-5" />
                Order on WhatsApp
              </a>
            </div>
          </section>
        </main>
      )}

      {/* Footer */}
      <footer className="bg-brand-green text-white/80 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <img
                src="/assets/generated/verdant-logo-transparent.dim_400x160.png"
                alt="Verdant"
                className="h-10 w-auto object-contain mb-3 brightness-200"
              />
              <p className="text-white/60 text-sm italic font-serif">
                Bringing Nature Closer to You
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-4">
                Quick Links
              </h4>
              <div className="flex flex-col gap-2">
                {FOOTER_LINKS.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => {
                      setPage("home");
                      setTimeout(() => scrollTo(link.id), 50);
                    }}
                    className="text-white/60 hover:text-brand-gold transition-colors text-sm text-left"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-4">
                Follow Us
              </h4>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/Jisanchowdhury69/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-gold/80 flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <SiFacebook className="w-4 h-4" />
                </a>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-gold/80 flex items-center justify-center transition-colors"
                  aria-label="WhatsApp"
                >
                  <SiWhatsapp className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
            <span>
              © {new Date().getFullYear()} Verdant. All rights reserved.
            </span>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-gold transition-colors"
            >
              Built with ❤️ using caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
