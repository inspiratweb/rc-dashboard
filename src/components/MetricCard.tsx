import { Card, Chart, Skeleton } from "@/design-system";
import { cn } from "@/design-system/utils";
import { useMetric, type DateRange, type MetricType } from "@/lib/metrics";

interface MetricCardProps {
  title: string;
  metric: MetricType;
  variant: "primary" | "secondary";
  range: DateRange;
  className?: string;
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
}: {
  title: string;
  description: string | null;
}) {
  return (
    <>
      <p className="text-body-xl fg-primary font-medium">—</p>
      {/* Message layout in place of chart */}
      <div className="h-14 w-full flex flex-col ">
        <p className="text-body-md font-semibold fg-primary">{title}</p>
        {description && <p className="text-body-sm">{description}</p>}
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
  className,
}: MetricCardProps) {
  const { data, isLoading, error } = useMetric(metric, range);

  // Custom currency formatter (only computed if data is loaded)
  const formattedValue = data
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(data.summary.currentValue)
    : "";

  return (
    <Card className={cn("flex flex-col gap-1 select-none", className)}>
      <h3 className="text-body-md fg-secondary">{title}</h3>
      {isLoading ? (
        <MetricCardSkeletonContent />
      ) : error || !data ? (
        <MetricCardMessageContent
          title="Something went wrong"
          description={error}
        />
      ) : data.points.length === 0 ? (
        <MetricCardMessageContent
          title="No data available"
          description="No records found"
        />
      ) : (
        <>
          <p className="text-body-xl fg-primary font-medium">
            {formattedValue}
          </p>
          <Chart data={data.points} variant={variant} className="h-14" />
        </>
      )}
    </Card>
  );
}
