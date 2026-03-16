"use client"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IconPlus, IconCaretDownFilled, IconTrash, IconMoneybag } from "@tabler/icons-react"
import { useUIStore } from "@/store/ui"

export function ActionButtonGroup() {
  const openDialog = useUIStore((state) => state.openDialog)

  return (
    <ButtonGroup>
      {/* Botón principal — abre dialog de transacción directamente */}
      <Button variant="outline" onClick={() => openDialog("transaction")}>
        <IconPlus size={16} /> New
      </Button>

      {/* Dropdown para las demás acciones */}
      <DropdownMenu>
        <DropdownMenuTrigger render={
          <Button variant="outline" size="icon" aria-label="More Options">
            <IconCaretDownFilled size={14} />
          </Button>
        } />
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => openDialog("balance")}>
              <IconMoneybag size={16} className="mr-2" />
              Add Balance
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive">
              <IconTrash size={16} className="mr-2" />
              Trash
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
