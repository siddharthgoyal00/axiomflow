export interface User {
  id: string; email: string; name: string;
  plan: "free"|"pro"|"enterprise";
  tokensUsed: number; tokenQuota: number; createdAt: string;
}
export interface AuthState {
  user: User|null; token: string|null; isAuthenticated: boolean;
  login: (email:string, password:string) => Promise<void>;
  register: (name:string, email:string, password:string) => Promise<void>;
  logout: () => void; setUser: (user:User) => void;
}
export interface Message {
  id: string; role: "user"|"assistant"; content: string;
  timestamp: string; tokens?: number;
}
export interface Document {
  id: string; name: string; size: number;
  status: "processing"|"ready"|"failed";
  uploadedAt: string; chunks?: number;
}
export interface BillingRecord {
  id: string; date: string; promptTokens: number;
  completionTokens: number; totalTokens: number;
  costInr: number; query: string;
}
export interface Plan {
  id: "free"|"pro"|"enterprise"; name: string;
  price: number; tokensPerMonth: number; features: string[];
}
