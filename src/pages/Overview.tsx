import { OnboardingBanner } from "@/components/OnboardingBanner";
import { Button, CalendarIcon, Card, Chart } from "@/design-system";
import revenueData from "../lib/revenue.json";

export function Overview() {
  // Process timestamps to human readable labels (e.g. Aug 1)
  const chartData = revenueData.values.map((v) => {
    const date = new Date(v.cohort * 1000);
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const day = date.getDate();
    return {
      label: `${month} ${day}`,
      value: v.value,
    };
  });

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
            <Button variant="outline" size="md">
              <CalendarIcon /> Last 28 days
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            <Card className="flex flex-col gap-1 col-span-1 md:col-span-2">
              <h3 className="text-body-md fg-secondary">Revenue in the ***</h3>
              <p className="text-body-xl fg-primary font-medium">$247,357</p>
              <Chart data={chartData} variant="secondary" />
            </Card>
            <Card className="flex flex-col gap-1 col-span-1 md:col-span-1">
              <h3 className="text-body-md fg-secondary">MRR</h3>
              <p className="text-body-xl fg-primary font-medium">$307,504</p>
              {/* MRR Chart goes here */}
            </Card>
            <Card className="flex flex-col gap-1 col-span-1 md:col-span-1">
              <h3 className="text-body-md fg-secondary">ARR</h3>
              <p className="text-body-xl fg-primary font-medium">$3,690,083</p>
              {/* ARR Chart goes here */}
            </Card>
          </div>
        </section>
      </div>
    </>
  );
}
