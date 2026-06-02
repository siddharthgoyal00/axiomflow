import { useState, useRef, useEffect } from "react";
import type { FormEvent } from "react";
import { Upload, Send, FileText, X, Loader2, Bot, User } from "lucide-react";
import type { Message, Document } from "../types";

const MOCK_DOCS: Document[] = [
  {id:"d1",name:"Q3_Report_2024.pdf",    size:2400000,status:"ready",      uploadedAt:"2024-11-01",chunks:48},
  {id:"d2",name:"Architecture_Spec.pdf", size:850000, status:"ready",      uploadedAt:"2024-11-03",chunks:22},
  {id:"d3",name:"HR_Policy_v2.pdf",      size:1200000,status:"processing", uploadedAt:"2024-11-04"},
];
const MOCK_REPLY="Based on the documents you've uploaded, I found the following relevant information:\n\nThe Q3 Report highlights a 23% revenue increase YoY, primarily driven by enterprise customer growth. The Architecture Spec outlines the event-driven microservices design using Kafka and pgvector for semantic retrieval.\n\nIs there a specific section you'd like me to elaborate on?";
const fmt=(bytes:number)=>bytes<1e6?`${(bytes/1e3).toFixed(0)} KB`:`${(bytes/1e6).toFixed(1)} MB`;

export default function ChatPage() {
  const [docs,setDocs]=useState<Document[]>(MOCK_DOCS);
  const [messages,setMessages]=useState<Message[]>([
    {id:"0",role:"assistant",content:"Hi! Upload a PDF and ask me anything about it. I'll search through your documents semantically.",timestamp:new Date().toISOString()},
  ]);
  const [input,setInput]=useState(""); const [loading,setLoading]=useState(false); const [dragging,setDragging]=useState(false);
  const bottomRef=useRef<HTMLDivElement>(null); const fileRef=useRef<HTMLInputElement>(null);

  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:"smooth"}); },[messages]);

  const handleUpload=(files:FileList|null)=>{
    if(!files)return;
    Array.from(files).forEach((file)=>{
      if(file.type!=="application/pdf")return;
      const doc:Document={id:`d${Date.now()}`,name:file.name,size:file.size,status:"processing",uploadedAt:new Date().toISOString()};
      setDocs(p=>[doc,...p]);
      setTimeout(()=>setDocs(p=>p.map(d=>d.id===doc.id?{...d,status:"ready",chunks:Math.floor(Math.random()*40)+10}:d)),3000);
    });
  };

  const handleSend=async(e:FormEvent)=>{
    e.preventDefault(); if(!input.trim()||loading)return;
    const userMsg:Message={id:Date.now().toString(),role:"user",content:input.trim(),timestamp:new Date().toISOString()};
    setMessages(p=>[...p,userMsg]); setInput(""); setLoading(true);
    await new Promise(r=>setTimeout(r,1800));
    setMessages(p=>[...p,{id:(Date.now()+1).toString(),role:"assistant",content:MOCK_REPLY,timestamp:new Date().toISOString(),tokens:312}]);
    setLoading(false);
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] flex">
      <aside className="w-64 shrink-0 border-r border-stone-200 bg-white hidden md:flex flex-col">
        <div className="p-4 border-b border-stone-100">
          <p className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-3">Documents</p>
          <div onDragOver={e=>{e.preventDefault();setDragging(true)}} onDragLeave={()=>setDragging(false)}
            onDrop={e=>{e.preventDefault();setDragging(false);handleUpload(e.dataTransfer.files)}}
            onClick={()=>fileRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors
              ${dragging?"border-brand-400 bg-brand-50":"border-stone-200 hover:border-stone-300 hover:bg-stone-50"}`}>
            <Upload size={18} className="mx-auto mb-1.5 text-stone-400"/>
            <p className="text-xs text-stone-500 font-medium">Drop PDF or click</p>
            <p className="text-xs text-stone-400 mt-0.5">Max 10 MB</p>
          </div>
          <input ref={fileRef} type="file" accept="application/pdf" multiple className="hidden" onChange={e=>handleUpload(e.target.files)}/>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {docs.map(doc=>(
            <div key={doc.id} className="group flex items-start gap-2.5 px-2.5 py-2 rounded-lg hover:bg-stone-50 transition-colors">
              <FileText size={15} className={`mt-0.5 shrink-0 ${doc.status==="ready"?"text-brand-500":"text-stone-300"}`}/>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-stone-700 truncate">{doc.name}</p>
                <div className="mt-0.5">
                  {doc.status==="processing"
                    ?<span className="flex items-center gap-1 text-[10px] text-amber-500"><Loader2 size={9} className="animate-spin"/>Processing…</span>
                    :<span className="text-[10px] text-stone-400">{doc.chunks} chunks · {fmt(doc.size)}</span>}
                </div>
              </div>
              <button onClick={()=>setDocs(p=>p.filter(d=>d.id!==doc.id))} className="opacity-0 group-hover:opacity-100 text-stone-300 hover:text-stone-500 transition-opacity mt-0.5">
                <X size={12}/>
              </button>
            </div>
          ))}
        </div>
      </aside>

      <div className="flex-1 flex flex-col bg-stone-50">
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5">
          {messages.map(msg=>(
            <div key={msg.id} className={`flex items-start gap-3 ${msg.role==="user"?"flex-row-reverse":""}`}>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${msg.role==="assistant"?"bg-accent":"bg-brand-100"}`}>
                {msg.role==="assistant"?<Bot size={13} className="text-white"/>:<User size={13} className="text-brand-600"/>}
              </div>
              <div className={`max-w-[75%] rounded-xl px-4 py-3 text-sm leading-relaxed
                ${msg.role==="assistant"?"bg-white border border-stone-200 text-stone-700 shadow-card":"bg-accent text-white"}`}>
                {msg.content.split("\n").map((line,i,a)=><span key={i}>{line}{i<a.length-1&&<br/>}</span>)}
                {msg.tokens&&<p className="text-[10px] text-stone-400 mt-1.5">{msg.tokens} tokens</p>}
              </div>
            </div>
          ))}
          {loading&&(
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center shrink-0"><Bot size={13} className="text-white"/></div>
              <div className="bg-white border border-stone-200 rounded-xl px-4 py-3 shadow-card">
                <div className="flex gap-1.5">
                  {[0,1,2].map(i=><span key={i} className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce" style={{animationDelay:`${i*0.15}s`}}/>)}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef}/>
        </div>
        <div className="border-t border-stone-200 bg-white px-4 py-3">
          <form onSubmit={handleSend} className="flex gap-2 max-w-3xl mx-auto">
            <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask anything about your documents…" className="input flex-1" disabled={loading}/>
            <button type="submit" disabled={loading||!input.trim()} className="btn-primary px-3.5 disabled:opacity-40"><Send size={15}/></button>
          </form>
        </div>
      </div>
    </div>
  );
}
