import { Link, useLocation, useNavigate } from "react-router-dom";
import { FileText, LayoutDashboard, CreditCard, LogOut, Menu, X, Zap } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";

const NAV = [
  { to:"/chat",      label:"Chat",      icon:FileText },
  { to:"/dashboard", label:"Dashboard", icon:LayoutDashboard },
  { to:"/billing",   label:"Billing",   icon:CreditCard },
];
const PLAN_COLOR: Record<string,string> = {
  free:"bg-stone-100 text-stone-500",
  pro:"bg-brand-50 text-brand-600",
  enterprise:"bg-amber-50 text-amber-600",
};

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-stone-200">
      <div className="page-container h-14 flex items-center justify-between gap-4">
        <Link to="/chat" className="flex items-center gap-2 font-display text-lg text-stone-900 shrink-0">
          <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center"><Zap size={14} className="text-white"/></div>
          AxiomFlow
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map(({to,label,icon:Icon})=>(
            <Link key={to} to={to} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors
              ${pathname.startsWith(to)?"bg-stone-100 text-stone-900 font-medium":"text-stone-500 hover:text-stone-800 hover:bg-stone-50"}`}>
              <Icon size={15}/>{label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          {user && (<>
            <span className={`badge capitalize ${PLAN_COLOR[user.plan]}`}>{user.plan}</span>
            <span className="text-sm text-stone-500 font-medium">{user.name}</span>
          </>)}
          <button onClick={handleLogout} className="text-stone-400 hover:text-stone-700 transition-colors"><LogOut size={15}/></button>
        </div>
        <button className="md:hidden text-stone-500" onClick={()=>setOpen(!open)}>
          {open?<X size={20}/>:<Menu size={20}/>}
        </button>
      </div>
      {open&&(
        <div className="md:hidden border-t border-stone-100 bg-white px-4 py-3 flex flex-col gap-1">
          {NAV.map(({to,label,icon:Icon})=>(
            <Link key={to} to={to} onClick={()=>setOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${pathname.startsWith(to)?"bg-stone-100 font-medium":"text-stone-600"}`}>
              <Icon size={15}/>{label}
            </Link>
          ))}
          <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 text-sm text-stone-500 mt-1">
            <LogOut size={15}/>Sign out
          </button>
        </div>
      )}
    </header>
  );
}
