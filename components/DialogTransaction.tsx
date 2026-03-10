import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IconPlus } from "@tabler/icons-react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categoryItems, kindItems } from "@/lib/constants"
import { useState } from "react"
import { Transaction } from "@/types/transactions"
import { useTransactionStore } from "@/store/transactions"

type Props = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
type FormData = {
  name: string;
  amount: number;
  category: Transaction['category'];
  kind: Transaction['kind'];
  date: string;
}
export function DialogTransaction({ open, onOpenChange }: Props) {
  const [formData, setFormData] = useState<FormData>({
    name: "Iphone 11",
    amount: 10,
    category: "dining",
    kind: "expense",
    date: new Date().toISOString().split('T')[0],
  });

  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTransaction: Transaction = {
      ...formData,
      id: crypto.randomUUID(),
    };

    addTransaction(newTransaction);
    console.log("Transacción guardada:", newTransaction);

    console.log("Submit exitoso:", formData);
    if (onOpenChange) onOpenChange(false);

    // OPCIONAL
    setFormData({
      name: "",
      amount: 0,
      category: "dining",
      kind: "expense",
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form className="w-full" id="transaction-form" onSubmit={(e) => { handleSubmit(e) }}>
        <DialogTrigger render={
          <Button
            className="flex items-center justify-center gap-2 h-14 px-6 rounded-2xl shadow-lg
        bg-white hover:bg-slate-50 border-slate-200 transition-all hover:scale-105 active:scale-95"
            variant="outline"
          >
            <IconPlus size={20} />
            <span>New</span>
          </Button>
        } />
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add a new transaction</DialogTitle>
            <DialogDescription>
              Make changes to your transaction here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>

            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Iphone 11" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </Field>

            <Field>
              <Label htmlFor="amount-1">Amount</Label>
              <Input id="amount-1" name="amount" type="number" defaultValue={10} value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })} />
            </Field>

            <Field>
              <Label htmlFor="category-1">Category</Label>
              <Select items={categoryItems} defaultValue={'Choose a category'} name="category" value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: (value ?? 'other') as Transaction['category'] })}>
                <SelectTrigger id="small-form-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
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
              <Select items={kindItems} defaultValue={'Choose a kind'} name="kind" value={formData.kind} onValueChange={(value) => setFormData({ ...formData, kind: (value ?? '') as Transaction['kind'] })}>
                <SelectTrigger id="small-form-role">
                  <SelectValue placeholder="Choose a kind" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {kindItems.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <Label htmlFor="date-1">Date</Label>
              <Input id="date-1" name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
            </Field>

          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit" form="transaction-form">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
