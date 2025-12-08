import {loadStripe} from "@stripe/stripe-js";
import {Elements, CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Create PaymentIntent from backend
    const response = await axios.post("http://localhost:8080/api/payment/create-payment-intent", {
      amount: 1000, // $10
      currency: "usd"
    });

    const clientSecret = response.data.clientSecret;

    // 2. Confirm card payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (result.error) {
      alert(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        alert("Payment Successful!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4">
      <CardElement />
      <button className="mt-4 px-4 py-2 bg-black text-white" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
    