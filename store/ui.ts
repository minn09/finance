import { create } from "zustand";

type DialogId = "transaction" | "balance" | "budget" | null;

type UIStore = {
  activeDialog: DialogId;
  openDialog: (id: DialogId) => void;
  closeDialog: () => void;
};

export const useUIStore = create<UIStore>((set) => ({
  activeDialog: null,
  openDialog: (id) => set({ activeDialog: id }),
  closeDialog: () => set({ activeDialog: null }),
}));
