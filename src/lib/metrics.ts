import { useEffect, useState } from "react";
import revenueData from "./revenue.json";

export type DateRange = "7d" | "28d" | "90d" | "12m";
export type MetricType = "revenue" | "mrr" | "arr";

export interface MetricPoint {
  label: string;
  value: number;
  incomplete?: boolean;
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

// Simulation database using revenue.json as the baseline
const getMockData = (metric: MetricType, range: DateRange): MetricResponse => {
  // Multiply daily values so the latest complete point aligns exactly with target totals:
  // Revenue (sum of 28 completed days): $247,357 (Baseline values sum to this)
  // MRR (latest completed day): $307,504 (Baseline final complete value is 7,600 -> factor ~40.46105)
  // ARR (latest completed day): $3,690,083 (Baseline final complete value is 7,600 -> factor ~485.5372)
  const scaleFactor =
    metric === "mrr" ? 40.461052 : metric === "arr" ? 485.537236 : 1.0;

  let rawValues = revenueData.values;
  if (range === "7d") {
    rawValues = rawValues.slice(-7);
  } else if (range === "90d") {
    rawValues = [...rawValues, ...rawValues, ...rawValues].slice(0, 90);
  }

  const points = rawValues.map((v) => ({
    label: formatTimestamp(v.cohort),
    value: Math.round(v.value * scaleFactor),
    incomplete: v.incomplete,
  }));

  // The last point in our dataset represents an incomplete today, so we look at the last completed day (second to last)
  const completePoints = points.slice(0, -1);
  const latestCompletedPoint = completePoints[completePoints.length - 1];

  // Revenue is cumulative (sum of all completed days), MRR and ARR are point-in-time snapshots (latest completed day)
  const currentValue =
    metric === "revenue"
      ? completePoints.reduce((acc, curr) => acc + curr.value, 0)
      : latestCompletedPoint.value;

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
): Promise<MetricResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Occasional random connection error to test error boundaries (e.g. 20% rate)
      if (Math.random() < 0.2) {
        reject(new Error("Connection timeout. Please try again."));
      } else {
        resolve(getMockData(metric, range));
      }
    }, 1000);
  });
}

// React custom hook useMetric (similar to SWR/React Query)
export function useMetric(metric: MetricType, range: DateRange) {
  const [data, setData] = useState<MetricResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    Promise.resolve().then(() => {
      if (active) {
        setIsLoading(true);
        setError(null);
      }
    });

    getMetric(metric, range)
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
  }, [metric, range]);

  return { data, isLoading, error };
}
