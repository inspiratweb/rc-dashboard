import { OnboardingBanner } from "@/components/OnboardingBanner";
import { Button, CalendarIcon, Card } from "@/design-system";

export function Overview() {
  return (
    <>
      <OnboardingBanner />
      <div className="flex flex-col m-3 gap-3">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Card className="flex flex-col gap-1">
              <h3 className="text-body-md fg-secondary">Revenue in the ***</h3>
              <p className="text-body-xl fg-primary font-medium">$247,357</p>
              <div className="">[Revenue Chart Placeholder]</div>
            </Card>
            <Card />
            <Card />
          </div>
        </section>
      </div>
    </>
  );
}
