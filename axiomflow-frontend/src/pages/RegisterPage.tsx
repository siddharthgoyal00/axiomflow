import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../store/authStore";

export default function RegisterPage() {
  const navigate = useNavigate();
  const register = useAuthStore((s) => s.register);
  const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const [show,setShow]=useState(false); const [loading,setLoading]=useState(false); const [error,setError]=useState("");

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();
    if(password.length<8){ setError("Password must be at least 8 characters."); return; }
    setError(""); setLoading(true);
    try { await register(name,email,password); navigate("/chat"); }
    catch { setError("Registration failed. Please try again."); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center"><Zap size={15} className="text-white"/></div>
          <span className="font-display text-xl text-stone-900">AxiomFlow</span>
        </Link>
        <div className="card p-7">
          <h1 className="font-display text-2xl text-stone-900 mb-1">Create an account</h1>
          <p className="text-sm text-stone-500 mb-6">Start with 50,000 free tokens</p>
          {error&&<div className="mb-4 px-3 py-2.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Full name</label>
              <input type="text" required value={name} onChange={e=>setName(e.target.value)} placeholder="Arjun Sharma" className="input"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Email</label>
              <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" className="input"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Password</label>
              <div className="relative">
                <input type={show?"text":"password"} required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Min. 8 characters" className="input pr-10"/>
                <button type="button" onClick={()=>setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600">
                  {show?<EyeOff size={15}/>:<Eye size={15}/>}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 mt-1 disabled:opacity-50">
              {loading?"Creating account…":"Create account"}
            </button>
          </form>
        </div>
        <p className="text-center text-sm text-stone-500 mt-5">
          Already have an account? <Link to="/login" className="text-brand-600 font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
