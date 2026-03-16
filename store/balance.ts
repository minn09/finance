import { create } from "zustand";

type BalanceState = {
  bank: number;
  cash: number;
  pendingIncome: number;
  goal: number;
};

type BalanceActions = {
  total: () => number;
  setBank: (amount: number) => void;
  setCash: (amount: number) => void;
  setPendingIncome: (amount: number) => void;
  setGoal: (amount: number) => void;
};

export const useBalanceStore = create<BalanceState & BalanceActions>()(
  (set, get) => ({
    bank: 0,
    cash: 0,
    pendingIncome: 0,
    goal: 0,

    total: () => get().bank + get().cash,
    setBank: (amount) => set({ bank: amount }),
    setCash: (amount) => set({ cash: amount }),
    setPendingIncome: (amount) => set({ pendingIncome: amount }),
    setGoal: (amount) => set({ goal: amount }),
  }),
);
