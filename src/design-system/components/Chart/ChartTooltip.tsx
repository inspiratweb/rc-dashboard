import { cn, formatCurrency } from "../../utils";

export interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number | null;
    color: string;
    stroke: string;
    dataKey: string;
    payload: {
      label: string;
    };
  }>;
  metricLabel?: string;
}

interface TooltipRowProps {
  value: React.ReactNode;
  color: string;
  prefix?: string;
  className?: string;
}

const TooltipRow = ({ value, color, prefix, className }: TooltipRowProps) => {
  if (value === null || value === undefined) return null;

  const formattedValue =
    typeof value === "number" ? formatCurrency(value) : value;

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ backgroundColor: color }}
      />
      <span className="font-bold flex gap-0.5">
        {prefix && <span className="font-normal">{prefix}</span>}
        <span className="">{formattedValue}</span>
      </span>
    </div>
  );
};

export const ChartTooltip = ({
  active,
  payload,
  metricLabel = "Revenue",
}: ChartTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const label = payload[0].payload.label;

  // Recharts passes all active series in the payload. We filter them by key.
  const currentSeries = payload.find(
    (p) => p.dataKey === "completedValue" || p.dataKey === "incompleteValue",
  );
  const priorSeries = payload.find((p) => p.dataKey === "priorValue");

  // Calculate percentage change and create custom styled element
  const currentVal = currentSeries?.value;
  const priorVal = priorSeries?.value;
  let changeElement: React.ReactNode = null;

  if (currentVal !== undefined && currentVal !== null && priorVal) {
    const change = ((currentVal - priorVal) / priorVal) * 100;
    const isPos = change >= 0;
    const changeText = `${isPos ? "+" : ""}${change.toFixed(1)}%`;
    changeElement = (
      <span className={isPos ? "text-positive" : "text-negative"}>
        {changeText}
      </span>
    );
  }

  return (
    <div className="bg-surface-primary fg-primary rounded-md p-1 shadow-lg text-body-sm flex flex-col gap-0.5 select-none pointer-events-none z-50 text-left">
      <p className="font-medium text-caption fg-secondary">{label}</p>
      <div className="flex flex-col gap-0.5">
        <TooltipRow
          value={currentSeries?.value}
          color={currentSeries?.stroke || currentSeries?.color || "transparent"}
          prefix={metricLabel}
        />
        <TooltipRow
          value={priorSeries?.value}
          color={priorSeries?.stroke || priorSeries?.color || "transparent"}
          prefix={metricLabel}
        />
        {changeElement && (
          <TooltipRow
            value={changeElement}
            color="transparent"
            prefix="% change"
          />
        )}
      </div>
    </div>
  );
};
