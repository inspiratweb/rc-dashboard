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
  value: number;
}

export interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: ChartDataPoint[];
  variant?: "primary" | "secondary";
  tickFormatter?: (value: number) => string;
}

export const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  ({ data, variant = "primary", tickFormatter, className, ...props }, ref) => {
    // Generate unique ID for the SVG gradient fill to avoid collision
    const gradientId = React.useId();

    // Map variant to corresponding CSS variables
    const colorVar =
      variant === "secondary"
        ? "var(--brand-secondary)"
        : "var(--brand-primary)";

    // Default formatting function if none is provided
    const defaultFormatter = (v: number) => {
      if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
      if (v >= 1000) return `${(v / 1000).toFixed(0)}k`;
      return String(v);
    };

    const activeFormatter = tickFormatter || defaultFormatter;

    return (
      <div ref={ref} className={cn("w-full h-14", className)} {...props}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
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
            <Area
              type="monotone"
              dataKey="value"
              stroke={colorVar}
              strokeWidth={2}
              activeDot={{ stroke: colorVar }}
              fillOpacity={1}
              fill={`url(#${gradientId})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  },
);

Chart.displayName = "Chart";
