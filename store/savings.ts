import { create } from "zustand";
type SavingsState = {
  currentSave: string;
  goal: number;
  saved: number;
};

type SavingsActions = {
  progress: () => number;
  setGoal: (amount: number) => void;
  setSaved: (amount: number) => void;
};

export const useSavingsStore = create<SavingsState & SavingsActions>()(
  (set, get) => ({
    goal: 1200,
    saved: 199,
    currentSave: "Iphone 12",

    progress: () => {
      const { goal, saved } = get();
      if (goal === 0) return 0;
      //TODO: Puede fallar por diferencias de decimales 15.9 o 15.0 lo toma como 15
      return Math.trunc((saved / goal) * 100);
    },

    setGoal: (amount) => set({ goal: amount }),
    setSaved: (amount) => set({ saved: amount }),
  }),
);
