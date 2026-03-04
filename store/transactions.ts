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
  transactions: [
    {
      id: "ABC123",
      name: "Iphone 12",
      category: "buy",
      date: new Date(),
      amount: 12,
      kind: "income",
    },
    {
      id: "DEF456",
      name: "Spotify",
      category: "subscription",
      date: new Date(),
      amount: 12,
      kind: "expense",
    },
    {
      id: "GHI789",
      name: "Salary",
      category: "income",
      date: new Date(),
      amount: 1000,
      kind: "income",
    },
    {
      id: "JKL012",
      name: "Dinner at The Green Bistro",
      category: "dining",
      date: new Date(),
      amount: 45.5,
      kind: "expense",
    },
    {
      id: "MNO345",
      name: "Salary Deposit",
      category: "income",
      date: new Date(),
      amount: 4200,
      kind: "income",
    },
  ],

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
