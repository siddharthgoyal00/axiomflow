import { CheckCircle, Zap } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import type { Plan } from "../types";

const PLANS: Plan[] = [
  {id:"free",       name:"Free",       price:0,    tokensPerMonth:50000,  features:["50,000 tokens/month","5 uploads/hour","pgvector RAG","Community support"]},
  {id:"pro",        name:"Pro",        price:499,  tokensPerMonth:500000, features:["500,000 tokens/month","20 uploads/hour","Priority support","Billing dashboard","Usage analytics","Custom system prompts"]},
  {id:"enterprise", name:"Enterprise", price:1999, tokensPerMonth:-1,     features:["Unlimited tokens","Unlimited uploads","Dedicated support","Custom models","SLA guarantee","On-prem option"]},
];

declare global { interface Window { Razorpay: any; } }

export default function PricingPage() {
  const user = useAuthStore((s) => s.user);

  const handleUpgrade = async (plan: Plan) => {
    if (plan.price === 0) return;
    // TODO: const { data } = await api.post("/payment/create-order", { planId: plan.id });
    const mockOrderId = `order_${Date.now()}`;
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_placeholder",
      amount: plan.price * 100, currency: "INR",
      name: "AxiomFlow", description: `${plan.name} Plan`,
      order_id: mockOrderId, prefill: { email: user?.email ?? "" },
      theme: { color: "#0f172a" },
      handler: (_response: unknown) => alert(`Payment successful! ${plan.name} plan activated.`),
    };
    if (window.Razorpay) { new window.Razorpay(options).open(); }
    else {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => new window.Razorpay(options).open();
      document.body.appendChild(script);
    }
  };

  return (
    <div className="page-container py-12">
      <div className="text-center mb-12">
        <p className="section-label mb-3">Pricing</p>
        <h1 className="font-display text-4xl text-stone-900 mb-3">Simple, token-based pricing</h1>
        <p className="text-stone-500 max-w-md mx-auto">Pay for what you use. Downgrade or cancel anytime.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {PLANS.map((plan) => {
          const isCurrent=user?.plan===plan.id; const isPro=plan.id==="pro";
          return (
            <div key={plan.id} className={`card p-7 flex flex-col relative hover:shadow-card-hover transition-shadow ${isPro?"ring-2 ring-brand-500":""}`}>
              {isPro&&<span className="absolute -top-3.5 left-1/2 -translate-x-1/2 badge bg-brand-600 text-white px-3 text-xs">Most popular</span>}
              {isCurrent&&<span className="absolute -top-3.5 right-4 badge bg-stone-800 text-white px-3 text-xs">Current</span>}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isPro?"bg-brand-600":"bg-stone-100"}`}>
                    <Zap size={14} className={isPro?"text-white":"text-stone-500"}/>
                  </div>
                  <h2 className="font-sans font-medium text-stone-900">{plan.name}</h2>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-4xl text-stone-900">{plan.price===0?"Free":`₹${plan.price}`}</span>
                  {plan.price>0&&<span className="text-stone-400 text-sm">/month</span>}
                </div>
                <p className="text-sm text-stone-400 mt-1">{plan.tokensPerMonth===-1?"Unlimited tokens":`${plan.tokensPerMonth.toLocaleString()} tokens/month`}</p>
              </div>
              <ul className="flex-1 space-y-2.5 mb-6">
                {plan.features.map(f=>(
                  <li key={f} className="flex items-center gap-2.5 text-sm text-stone-600">
                    <CheckCircle size={14} className={isPro?"text-brand-500":"text-stone-400"}/>{f}
                  </li>
                ))}
              </ul>
              <button disabled={isCurrent||plan.price===0} onClick={()=>handleUpgrade(plan)}
                className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all
                  ${isCurrent?"bg-stone-100 text-stone-400 cursor-default":plan.price===0?"bg-stone-100 text-stone-500 cursor-default":isPro?"btn-brand":"btn-secondary"}`}>
                {isCurrent?"Current plan":plan.price===0?"Get started free":`Upgrade to ${plan.name}`}
              </button>
            </div>
          );
        })}
      </div>
      <p className="text-center text-xs text-stone-400 mt-8">Payments powered by Razorpay · Secure · Cancel anytime</p>
    </div>
  );
}
