import { expect, test } from "vitest";
import { getMetric } from "./metrics";

test("getMetric returns proper data structure for current period", async () => {
  const result = await getMetric("revenue", "7d", false);
  expect(result.metric).toBe("revenue");
  expect(result.range).toBe("7d");
  expect(result.points).toHaveLength(7);
  expect(result.summary.currentValue).toBeGreaterThan(0);
});

test("getMetric returns MRR correctly scaled", async () => {
  const result = await getMetric("mrr", "28d", false);
  expect(result.metric).toBe("mrr");
  // Check the summary value is around the loaded average
  expect(result.summary.currentValue).toBeGreaterThan(10000);
});
