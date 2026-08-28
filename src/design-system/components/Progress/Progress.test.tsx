import { render } from "@testing-library/react";
import { Progress } from "./Progress";
import { expect, test } from "vitest";

test("renders progress bar and computes translation style correctly", () => {
  const { container } = render(<Progress value={45} className="w-10 h-1 bg-neutral" indicatorClassName="bg-primary" />);
  const root = container.firstChild;
  expect(root).toBeInTheDocument();
  expect(root).toHaveClass("relative");
  
  // Renders Radix Progress Indicator with transform inline style
  const indicator = container.querySelector(".bg-primary");
  expect(indicator).toBeInTheDocument();
  expect(indicator).toHaveStyle({ transform: "translateX(-55%)" }); // 100 - 45 = 55%
});
