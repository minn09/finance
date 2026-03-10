import { mockTransactions } from "@/lib/data";
import { create } from "zustand";
import { Transaction } from "@/types/transactions";
import { MAX_RECENT_TRANSACTIONS } from "@/lib/constants";

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

  getRecent: (limit = MAX_RECENT_TRANSACTIONS) =>
    get().transactions.slice(0, limit),
}));
