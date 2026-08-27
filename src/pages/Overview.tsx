import { OnboardingBanner } from "@/components/OnboardingBanner";
import { MetricCard } from "@/components/MetricCard";
import { Button, CalendarIcon } from "@/design-system";
import type { DateRange } from "@/lib/metrics";

const RANGE_LABELS: Record<DateRange, string> = {
  "7d": "last 7 days",
  "28d": "last 28 days",
  "90d": "last 90 days",
  "12m": "last 12 months",
};

export function Overview() {
  const range: DateRange = "28d";

  return (
    <>
      <OnboardingBanner />
      <div className="flex flex-col p-3 gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-heading-md font-bold">Overview</h1>
          <p className="text-body-md fg-secondary">
            Understand your business at a glance
          </p>
        </div>

        <section
          className="flex flex-col gap-2"
          aria-labelledby="metrics-title"
        >
          <div className="flex justify-between items-center">
            <h2 id="metrics-title" className="text-heading-sm font-bold">
              Revenue metrics
            </h2>
            <Button variant="outline" size="md" className="capitalize">
              <CalendarIcon /> {RANGE_LABELS[range]}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            <MetricCard
              title={`Revenue in the ${RANGE_LABELS[range]}`}
              metric="revenue"
              variant="secondary"
              range={range}
              className="col-span-1 md:col-span-2"
            />
            <MetricCard
              title="MRR"
              metric="mrr"
              variant="primary"
              range={range}
              className="col-span-1 md:col-span-1"
            />
            <MetricCard
              title="ARR"
              metric="arr"
              variant="primary"
              range={range}
              className="col-span-1 md:col-span-1"
            />
          </div>
        </section>
      </div>
    </>
  );
}
