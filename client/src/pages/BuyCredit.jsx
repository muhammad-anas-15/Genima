import React, { useContext } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";

const BuyCredit = () => {
  const { user, backendUrl, loadCreditsData, token, setShowLogin } =
    useContext(AppContext);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const paymentStripe = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
        return;
      }

      if (!stripe || !elements) {
        toast.error("Stripe is still loading");
        return;
      }

      // Create PaymentIntent on backend
      const { data } = await axios.post(
        backendUrl + "/api/user/pay-stripe",
        { planId },
        { headers: { token } }
      );

      if (!data.success) {
        toast.error(data.message || "Payment initialization failed");
        return;
      }

      // Confirm payment on frontend
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        toast.success("Payment Successful");
        loadCreditsData();
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-[80vh] text-center pt-14 mb-10">
      <h1 className="text-3xl font-medium mb-10">Choose the Plan</h1>

      <div className="max-w-md mx-auto mb-10 border p-4 rounded-md">
        <CardElement />
      </div>

      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((item, index) => (
          <div key={index} className="bg-white border rounded-lg py-12 px-8 text-gray-600">
            <img src={assets.logo_icon} alt="" width={40} />
            <p className="mt-3 mb-1 font-semibold">{item.id}</p>
            <p className="text-sm">{item.desc}</p>
            <p className="mt-6">
              <span className="text-3xl font-medium">${item.price}</span> / {item.credits} credits
            </p>

            <button
              onClick={() => paymentStripe(item.id)}
              className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5"
            >
              {user ? "Purchase" : "Get Started"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCredit;
