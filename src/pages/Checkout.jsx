import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";


const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(stripePublicKey);

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/payments/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 1, currency: "usd" })
    })
      .then(async (res) => {
        // Check if response is OK
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
        }
        
        // Check if response has content
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        
        // Parse JSON
        const data = await res.json();
        return data;
      })
      .then(data => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setError("No clientSecret in response");
        }
      })
      .catch(err => {
        console.error("Error creating payment intent:", err);
        setError(err.message || "Failed to create payment intent");
      });
  }, []);

  const appearance = { theme: "stripe" };

  return (
    clientSecret && (
      <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
        <CheckoutForm clientSecret={clientSecret} />
      </Elements>
    )
  );
}
