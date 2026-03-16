import { Button } from "@/components/ui/button"
import {
  Dialog, DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUIStore } from "@/store/ui"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, SelectLabel } from "@/components/ui/select"
import { useBalanceStore } from "@/store/balance"
import { useState } from "react"

export default function DialogBalance() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const activeDialog = useUIStore((state) => state.activeDialog)
  const closeDialog = useUIStore((state) => state.closeDialog)
  const setCash = useBalanceStore((state) => state.setCash)
  const setBank = useBalanceStore((state) => state.setBank)
  const setPendingIncome = useBalanceStore((state) => state.setPendingIncome)

  const balanceTypes = [
    { value: "bank", label: "Bank" },
    { value: "cash", label: "Cash" },
    { value: "pending_income", label: "Pending Income" },
  ]

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const amount = parseFloat(formData.get("amount") as string)

    if (!selectedType || isNaN(amount)) return

    if (selectedType === "bank") setBank(amount)
    else if (selectedType === "cash") setCash(amount)
    else if (selectedType === "pending_income") setPendingIncome(amount)

    closeDialog()
  }

  return (
    <Dialog open={activeDialog === "balance"} onOpenChange={closeDialog}>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Set Balance</DialogTitle>
            <DialogDescription>
              Set your current balance for bank and cash accounts.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label>Type</Label>
              <Select items={balanceTypes} value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a balance type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Balance</SelectLabel>
                    {balanceTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <Label>Amount</Label>
              <Input name="amount" type="number" placeholder="Enter your cash balance" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
