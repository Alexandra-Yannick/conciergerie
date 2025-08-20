// src/lib/stripe.js
import { loadStripe } from "@stripe/stripe-js";

// Côté client uniquement
export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);