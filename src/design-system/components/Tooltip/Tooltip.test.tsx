import { render, screen } from "@testing-library/react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "./Tooltip";
import { expect, test } from "vitest";

test("renders tooltip trigger without crashing", () => {
  render(
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button>Hover Me</button>
        </TooltipTrigger>
        <TooltipContent>Tooltip Information</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  const trigger = screen.getByRole("button", { name: /hover me/i });
  expect(trigger).toBeInTheDocument();
  expect(trigger).toHaveAttribute("data-state", "closed");
});
