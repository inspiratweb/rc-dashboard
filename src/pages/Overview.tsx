import { MetricCard } from "@/components/MetricCard";
import { OnboardingBanner } from "@/components/OnboardingBanner";
import { Button, CalendarIcon, CompareIcon } from "@/design-system";
import type { DateRange } from "@/lib/metrics";
import { useState } from "react";

const RANGE_LABELS: Record<DateRange, string> = {
  "7d": "7 days",
  "28d": "28 days",
  "90d": "90 days",
  "12m": "12 months",
};

export function Overview() {
  const range: DateRange = "28d";
  const [showComparison, setShowComparison] = useState(false);

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
            <div className="flex items-center gap-1">
              <Button variant="outline" size="md">
                <CalendarIcon /> Last {RANGE_LABELS[range]}
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => setShowComparison(!showComparison)}
              >
                <CompareIcon />
                Compare
                {showComparison && (
                  <span className="fg-primary">
                    Previous {RANGE_LABELS[range]}
                  </span>
                )}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            <MetricCard
              title={`Revenue in the last ${RANGE_LABELS[range]}`}
              metric="revenue"
              variant="secondary"
              range={range}
              showComparison={showComparison}
              className="col-span-1 md:col-span-2"
            />
            <MetricCard
              title="MRR"
              metric="mrr"
              variant="primary"
              range={range}
              showComparison={showComparison}
              className="col-span-1 md:col-span-1"
            />
            <MetricCard
              title="ARR"
              metric="arr"
              variant="tertiary"
              range={range}
              showComparison={showComparison}
              className="col-span-1 md:col-span-1"
            />
            {/* Row 2: Showcasing the Edge Cases */}
            <MetricCard
              title="Error state"
              metric="mrr"
              variant="primary"
              range={range}
              showComparison={showComparison}
              forcedState="error"
              className="col-span-1 md:col-span-1"
            />
            <MetricCard
              title="Empty state"
              metric="arr"
              variant="primary"
              range={range}
              showComparison={showComparison}
              forcedState="empty"
              className="col-span-1 md:col-span-1"
            />
            <MetricCard
              title="No prior period / New state"
              metric="revenue"
              variant="secondary"
              range={range}
              showComparison={showComparison}
              forcedState="new"
              className="col-span-1 md:col-span-2"
            />
            {/* Row 3: Showcasing Growth Variation Extremes */}
            <MetricCard
              title="Negative change & values (comparison needed)"
              metric="mrr"
              variant="primary"
              range={range}
              showComparison={showComparison}
              forcedState="negative"
              className="col-span-1 md:col-span-2"
            />
            <MetricCard
              title="Very large change (comparison needed)"
              metric="arr"
              variant="primary"
              range={range}
              showComparison={showComparison}
              forcedState="large"
              className="col-span-1 md:col-span-2"
            />
          </div>
        </section>
      </div>
    </>
  );
}
