import * as React from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "../../utils";
import { ChartTooltip } from "./ChartTooltip";

export interface ChartDataPoint {
  label: string;
  value: number | null;
  incomplete?: boolean;
}

export interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: ChartDataPoint[];
  priorData?: ChartDataPoint[];
  variant?: "primary" | "secondary" | "tertiary";
  metric?: "revenue" | "mrr" | "arr";
  tickFormatter?: (value: number) => string;
}

const COLOR_MAP: Record<"primary" | "secondary" | "tertiary", string> = {
  primary: "var(--brand-primary)",
  secondary: "var(--brand-secondary)",
  tertiary: "var(--brand-tertiary)",
};

const defaultFormatter = (v: number) => {
  const isNeg = v < 0;
  const abs = Math.abs(v);
  let text = String(abs);
  if (abs >= 1000000) {
    text = `${(abs / 1000000).toFixed(1)}M`;
  } else if (abs >= 1000) {
    text = `${(abs / 1000).toFixed(0)}k`;
  }
  return isNeg ? `-${text}` : text;
};

export const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  (
    {
      data,
      priorData = [],
      variant = "primary",
      metric = "revenue",
      tickFormatter,
      className,
      ...props
    },
    ref,
  ) => {
    const gradientId = React.useId();

    const colorVar = COLOR_MAP[variant];

    const activeFormatter = tickFormatter || defaultFormatter;

    // Convert metric type to human readable display title inside the tooltip
    const metricLabel =
      metric === "mrr" ? "MRR" : metric === "arr" ? "ARR" : "Revenue";

    // Process a single unified dataset with distinct keys to avoid Recharts index scaling errors (memoized)
    const chartData = React.useMemo(() => {
      return data.map((p, index) => {
        const priorPoint = priorData[index];
        return {
          ...p,
          completedValue: index === data.length - 1 ? null : p.value,
          incompleteValue: index < data.length - 2 ? null : p.value,
          priorValue: priorPoint ? priorPoint.value : null,
        };
      });
    }, [data, priorData]);

    const hasIncompleteDay =
      data.length > 1 && data[data.length - 1].incomplete;

    return (
      <div
        ref={ref}
        className={cn("w-full h-14 relative select-none", className)}
        {...props}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 4, right: 4, left: 4, bottom: 4 }}
          >
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
              height={14}
              dx={2}
              padding={{ left: 8, right: 8 }}
              style={{ fill: "var(--text-tertiary)" }}
              interval={Math.floor(data.length / 4) + 1}
            />
            <YAxis
              hide={false}
              axisLine={false}
              tickLine={false}
              fontSize={8}
              width={32}
              dx={-24}
              tickCount={4}
              interval={0}
              textAnchor="start"
              style={{ fill: "var(--text-tertiary)" }}
              tickFormatter={activeFormatter}
            />
            <CartesianGrid
              vertical={false}
              stroke="var(--text-secondary-subdued)"
            />
            <Tooltip
              content={<ChartTooltip metricLabel={metricLabel} />}
              cursor={false}
            />
            {/* 1. Comparison baseline Area from prior period (rendered first = bottom layer/z-index) */}
            {priorData.length > 0 && (
              <Area
                type="monotone"
                dataKey="priorValue"
                stroke="var(--text-tertiary)"
                strokeWidth={2}
                strokeOpacity={0.9}
                dot={false}
                activeDot={false}
                fillOpacity={0}
              />
            )}
            {/* 2. Solid Area + Line (reads completedValue, stops at last index, rendered second = middle layer) */}
            <Area
              type="monotone"
              dataKey="completedValue"
              stroke={colorVar}
              strokeWidth={2}
              activeDot={{ stroke: colorVar }}
              fillOpacity={1}
              fill={`url(#${gradientId})`}
            />
            {/* 3. Dashed Area (reads incompleteValue, renders only on last segment, rendered third = top layer) */}
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
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  },
);

Chart.displayName = "Chart";
