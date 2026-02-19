import React from "react";
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
  warning: { label: "Warning", className: "border-transparent bg-yellow-500/10 text-yellow-600" },
  liquidation: { label: "Liquidation", className: "border-transparent bg-red-900/10 text-red-900" },
  cured: { label: "Cured", className: "border-transparent bg-green-500/10 text-green-700" },
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

export default function DataTable() {
  return (
    <div className="rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Borrower</TableHead>
            <TableHead>Asset</TableHead>
            <TableHead className="text-right">Loan</TableHead>
            <TableHead className="text-right">Collateral</TableHead>
            <TableHead className="text-right">LTV</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Triggered</TableHead>
            <TableHead>Deadline</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {marginCalls.map((row) => {
            const status = statusConfig[row.status];
            return (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.id}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {row.borrower}
                </TableCell>
                <TableCell>
                  {row.asset}/{row.collateral}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(row.loanAmount)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(row.collateralValue)}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {row.ltv.toFixed(1)}%
                </TableCell>
                <TableCell>
                  <Badge
                    variant={status.variant || "default"}
                    className={status.className}
                  >
                    {status.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(row.triggeredAt)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(row.deadline)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
