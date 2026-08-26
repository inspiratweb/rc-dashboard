import {
  Button,
  Card,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  cn,
  Progress,
} from "@/design-system";
import { MOCK_ONBOARDING_STEPS } from "@/lib/mockData";
import * as React from "react";

export interface OnboardingStepConfig {
  id: number;
  title: string;
  description: string;
  actionText: string;
  actionUrl: string;
  isCompleted: boolean;
}

export interface OnboardingBannerProps {
  className?: string;
}

interface OnboardingStepCardProps {
  step: OnboardingStepConfig;
  onToggle: (id: number) => void;
}

function OnboardingStepCard({ step, onToggle }: OnboardingStepCardProps) {
  return (
    <Card
      surface="inverted"
      className={cn(
        "flex-none text-left flex flex-col gap-2 justify-between min-h-28 w-43 transition-all",
        step.isCompleted && "opacity-60",
      )}
    >
      <Card
        size="sm"
        surface="inverted"
        className="w-4 h-4 flex items-center justify-center text-heading-sm font-bold"
      >
        {step.id}
      </Card>
      <div>
        <h3 className="text-heading-sm font-bold">{step.title}</h3>
        <p className="text-body-lg font-normal">{step.description}</p>
      </div>

      <div className="flex items-center justify-between">
        <Button variant="filled" size="sm" surface="inverted" asChild>
          <a href={step.actionUrl || "#"}>{step.actionText}</a>
        </Button>

        <Button
          variant="ghost"
          surface="inverted"
          size="sm"
          onClick={() => onToggle(step.id)}
        >
          {step.isCompleted ? "Completed" : "Mark as done"}
        </Button>
      </div>
    </Card>
  );
}

interface CarouselArrowProps {
  direction: "left" | "right";
  visible: boolean;
  onClick: () => void;
}

function CarouselArrow({ direction, visible, onClick }: CarouselArrowProps) {
  const isLeft = direction === "left";

  return (
    <>
      <div
        className={cn(
          "absolute top-0 bottom-0 z-10 w-9 pointer-events-none transition-opacity duration-300 from-info from-70% to-transparent backdrop-blur-[1px]",
          isLeft ? "left-0 bg-gradient-to-r" : "right-0 bg-gradient-to-l",
          visible ? "opacity-100" : "opacity-0",
        )}
      />
      <Button
        onClick={onClick}
        variant="outline"
        surface="inverted"
        disabled={!visible}
        className={cn(
          "absolute z-11 top-0 bottom-0 w-6 h-full bg-info transition-all duration-300",
          isLeft ? "left-0" : "right-0",
          visible
            ? "opacity-100 pointer-events-auto translate-x-0"
            : cn(
                "opacity-0 pointer-events-none",
                isLeft ? "-translate-x-full" : "translate-x-full",
              ),
        )}
        aria-label={
          isLeft ? "Previous onboarding steps" : "Next onboarding steps"
        }
      >
        {isLeft ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </Button>
    </>
  );
}

function useCarousel(dependency?: unknown) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = React.useState(false);
  const [showRightArrow, setShowRightArrow] = React.useState(false);

  const checkScroll = React.useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 2);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 2);
    }
  }, []);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      checkScroll();
      el.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (el) {
        el.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll, dependency]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.7;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return { scrollRef, showLeftArrow, showRightArrow, scroll };
}

export function OnboardingBanner({ className }: OnboardingBannerProps) {
  const [steps, setSteps] = React.useState(MOCK_ONBOARDING_STEPS);
  const { scrollRef, showLeftArrow, showRightArrow, scroll } =
    useCarousel(steps);

  const completedCount = steps.filter((s) => s.isCompleted).length;
  const progressPercentage = (completedCount / steps.length) * 100;

  const handleMarkAllDone = () => {
    setSteps((prev) => prev.map((step) => ({ ...step, isCompleted: true })));
  };

  const handleToggleStep = (id: number) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id === id ? { ...step, isCompleted: !step.isCompleted } : step,
      ),
    );
  };

  return (
    <div
      className={cn(
        "w-full bg-info fg-primary-inverted p-3 flex flex-col gap-3 overflow-hidden",
        className,
      )}
    >
      {/* Header Info */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-3">
        <div className="flex flex-col text-left">
          <h2 className="text-heading-md font-bold">
            Get ready to use RevenueCat.
          </h2>
          <p className="text-body-md font-normal mt-1">
            A few more things are needed to sell in your app.
          </p>
        </div>

        {/* Progress & Quick Actions */}
        <div className="flex items-center gap-1 shrink-0">
          <Card
            size="sm"
            surface="inverted"
            className="flex flex-row gap-1 items-center"
          >
            <Progress
              value={progressPercentage}
              indicatorClassName="bg-surface-primary"
              className="w-6 h-0.5 bg-info-subdued"
            />
            <span className="font-bold">
              {completedCount} of {steps.length} completed
            </span>
          </Card>
          <Button
            variant="outline"
            size="sm"
            surface="inverted"
            onClick={handleMarkAllDone}
            disabled={completedCount === steps.length}
          >
            <CheckIcon />
            Mark all as done
          </Button>
        </div>
      </div>

      {/* Steps Slider Container */}
      <div className="relative w-full group">
        <CarouselArrow
          direction="left"
          visible={showLeftArrow}
          onClick={() => scroll("left")}
        />

        {/* Scrollable list */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth"
        >
          {steps.map((step) => (
            <OnboardingStepCard
              key={step.id}
              step={step}
              onToggle={handleToggleStep}
            />
          ))}
        </div>

        <CarouselArrow
          direction="right"
          visible={showRightArrow}
          onClick={() => scroll("right")}
        />
      </div>
    </div>
  );
}
