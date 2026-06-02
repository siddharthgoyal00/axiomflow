import { Download } from "lucide-react";
import type { BillingRecord } from "../types";

const RECORDS: BillingRecord[] = [
  {id:"b1",date:"2024-11-04 14:32",promptTokens:210,completionTokens:102,totalTokens:312,costInr:0.03,query:"What are the key findings in Q3?"},
  {id:"b2",date:"2024-11-04 11:15",promptTokens:340,completionTokens:168,totalTokens:508,costInr:0.05,query:"Summarise the architecture spec."},
  {id:"b3",date:"2024-11-04 09:48",promptTokens:160,completionTokens:84, totalTokens:244,costInr:0.02,query:"List compliance requirements."},
  {id:"b4",date:"2024-11-03 17:20",promptTokens:120,completionTokens:69, totalTokens:189,costInr:0.02,query:"Infrastructure cost estimate 2025?"},
  {id:"b5",date:"2024-11-03 14:05",promptTokens:280,completionTokens:130,totalTokens:410,costInr:0.04,query:"Compare KPIs across departments."},
  {id:"b6",date:"2024-11-02 10:33",promptTokens:195,completionTokens:97, totalTokens:292,costInr:0.03,query:"What is the headcount target?"},
];
const TOTAL_TOKENS=RECORDS.reduce((s,r)=>s+r.totalTokens,0);
const TOTAL_COST  =RECORDS.reduce((s,r)=>s+r.costInr,0);

export default function BillingPage() {
  const downloadCsv=()=>{
    const header="Date,Query,Prompt Tokens,Completion Tokens,Total Tokens,Cost (₹)";
    const rows=RECORDS.map(r=>`"${r.date}","${r.query}",${r.promptTokens},${r.completionTokens},${r.totalTokens},${r.costInr.toFixed(3)}`);
    const blob=new Blob([[header,...rows].join("\n")],{type:"text/csv"});
    const url=URL.createObjectURL(blob); const a=document.createElement("a");
    a.href=url; a.download="axiomflow_billing.csv"; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="page-container py-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="section-label mb-1">Billing</p>
          <h1 className="font-display text-3xl text-stone-900">Usage &amp; costs</h1>
          <p className="text-stone-500 text-sm mt-1">Token consumption per query this month</p>
        </div>
        <button onClick={downloadCsv} className="btn-secondary flex items-center gap-1.5"><Download size={14}/>Export CSV</button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          {label:"Total tokens this month",value:TOTAL_TOKENS.toLocaleString()},
          {label:"Total queries",          value:RECORDS.length.toString()},
          {label:"Estimated cost",         value:`₹${TOTAL_COST.toFixed(2)}`},
        ].map(({label,value})=>(
          <div key={label} className="card p-5">
            <p className="text-xs text-stone-500 mb-2">{label}</p>
            <p className="font-display text-2xl text-stone-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50">
                {["Date","Query","Prompt","Completion","Total","Cost (₹)"].map(h=>(
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-stone-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECORDS.map((r,i)=>(
                <tr key={r.id} className={`border-b border-stone-100 last:border-0 hover:bg-stone-50 transition-colors ${i%2===0?"":"bg-stone-50/30"}`}>
                  <td className="px-4 py-3 font-mono text-xs text-stone-400 whitespace-nowrap">{r.date}</td>
                  <td className="px-4 py-3 text-stone-700 max-w-xs truncate">{r.query}</td>
                  <td className="px-4 py-3 font-mono text-xs text-stone-500">{r.promptTokens}</td>
                  <td className="px-4 py-3 font-mono text-xs text-stone-500">{r.completionTokens}</td>
                  <td className="px-4 py-3 font-mono text-xs font-medium text-stone-700">{r.totalTokens}</td>
                  <td className="px-4 py-3 font-mono text-xs text-stone-500">₹{r.costInr.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-stone-50 border-t border-stone-200">
                <td className="px-4 py-3 text-xs font-medium text-stone-500" colSpan={2}>Total</td>
                <td className="px-4 py-3" colSpan={2}/>
                <td className="px-4 py-3 font-mono text-xs font-medium text-stone-900">{TOTAL_TOKENS.toLocaleString()}</td>
                <td className="px-4 py-3 font-mono text-xs font-medium text-stone-900">₹{TOTAL_COST.toFixed(3)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
