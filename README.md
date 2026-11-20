# Finance

Prototipo de interfaz de finanzas personales construido con Next.js. Muestra saldos, ahorros y transacciones en una simulación local: no hay backend ni base de datos y no se almacena ningún dato (`components/Landing.tsx:209`).

## Stack

- **Next.js 16 (App Router)** — framework y enrutamiento; siete páginas del App Router más el layout raíz, sin rutas API ni parámetros dinámicos.
- **React + TypeScript estricto** — UI declarativa y tipado estático (`tsconfig.json:10`); el tipo de dominio `Transaction` vive en `types/transactions.ts`.
- **shadcn/ui (`base-nova`) + Base UI** — 17 componentes generados que envuelven primitivos de Base UI, no Radix (`components.json:3`).
- **Tailwind CSS 4** — estilos con `@theme inline`, variante `dark` personalizada y `tw-animate-css` (`app/globals.css`).
- **Zustand** — cuatro stores en memoria para balance, ahorros, transacciones y estado de UI; sin middleware de persistencia.
- **CVA + `clsx`/`tailwind-merge`** — variantes de componentes y la utilidad `cn()` (`twMerge(clsx(...))`) usada en 17 archivos (`lib/utils.ts`).
- **`@tabler/icons-react`** — iconografía en páginas y componentes.
- **`Intl`** — formato de moneda y fechas sin librerías externas (`lib/formatters.ts`).

## Cómo lo construí

### Rutas y separación servidor/cliente

Siete páginas del App Router: `/`, `/accounts`, `/settings`, `/dashboard`, `/dashboard/bank`, `/dashboard/cash` y `/dashboard/recent-transaction`, más el layout raíz con `next/font/google` (`app/layout.tsx`). Solo `/dashboard` es página cliente; la raíz renderiza el componente cliente `<FinanceLanding/>`. No hay server actions ni middleware.

### Estado

Cuatro stores de Zustand (`store/balance.ts`, `savings.ts`, `transactions.ts`, `ui.ts`) con getters derivados `total()`, `progress()` y `getRecent(limit = 4)`. `useUIStore.activeDialog` es una unión discriminada (`"transaction" | "balance" | "budget" | null`) que coordina los diálogos desde `ActionButtonGroup.tsx`. Todo reside en memoria: sin `localStorage` ni persistencia.

### Composición de UI

Los componentes de `components/ui/*` combinan el preset `base-nova` de shadcn/ui con primitivos de Base UI: variantes CVA (`badge`, `button`, `field`), composición mediante la prop `render` (`dialog`, `button-group`), `mergeProps`/`useRender` y hooks `data-slot` para el estilado. La utilidad `cn()` unifica clases condicionales.

### Gráfico sin librería

`useMonthlyExpensesChart` filtra los gastos del mes, los agrupa por categoría, calcula porcentajes con una paleta y corrige explícitamente el residuo de redondeo para que sumen 100, y emite paradas `conic-gradient`. `MonthlyExpensesChart.tsx` lo renderiza como un donut CSS. Sin librería de gráficos.

### Formularios y formato

Formularios nativos: `DialogTransaction` usa `useState` controlado con `required`; `DialogBalance` usa `FormData` y `parseFloat`. Los IDs se generan con `crypto.randomUUID()`. Sin react-hook-form ni zod. `lib/formatters.ts` aplica `Intl.NumberFormat("en-US")` para USD y fechas relativas ("Today", "Yesterday", "N days ago"); `lib/constants.ts` define `MAX_RECENT_TRANSACTIONS = 4` y las opciones de los Select.

### Accesibilidad y diseño responsive

Señales de accesibilidad: `aria-label`, `role="group"`, `htmlFor`/`Label`, checkbox `sr-only`, `aria-hidden`, variantes `focus-visible` y `suppressHydrationWarning`. El layout se adapta a distintos tamaños de pantalla mediante utilidades de Tailwind.

## Limitaciones

- Sin backend ni base de datos: es una simulación local y no se guarda ningún dato.
- Sin pruebas automatizadas: no hay script `test` ni archivos de test.
- Tema estático: los botones de `app/settings/page.tsx` son decorativos, sin alternancia claro/oscuro (no hay `next-themes`).
- Sin i18n ni librería de validación (no hay zod); los formularios usan validación nativa.
