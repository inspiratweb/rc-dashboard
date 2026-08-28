import { render } from "@testing-library/react";
import { Skeleton } from "./Skeleton";
import { expect, test } from "vitest";

test("renders skeleton with pulse animation class", () => {
  const { container } = render(<Skeleton className="w-4 h-4" />);
  const skeleton = container.firstChild;
  expect(skeleton).toBeInTheDocument();
  expect(skeleton).toHaveClass("animate-pulse");
  expect(skeleton).toHaveClass("bg-tertiary");
  expect(skeleton).toHaveClass("w-4");
  expect(skeleton).toHaveClass("h-4");
});
