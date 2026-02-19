import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { marginCalls } from "../data/sampleData";
import { Badge } from "./ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "./ui/table";

const statusConfig = {
  critical: { label: "Critical", variant: "destructive" },
  warning: {
    label: "Warning",
    className: "border-transparent bg-yellow-500/10 text-yellow-600",
  },
  liquidation: {
    label: "Liquidation",
    className: "border-transparent bg-red-900/10 text-red-900",
  },
  cured: {
    label: "Cured",
    className: "border-transparent bg-green-500/10 text-green-700",
  },
};

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const columns = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "borrower",
    header: "Borrower",
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">
        {row.getValue("borrower")}
      </span>
    ),
  },
  {
    id: "pair",
    header: "Asset",
    accessorFn: (row) => `${row.asset}/${row.collateral}`,
  },
  {
    accessorKey: "loanAmount",
    header: ({ column }) => (
      <button
        className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Loan
        <ArrowUpDown className="h-3.5 w-3.5" />
      </button>
    ),
    cell: ({ row }) => formatCurrency(row.getValue("loanAmount")),
  },
  {
    accessorKey: "collateralValue",
    header: ({ column }) => (
      <button
        className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Collateral
        <ArrowUpDown className="h-3.5 w-3.5" />
      </button>
    ),
    cell: ({ row }) => formatCurrency(row.getValue("collateralValue")),
  },
  {
    accessorKey: "ltv",
    header: ({ column }) => (
      <button
        className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        LTV
        <ArrowUpDown className="h-3.5 w-3.5" />
      </button>
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("ltv").toFixed(1)}%</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = statusConfig[row.getValue("status")];
      return (
        <Badge variant={status.variant || "default"} className={status.className}>
          {status.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "triggeredAt",
    header: ({ column }) => (
      <button
        className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Triggered
        <ArrowUpDown className="h-3.5 w-3.5" />
      </button>
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {formatDate(row.getValue("triggeredAt"))}
      </span>
    ),
  },
  {
    accessorKey: "deadline",
    header: ({ column }) => (
      <button
        className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Deadline
        <ArrowUpDown className="h-3.5 w-3.5" />
      </button>
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {formatDate(row.getValue("deadline"))}
      </span>
    ),
  },
];

export default function DataTable() {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data: marginCalls,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

  return (
    <div className="overflow-x-auto max-w-full rounded-lg border border-border">
      <Table className="min-w-full">
        <TableHeader className="bg-secondary">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-border hover:bg-secondary">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
