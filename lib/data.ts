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
export const mockTransactions: Transaction[] = [
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
];
