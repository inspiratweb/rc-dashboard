import { Button, Card, Chart, Skeleton } from "@/design-system";
import { cn, formatCurrency } from "@/design-system/utils";
import { useMetric, type DateRange, type MetricType } from "@/lib/metrics";
import { useMemo, useState } from "react";

interface MetricCardProps {
  title: string;
  metric: MetricType;
  variant: "primary" | "secondary" | "tertiary";
  range: DateRange;
  showComparison?: boolean;
  className?: string;
  forcedState?: "new" | "error" | "empty" | "negative" | "large";
}

// 1. Skeleton content inside fragment (2 main children for flex justify-between)
function MetricCardSkeletonContent() {
  const barHeights = ["h-[40%]", "h-[90%]", "h-[60%]", "h-[50%]", "h-[80%]"];
  return (
    <>
      <Skeleton className="h-4 w-16" />
      <div className="h-14 w-full flex items-end gap-1">
        {barHeights.map((height, index) => (
          <Skeleton key={index} className={cn("w-4", height)} />
        ))}
      </div>
    </>
  );
}

// 2. Presentational placeholder content for messages (error/empty states)
function MetricCardMessageContent({
  title,
  description,
  onRetry,
}: {
  title: string;
  description: string | null;
  onRetry?: () => void;
}) {
  return (
    <>
      <p className="text-heading-md fg-primary font-medium">—</p>
      {/* Message layout in place of chart */}
      <div className="h-14 w-full flex flex-col justify-between">
        <div className="flex flex-col">
          <p className="text-body-md font-semibold fg-primary leading-tight">
            {title}
          </p>
          {description && (
            <p className="text-body-xs fg-secondary truncate">{description}</p>
          )}
        </div>
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onRetry();
            }}
            className="self-start"
          >
            Retry
          </Button>
        )}
      </div>
    </>
  );
}

// 3. Main MetricCard orchestrator wrapping the single Card component
export function MetricCard({
  title,
  metric,
  variant,
  range,
  showComparison = true,
  className,
  forcedState,
}: MetricCardProps) {
  // Support interactive recovery from a forced error state
  const [isErrorOverridden, setIsErrorOverridden] = useState(false);

  // Fetch current period and prior period in parallel
  const current = useMetric(metric, range);
  const prior = useMetric(metric, range, true, !showComparison);

  // Check if we should override values to force states
  const isForcedError = forcedState === "error" && !isErrorOverridden;

  const isLoading =
    !isForcedError &&
    (current.isLoading || (showComparison && prior.isLoading));
  const error = isForcedError
    ? "Connection timeout. Please try again."
    : current.error || (showComparison && prior.error);
  let data = isForcedError ? null : current.data;
  let priorData = isForcedError ? null : showComparison ? prior.data : null;

  // Dynamically shift values below zero for the negative growth & values card
  if (forcedState === "negative") {
    if (data) {
      const offset = Math.round(data.summary.currentValue * 0.9);
      data = {
        ...data,
        summary: {
          ...data.summary,
          currentValue: data.summary.currentValue - offset,
        },
        points: data.points.map((p) => ({
          ...p,
          value: p.value - offset,
        })),
      };
    }
    if (priorData) {
      const offset = Math.round(priorData.summary.currentValue * 0.9);
      priorData = {
        ...priorData,
        summary: {
          ...priorData.summary,
          currentValue: priorData.summary.currentValue - offset,
        },
        points: priorData.points.map((p) => ({
          ...p,
          value: p.value - offset,
        })),
      };
    }
  }

  // Custom currency formatter (only computed if data is loaded)
  const formattedValue = useMemo(() => {
    return data ? formatCurrency(data.summary.currentValue) : "";
  }, [data]);

  // 1. Calculate percentage comparison against prior period (memoized)
  const { changePercentText, isPositive, hasComparison } = useMemo(() => {
    let changePercentText = "";
    let isPositive = true;
    let hasComparison = false;

    if (data && priorData) {
      const currentVal = data.summary.currentValue;
      // Calculate comparison value based on the forced edge case
      const priorVal =
        forcedState === "new"
          ? 0
          : forcedState === "negative"
            ? currentVal * 1.15 // Force 15% higher prior value (creates a -13.0% decline)
            : forcedState === "large"
              ? Math.max(1, Math.round(priorData.summary.currentValue / 10)) // Scaled down 10x (creates a >999% growth)
              : priorData.summary.currentValue;

      if (priorVal > 0) {
        hasComparison = true;
        const percentChange = ((currentVal - priorVal) / priorVal) * 100;
        isPositive = percentChange >= 0;

        // Handle very large percentage changes gracefully (edge case bounding)
        if (percentChange > 999) {
          changePercentText = ">999%";
        } else if (percentChange < -999) {
          changePercentText = "<-999%";
        } else {
          changePercentText = `${isPositive ? "+" : ""}${percentChange.toFixed(1)}%`;
        }
      } else if (priorVal === 0 && currentVal > 0) {
        hasComparison = true;
        isPositive = true;
        changePercentText = "New"; // Prior period had no activity
      }
    }

    return { changePercentText, isPositive, hasComparison };
  }, [data, priorData, forcedState]);

  // Memoize chart points mapping to prevent unneeded array iterations on parent renders
  const chartPriorPoints = useMemo(() => {
    if (!priorData) return undefined;
    if (forcedState === "new") {
      return priorData.points.map((p) => ({ ...p, value: 0 }));
    }
    if (forcedState === "large") {
      return priorData.points.map((p) => ({
        ...p,
        value: Math.max(1, Math.round(p.value / 10)),
      }));
    }
    return priorData.points;
  }, [priorData, forcedState]);

  return (
    <Card className={cn("flex flex-col gap-1 select-none", className)}>
      <h3 className="text-body-md fg-secondary">{title}</h3>
      {isLoading ? (
        <MetricCardSkeletonContent />
      ) : error || !data || (showComparison && !priorData) ? (
        <MetricCardMessageContent
          title="Something went wrong"
          description={error || "Required comparison data is missing"}
          onRetry={() => {
            if (isForcedError) {
              setIsErrorOverridden(true);
            }
            current.refetch();
            prior.refetch();
          }}
        />
      ) : data.points.length === 0 || forcedState === "empty" ? (
        <MetricCardMessageContent
          title="No data available"
          description="No records found"
        />
      ) : (
        <>
          <div>
            <p className="text-heading-md fg-primary font-medium">
              {formattedValue}
            </p>
            {hasComparison && (
              <div className="flex items-center gap-0.5">
                <span
                  className={cn(
                    "text-body-sm font-semibold",
                    isPositive ? "text-positive" : "text-negative",
                  )}
                >
                  {changePercentText}
                </span>
                <span className="text-body-xs fg-secondary">
                  from previous period
                </span>
              </div>
            )}
          </div>
          <Chart
            data={data.points}
            priorData={chartPriorPoints}
            variant={variant}
            metric={metric}
            className="h-14"
          />
        </>
      )}
    </Card>
  );
}
