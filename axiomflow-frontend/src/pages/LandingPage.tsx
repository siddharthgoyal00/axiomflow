import { Link } from "react-router-dom";
import { ArrowRight,FileText,Zap,Shield,BarChart2,Upload,MessageSquare,CheckCircle } from "lucide-react";

const FEATURES=[
  {icon:Upload,        title:"Upload any PDF",         desc:"Drag and drop. We parse, chunk, and embed instantly via Apache Tika."},
  {icon:MessageSquare, title:"Chat with your docs",    desc:"Ask in plain English. Answers grounded in your documents via pgvector RAG."},
  {icon:Zap,           title:"Async AI pipeline",      desc:"Kafka decouples upload from embedding. Uploads return instantly."},
  {icon:BarChart2,     title:"Token-level billing",    desc:"Know exactly what each query costs. Transparent SaaS unit economics."},
  {icon:Shield,        title:"JWT auth + rate limits", desc:"Stateless Spring Security filter chain + Bucket4j per-user rate limiting."},
  {icon:FileText,      title:"pgvector semantic search",desc:"Vector similarity in PostgreSQL. No separate vector database needed."},
];
const PLANS=[
  {name:"Free",       price:0,    tokens:"50K",  popular:false, features:["50,000 tokens/month","5 uploads/hour","Standard support","pgvector RAG"]},
  {name:"Pro",        price:499,  tokens:"500K", popular:true,  features:["500,000 tokens/month","20 uploads/hour","Priority support","Billing dashboard","Usage analytics"]},
  {name:"Enterprise", price:1999, tokens:"∞",    popular:false, features:["Unlimited tokens","Unlimited uploads","Dedicated support","Custom models","SLA guarantee"]},
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur sticky top-0 z-40">
        <div className="page-container h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 font-display text-lg text-stone-900">
            <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center"><Zap size={14} className="text-white"/></div>
            AxiomFlow
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="btn-secondary">Sign in</Link>
            <Link to="/register" className="btn-primary">Get started</Link>
          </div>
        </div>
      </header>

      <section className="page-container pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 badge bg-brand-50 text-brand-600 mb-6 animate-fade-up stagger-1">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"/>
          Event-driven · RAG · Self-hosted LLM
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl text-stone-900 leading-[1.1] mb-6 animate-fade-up stagger-2">
          Chat with your<br/><span className="italic text-stone-400">documents</span>, intelligently
        </h1>
        <p className="text-lg text-stone-500 max-w-xl mx-auto mb-10 animate-fade-up stagger-3">
          Upload PDFs. Ask questions. Get answers grounded in your content — powered by a production-grade RAG pipeline.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap animate-fade-up stagger-4">
          <Link to="/register" className="btn-primary btn-lg">Start for free <ArrowRight size={16}/></Link>
          <Link to="/login"    className="btn-secondary btn-lg">Sign in</Link>
        </div>
        <div className="mt-16 grid grid-cols-3 gap-px bg-stone-200 rounded-xl overflow-hidden max-w-lg mx-auto">
          {[["pgvector","Vector store"],["Kafka","Async pipeline"],["Ollama","Free LLM"]].map(([val,label])=>(
            <div key={label} className="bg-white py-4 px-6 text-center">
              <div className="font-display text-xl text-stone-900">{val}</div>
              <div className="text-xs text-stone-400 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="page-container pb-24">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Platform</p>
          <h2 className="text-3xl text-stone-900">Everything you need</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(({icon:Icon,title,desc})=>(
            <div key={title} className="card p-5 hover:shadow-card-hover transition-shadow">
              <div className="w-9 h-9 bg-stone-100 rounded-lg flex items-center justify-center mb-4"><Icon size={17} className="text-stone-600"/></div>
              <h3 className="font-sans font-medium text-stone-900 text-sm mb-1.5">{title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-stone-200 py-24">
        <div className="page-container">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Pricing</p>
            <h2 className="text-3xl text-stone-900">Simple, token-based pricing</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {PLANS.map((plan)=>(
              <div key={plan.name} className={`card p-6 relative flex flex-col ${plan.popular?"ring-2 ring-brand-500":""}`}>
                {plan.popular&&<span className="absolute -top-3 left-1/2 -translate-x-1/2 badge bg-brand-600 text-white text-xs px-3">Most popular</span>}
                <div className="mb-4">
                  <h3 className="font-sans font-medium text-stone-900">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="font-display text-3xl text-stone-900">{plan.price===0?"Free":`₹${plan.price}`}</span>
                    {plan.price>0&&<span className="text-stone-400 text-sm">/month</span>}
                  </div>
                  <p className="text-xs text-stone-400 mt-1">{plan.tokens} tokens/month</p>
                </div>
                <ul className="flex-1 space-y-2 mb-6">
                  {plan.features.map((f)=>(
                    <li key={f} className="flex items-center gap-2 text-sm text-stone-600">
                      <CheckCircle size={14} className="text-brand-500 shrink-0"/>{f}
                    </li>
                  ))}
                </ul>
                <Link to="/register" className={plan.popular?"btn-brand text-center rounded-lg py-2 text-sm":"btn-secondary text-center"}>
                  {plan.price===0?"Get started":"Upgrade"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="page-container py-10 flex items-center justify-between text-sm text-stone-400">
        <div className="flex items-center gap-2 font-display text-stone-600">
          <div className="w-5 h-5 bg-accent rounded flex items-center justify-center"><Zap size={10} className="text-white"/></div>
          AxiomFlow
        </div>
        <p>Document Intelligence SaaS</p>
      </footer>
    </div>
  );
}
