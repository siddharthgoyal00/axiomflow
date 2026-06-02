import { FileText, MessageSquare, Zap, TrendingUp, ArrowUpRight } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { Link } from "react-router-dom";

const RECENT=[
  {query:"What are the key findings in the Q3 report?",         time:"2 min ago", tokens:312},
  {query:"Summarise the architecture specification document.",   time:"1 hr ago",  tokens:508},
  {query:"List all compliance requirements from HR policy.",     time:"3 hr ago",  tokens:244},
  {query:"What is the estimated infrastructure cost for 2025?",  time:"Yesterday", tokens:189},
];
const PLAN_COLOR:Record<string,string>={free:"bg-stone-100 text-stone-600",pro:"bg-brand-50 text-brand-700",enterprise:"bg-amber-50 text-amber-700"};

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  if (!user) return null;
  const pct = Math.round((user.tokensUsed/user.tokenQuota)*100);

  return (
    <div className="page-container py-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="section-label mb-1">Overview</p>
          <h1 className="font-display text-3xl text-stone-900">Good morning, {user.name.split(" ")[0]}</h1>
          <p className="text-stone-500 text-sm mt-1">Here's what's happening with your account.</p>
        </div>
        <span className={`badge capitalize ${PLAN_COLOR[user.plan]}`}>{user.plan} plan</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {label:"Tokens used",      value:user.tokensUsed.toLocaleString(), icon:Zap,           sub:`of ${user.tokenQuota.toLocaleString()} quota`},
          {label:"Documents",        value:"3",                              icon:FileText,      sub:"2 ready · 1 processing"},
          {label:"Queries today",    value:"7",                              icon:MessageSquare, sub:"+3 from yesterday"},
          {label:"Avg tokens/query", value:"313",                            icon:TrendingUp,    sub:"Last 30 days"},
        ].map(({label,value,icon:Icon,sub})=>(
          <div key={label} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-stone-500 font-medium">{label}</p>
              <div className="w-7 h-7 bg-stone-100 rounded-lg flex items-center justify-center"><Icon size={14} className="text-stone-500"/></div>
            </div>
            <p className="font-display text-2xl text-stone-900">{value}</p>
            <p className="text-xs text-stone-400 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="card p-5 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-stone-700">Token quota</p>
            <span className="text-xs text-stone-400">{pct}% used</span>
          </div>
          <div className="w-full bg-stone-100 rounded-full h-2 mb-3">
            <div className={`h-2 rounded-full transition-all ${pct>80?"bg-red-400":pct>60?"bg-amber-400":"bg-brand-500"}`} style={{width:`${pct}%`}}/>
          </div>
          <div className="flex justify-between text-xs text-stone-400 mb-5">
            <span>{user.tokensUsed.toLocaleString()} used</span>
            <span>{(user.tokenQuota-user.tokensUsed).toLocaleString()} left</span>
          </div>
          <Link to="/pricing" className="btn-brand w-full text-center text-sm py-2 rounded-lg block">
            Upgrade plan <ArrowUpRight size={13} className="inline ml-1"/>
          </Link>
        </div>

        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-stone-700">Recent queries</p>
            <Link to="/billing" className="text-xs text-brand-600 hover:underline">View all</Link>
          </div>
          <div className="space-y-1">
            {RECENT.map((r,i)=>(
              <div key={i} className="flex items-center gap-3 py-2.5 border-b border-stone-100 last:border-0">
                <div className="w-7 h-7 bg-stone-100 rounded-lg flex items-center justify-center shrink-0"><MessageSquare size={13} className="text-stone-400"/></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-stone-700 truncate">{r.query}</p>
                  <p className="text-xs text-stone-400 mt-0.5">{r.time}</p>
                </div>
                <span className="text-xs font-mono text-stone-400 shrink-0">{r.tokens} tok</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
