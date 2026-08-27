import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "../../utils";

export interface ChartDataPoint {
  label: string;
  value: number | null;
  incomplete?: boolean;
}

export interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: ChartDataPoint[];
  variant?: "primary" | "secondary";
  tickFormatter?: (value: number) => string;
}

export const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  ({ data, variant = "primary", tickFormatter, className, ...props }, ref) => {
    const gradientId = React.useId();

    const colorVar =
      variant === "secondary"
        ? "var(--brand-secondary)"
        : "var(--brand-primary)";

    const defaultFormatter = (v: number) => {
      if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
      if (v >= 1000) return `${(v / 1000).toFixed(0)}k`;
      return String(v);
    };

    const activeFormatter = tickFormatter || defaultFormatter;

    // Process a single unified dataset with distinct keys to avoid Recharts index scaling errors
    const chartData = data.map((p, index) => ({
      ...p,
      completedValue: index === data.length - 1 ? null : p.value,
      incompleteValue: index < data.length - 2 ? null : p.value,
    }));

    const hasIncompleteDay =
      data.length > 1 && data[data.length - 1].incomplete;

    return (
      <div
        ref={ref}
        className={cn("w-full h-14 relative select-none", className)}
        {...props}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colorVar} stopOpacity={0.1} />
                <stop offset="100%" stopColor={colorVar} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="label"
              hide={false}
              axisLine={false}
              tickLine={false}
              fontSize={8}
              dy={8}
              style={{ fill: "var(--text-tertiary)" }}
              interval={Math.floor(data.length / 4) + 1}
            />
            <YAxis
              hide={false}
              axisLine={false}
              tickLine={false}
              fontSize={8}
              width={32}
              tickCount={4}
              dx={-8}
              textAnchor="end"
              style={{ fill: "var(--text-tertiary)" }}
              tickFormatter={activeFormatter}
            />
            <CartesianGrid
              vertical={false}
              stroke="var(--text-secondary-subdued)"
            />
            {/* 1. Solid Area + Line (reads completedValue, stops at last index) */}
            <Area
              type="monotone"
              dataKey="completedValue"
              stroke={colorVar}
              strokeWidth={2}
              activeDot={{ stroke: colorVar }}
              fillOpacity={1}
              fill={`url(#${gradientId})`}
            />
            {/* 2. Dashed Area (reads incompleteValue, renders only on the last segment with gradient fill) */}
            {hasIncompleteDay && (
              <Area
                type="monotone"
                dataKey="incompleteValue"
                stroke={colorVar}
                strokeWidth={2}
                strokeOpacity={0.5}
                strokeLinecap="round"
                activeDot={{ stroke: colorVar }}
                strokeDasharray="2 4"
                fillOpacity={0.7}
                fill={`url(#${gradientId})`}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  },
);

Chart.displayName = "Chart";
