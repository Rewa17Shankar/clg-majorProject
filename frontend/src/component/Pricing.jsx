import React, { useState } from "react";
import { Check } from "lucide-react";

export default function Pricing() {
  // State for buyer info
  const [buyer, setBuyer] = useState({
    firstname: "",
    email: "",
    phone: ""
  });

  // Loading state for payment processing
  const [loading, setLoading] = useState(false);

  // Error message state
  const [error, setError] = useState("");

  // Define tiers (plans)
  const tiers = [
    {
      id: "free",
      name: "Free",
      subtitle: "Get started with OnBoard-X",
      amount: "0.00",
      priceLabel: "Free",
      buttonText: "Activate Free Plan",
      features: [
        "Up to 10 employees",
        "Basic attendance tracking",
        "Leave management",
        "Employee directory",
        "Email support"
      ]
    },
    {
      id: "small",
      name: "Small (<100 users)",
      subtitle: "Best for small businesses",
      amount: "4999.00",
      priceLabel: "₹4,999 / month",
      buttonText: "Buy Small Plan",
      features: [
        "Up to 100 employees",
        "Advanced attendance & shifts",
        "Leave & payroll automation",
        "Email & chat support"
      ]
    },
    {
      id: "large",
      name: "Large (>100 users)",
      subtitle: "Scale ready",
      amount: "14999.00",
      priceLabel: "₹14,999 / month",
      buttonText: "Buy Large Plan",
      features: [
        "Unlimited employees",
        "Priority payroll processing",
        "Performance & analytics",
        "Dedicated account manager"
      ]
    }
  ];

  // Buyer form validation
  function validateBuyer() {
    const { firstname, email, phone } = buyer;
    if (!firstname || !email || !phone) {
      setError("Please enter name, email and phone.");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!/^[0-9+\-()\s]{7,20}$/.test(phone)) {
      setError("Please enter a valid phone number.");
      return false;
    }
    setError("");
    return true;
  }

  // Payment handler
  async function handlePurchase(plan) {
    if (plan.id === "free") {
      alert("Free plan activated. You can start using OnBoard-X.");
      return;
    }

    if (!validateBuyer()) return;

    setLoading(true);
    setError("");

    try {
      const productinfo = `${plan.name} plan - ${plan.subtitle}`;
      const payload = {
        amount: plan.amount,
        productinfo,
        firstname: buyer.firstname,
        email: buyer.email,
        phone: buyer.phone
      };

      const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000" || "https://clg-majorprojrct.onrender.com";
      const res = await fetch(`${API_BASE}/api/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Payment initiation failed");
      }

      const data = await res.json();
      if (!data || !data.action || !data.params) {
        throw new Error("Invalid payment response from server.");
      }

      // Submit form to PayU gateway
      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.action;
      form.style.display = "none";

      Object.keys(data.params).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = data.params[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
      setLoading(false);
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.message || "Could not initiate payment. Try again.");
      setLoading(false);
    }
  }

  return (
    <section id="pricing" className="relative py-20 bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Plans that grow with you
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose a plan based on how many employees you need to manage. Payments processed securely via PayU.
          </p>
        </div>

        {/* Buyer info */}
        <div className="bg-slate-900/50 p-6 rounded-xl mb-8 border border-slate-800">
          <h4 className="text-white font-semibold mb-3">Your details</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              value={buyer.firstname}
              onChange={(e) => setBuyer(s => ({ ...s, firstname: e.target.value }))}
              placeholder="Full name"
              className="p-3 rounded-md bg-slate-800 border border-slate-700 placeholder-gray-400 text-white"
            />
            <input
              value={buyer.email}
              onChange={(e) => setBuyer(s => ({ ...s, email: e.target.value }))}
              placeholder="Email"
              className="p-3 rounded-md bg-slate-800 border border-slate-700 placeholder-gray-400 text-white"
            />
            <input
              value={buyer.phone}
              onChange={(e) => setBuyer(s => ({ ...s, phone: e.target.value }))}
              placeholder="Phone"
              className="p-3 rounded-md bg-slate-800 border border-slate-700 placeholder-gray-400 text-white"
            />
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {tiers.map(plan => (
            <div
              key={plan.id}
              className={`p-6 rounded-2xl border transition-all duration-200 ${
                plan.id === "large"
                  ? "bg-slate-900/70 border-cyan-500/40 hover:border-cyan-400"
                  : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="text-gray-400 text-sm">{plan.subtitle}</p>
              </div>

              <div className="mb-6">
                <div className="text-3xl font-bold text-white">{plan.priceLabel}</div>
              </div>

              <button
                onClick={() => handlePurchase(plan)}
                disabled={loading}
                className={`w-full py-3 rounded-lg font-medium transition-all duration-200 mb-6 ${
                  plan.id === "small" || plan.id === "large"
                    ? "bg-white text-slate-900 hover:bg-gray-100"
                    : "bg-slate-800 text-white border border-slate-700 hover:bg-slate-700"
                }`}
              >
                {loading ? "Processing..." : plan.buttonText}
              </button>

              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {error && (
          <div className="text-red-400 text-sm mb-4">
            {error}
          </div>
        )}

        <p className="text-gray-500 text-xs text-center">
          * Prices shown are a sample. Taxes and gateway charges may apply.
        </p>
      </div>
    </section>
  );
}
