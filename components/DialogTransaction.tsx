"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categoryItems, kindItems } from "@/lib/constants"
import { useState } from "react"
import { Transaction } from "@/types/transactions"
import { useTransactionStore } from "@/store/transactions"
import { useUIStore } from "@/store/ui"

type FormData = {
  name: string;
  amount: number;
  category: Transaction['category'];
  kind: Transaction['kind'];
  date: string;
}

const defaultForm: FormData = {
  name: "Iphone 15 Pro",
  amount: 1200,
  category: "buy",
  kind: "expense",
  date: new Date().toISOString().split('T')[0],
}

export function DialogTransaction() {
  const [formData, setFormData] = useState<FormData>(defaultForm)
  const activeDialog = useUIStore((state) => state.activeDialog)
  const closeDialog = useUIStore((state) => state.closeDialog)
  const addTransaction = useTransactionStore((state) => state.addTransaction)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newTransaction: Transaction = {
      ...formData,
      id: crypto.randomUUID(),
    }

    addTransaction(newTransaction)
    closeDialog()
    setFormData(defaultForm)
  }

  return (

    <Dialog
      open={activeDialog === "transaction"}
      onOpenChange={(v) => !v && closeDialog()}
    >
      <DialogContent className="sm:max-w-sm">
        <form id="transaction-form" onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add a new transaction</DialogTitle>
            <DialogDescription>
              Make changes to your transaction here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-4">
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="amount-1">Amount</Label>
              <Input
                id="amount-1"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                required
              />
            </Field>

            <Field>
              <Label htmlFor="category-1">Category</Label>
              <Select
                items={categoryItems}
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: (value ?? "other") as Transaction['category'] })
                }
              >
                <SelectTrigger id="category-1">
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categoryItems.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <Label htmlFor="kind-1">Kind</Label>
              <div className="flex flex-col space-y-2" role="group" aria-labelledby="kind-1">
                {kindItems.map((item) => (
                  <Label
                    key={item.value}
                    htmlFor={`kind-${item.value}`}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      id={`kind-${item.value}`}
                      type="checkbox"
                      className="sr-only"
                      checked={formData.kind === item.value}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          kind: e.target.checked ? (item.value as Transaction['kind']) : ("expense" as Transaction['kind']),
                        })
                      }
                    />
                    <span
                      className={`inline-flex h-4 w-4 items-center justify-center rounded border ${formData.kind === item.value ? "bg-primary text-primary-foreground border-transparent" : "bg-transparent"
                        }`}
                      aria-hidden
                    >
                      {formData.kind === item.value ? "✓" : ""}
                    </span>
                    <span>{item.label}</span>
                  </Label>
                ))}
              </div>
            </Field>

            <Field>
              <Label htmlFor="date-1">Date</Label>
              <Input
                id="date-1"
                name="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose render={<Button variant="outline" type="button">Cancel</Button>} />
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
