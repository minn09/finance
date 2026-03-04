import { create } from "zustand";

type CardState = {
  payment_networks: "visa" | "mastercard" | "amex";
  card_number: string;
  holder_name: string;
  card_expiry: string;
};

export const useCardStore = create<CardState>()(() => ({
  payment_networks: "visa",
  card_number: "4291",
  holder_name: "Alex Thompson",
  card_expiry: "12/26",
}));
