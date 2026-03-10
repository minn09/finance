import { mockTransactions } from "@/lib/data";
import { create } from "zustand";

type Transaction = {
  id: string;
  name: string;
  category:
    | "subscription"
    | "dining"
    | "income"
    | "transport"
    | "buy"
    | "other";
  date: Date;
  amount: number;
  kind: "income" | "expense";
};

type TransactionActions = {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: string) => void;
  getRecent: (limit?: number) => Transaction[];
};

export const useTransactionStore = create<TransactionActions>()((set, get) => ({
  transactions: mockTransactions,
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),

  removeTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),

  getRecent: (limit = 4) => get().transactions.slice(0, limit),
}));
