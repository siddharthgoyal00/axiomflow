import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../store/authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const [show,setShow]=useState(false); const [loading,setLoading]=useState(false); const [error,setError]=useState("");

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault(); setError(""); setLoading(true);
    try { await login(email,password); navigate("/chat"); }
    catch { setError("Invalid email or password."); }
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
          <h1 className="font-display text-2xl text-stone-900 mb-1">Welcome back</h1>
          <p className="text-sm text-stone-500 mb-6">Sign in to your account</p>
          {error&&<div className="mb-4 px-3 py-2.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Email</label>
              <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" className="input"/>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-stone-700">Password</label>
                <a href="#" className="text-xs text-brand-600 hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <input type={show?"text":"password"} required value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" className="input pr-10"/>
                <button type="button" onClick={()=>setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600">
                  {show?<EyeOff size={15}/>:<Eye size={15}/>}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 mt-1 disabled:opacity-50">
              {loading?"Signing in…":"Sign in"}
            </button>
          </form>
        </div>
        <p className="text-center text-sm text-stone-500 mt-5">
          Don't have an account? <Link to="/register" className="text-brand-600 font-medium hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}
