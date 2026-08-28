import { useEffect, useState, useCallback } from "react";
import revenueData from "./revenue.json";
import revenueComparisonData from "./revenue-comparison.json";

export type DateRange = "7d" | "28d" | "90d" | "12m";
export type MetricType = "revenue" | "mrr" | "arr";

export interface MetricPoint {
  label: string;
  value: number;
  incomplete?: boolean;
  cohort: number;
}

export interface MetricResponse {
  metric: MetricType;
  range: DateRange;
  points: MetricPoint[];
  summary: {
    currentValue: number;
  };
}

// Helper to format timestamps to readable date labels (e.g. Aug 1)
const formatTimestamp = (cohort: number): string => {
  const date = new Date(cohort * 1000);
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = date.getDate();
  return `${month} ${day}`;
};

// Simulation database using revenue.json and revenue-comparison.json as the baselines
const getMockData = (
  metric: MetricType,
  range: DateRange,
  isPrior?: boolean
): MetricResponse => {
  // Scale factors to match target mockup totals for current period
  const scaleFactor =
    metric === "mrr" ? 40.461052 : metric === "arr" ? 485.537236 : 1.0;

  // Dynamically select database file based on the comparison period request
  const sourceData = isPrior ? revenueComparisonData : revenueData;

  let rawValues = sourceData.values;
  if (range === "7d") {
    rawValues = rawValues.slice(-7);
  } else if (range === "90d") {
    rawValues = [...rawValues, ...rawValues, ...rawValues].slice(0, 90);
  }

  const points = rawValues.map((v, idx) => {
    let baseValue = v.value;

    // Shift daily historical values circularly to create unique trend wave shapes for MRR and ARR,
    // while keeping the final points untouched so card summary numbers remain exactly correct.
    if (idx < rawValues.length - 2) {
      const historyLength = rawValues.length - 2;
      if (metric === "mrr") {
        const shiftedIdx = (idx + 5) % historyLength;
        baseValue = rawValues[shiftedIdx].value;
      } else if (metric === "arr") {
        const shiftedIdx = (idx + 11) % historyLength;
        baseValue = rawValues[shiftedIdx].value;
      }
    }

    return {
      label: formatTimestamp(v.cohort),
      value: Math.round(baseValue * scaleFactor),
      incomplete: v.incomplete,
      cohort: v.cohort,
    };
  });

  // The last point in our dataset represents today (incomplete), so we look at the last completed day (second to last)
  const completePoints = points.slice(0, -1);
  const latestCompletedPoint = completePoints[completePoints.length - 1];

  let currentValue = metric === "revenue"
    ? completePoints.reduce((acc, curr) => acc + curr.value, 0)
    : latestCompletedPoint.value;

  // Introduce small metric-specific variance in prior summary totals to differentiate growth percentages
  if (isPrior) {
    if (metric === "mrr") {
      currentValue = Math.round(currentValue * 1.015); // Shift prior MRR slightly up
    } else if (metric === "arr") {
      currentValue = Math.round(currentValue * 0.98);  // Shift prior ARR slightly down
    }
  }

  return {
    metric,
    range,
    points,
    summary: {
      currentValue,
    },
  };
};

// Simulate API fetch delay
export async function getMetric(
  metric: MetricType,
  range: DateRange,
  isPrior?: boolean,
): Promise<MetricResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getMockData(metric, range, isPrior));
    }, 1000);
  });
}

// React custom hook useMetric (similar to SWR/React Query)
export function useMetric(
  metric: MetricType,
  range: DateRange,
  isPrior?: boolean,
  skip?: boolean,
) {
  const [data, setData] = useState<MetricResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!skip);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);

  const refetch = useCallback(() => {
    setRetryCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (skip) {
      Promise.resolve().then(() => {
        setData(null);
        setIsLoading(false);
        setError(null);
      });
      return;
    }

    let active = true;

    Promise.resolve().then(() => {
      if (active) {
        setIsLoading(true);
        setError(null);
      }
    });

    getMetric(metric, range, isPrior)
      .then((res) => {
        if (active) {
          setData(res);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err.message || "Failed to load metric.");
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [metric, range, isPrior, skip, retryCount]);

  return { data, isLoading, error, refetch };
}
