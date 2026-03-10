export type Transaction = {
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
