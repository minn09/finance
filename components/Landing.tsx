"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  IconPlus, IconChartBar,
  IconUser,
  IconArrowUpRight,
  IconArrowDownLeft,
  IconSettings
} from "@tabler/icons-react"

export function FinanceLanding() {
  const [balance, setBalance] = React.useState<number>(12450.75)
  const [currency, setCurrency] = React.useState<"USD" | "EUR">("USD")
  const [name, setName] = React.useState<string>("")
  const [recent, setRecent] = React.useState([
    { id: 1, title: "Salary", amount: 3000, type: "credit" as const, category: "Work" },
    { id: 2, title: "Starbucks", amount: 4.5, type: "debit" as const, category: "Food" },
    { id: 3, title: "Whole Foods", amount: 76.2, type: "debit" as const, category: "Groceries" },
  ])

  const format = (value: number) =>
    value.toLocaleString("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2
    })

  const addSampleIncome = () => {
    const amount = 250
    setBalance((b) => Number((b + amount).toFixed(2)))
    setRecent((r) => [{ id: Date.now(), title: "External Transfer", amount, type: "credit", category: "Transfer" }, ...r].slice(0, 5))
  }

  const spend = (amount = 12.99, title = "Online Purchase") => {
    setBalance((b) => Number((b - amount).toFixed(2)))
    setRecent((r) => [{ id: Date.now(), title, amount, type: "debit", category: "Shopping" }, ...r].slice(0, 5))
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 space-y-6">
      {/* Header Section */}
      <header className="flex justify-between items-end mb-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Finance Pilot</h1>
          <p className="text-muted-foreground text-sm">Welcome back{name ? `, ${name}` : ""}.</p>
        </div>
        <Badge variant="outline" className="h-6 uppercase tracking-wider text-[10px]">
          v0.1 Beta
        </Badge>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main Column */}
        <div className="md:col-span-8 space-y-6">
          {/* Hero Balance Card */}
          <Card className="overflow-hidden border-none bg-primary text-primary-foreground shadow-xl">
            <CardContent className="p-6 relative">
              <div className="relative z-10">
                <p className="text-primary-foreground/70 text-sm font-medium mb-1">Total Balance</p>
                <h2 className="text-4xl font-bold tracking-tighter mb-6">
                  {format(balance)}
                </h2>
                <div className="flex gap-3">
                  <Button onClick={addSampleIncome} variant="secondary" size="sm" className="font-medium">
                    <IconPlus className="size-4 mr-2" /> Deposit
                  </Button>
                  <Button onClick={() => spend(45.00, "Dinner")} variant="secondary" size="sm" className="bg-white/10 hover:bg-white/20 border-none text-white font-medium">
                    <IconArrowUpRight className="size-4 mr-2" /> Send
                  </Button>
                </div>
              </div>
              {/* Decorative Background Element */}
              <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            </CardContent>
          </Card>

          {/* Transactions List */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Recent Transactions</h3>
              <Button variant="link" size="sm" className="text-muted-foreground">View all</Button>
            </div>

            <div className="space-y-3">
              {recent.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 bg-card border rounded-xl hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${tx.type === 'credit' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
                      {tx.type === 'credit' ? <IconArrowDownLeft size={20} /> : <IconArrowUpRight size={20} />}
                    </div>
                    <div>
                      <p className="font-medium text-sm leading-none mb-1">{tx.title}</p>
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">{tx.category}</p>
                    </div>
                  </div>
                  <div className={`font-mono font-semibold ${tx.type === 'credit' ? 'text-green-600' : 'text-foreground'}`}>
                    {tx.type === 'credit' ? '+' : '-'}{format(tx.amount)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar / Controls */}
        <div className="md:col-span-4 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase text-muted-foreground">User Profile</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Set name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-9 focus-visible:ring-primary"
                  />
                  <Button onClick={() => setName("")} variant="outline" size="icon" className="shrink-0 h-9 w-9">
                    <IconUser size={18} />
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase text-muted-foreground">Preferences</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    size="sm"
                    variant={currency === "USD" ? "default" : "outline"}
                    onClick={() => setCurrency("USD")}
                    className="w-full"
                  >USD</Button>
                  <Button
                    size="sm"
                    variant={currency === "EUR" ? "default" : "outline"}
                    onClick={() => setCurrency("EUR")}
                    className="w-full"
                  >EUR</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50 border-dashed">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Quick Access</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button className="w-full justify-start shadow-sm" variant="outline">
                <Link href="/dashboard">
                  <IconChartBar size={18} className="mr-2 text-primary" /> Analytics Dashboard
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => { }}>
                <IconSettings size={18} className="mr-2" /> Account Settings
              </Button>
            </CardContent>
            <CardFooter>
              <p className="text-[10px] text-muted-foreground text-center w-full">
                This is a local simulation. No data is stored.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
