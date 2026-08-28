import { render, screen } from "@testing-library/react";
import { Button } from "./Button";
import { expect, test } from "vitest";

test("renders standard button with correct text and outline classes", () => {
  render(<Button variant="outline">Test Button</Button>);
  const button = screen.getByRole("button", { name: /test button/i });
  expect(button).toBeInTheDocument();
  expect(button).toHaveClass("st-surface-secondary");
  expect(button).toHaveClass("fg-secondary");
});

test("supports polymorphic slots using asChild", () => {
  render(
    <Button variant="filled" asChild>
      <a href="https://revenuecat.com">Link Button</a>
    </Button>
  );
  const link = screen.getByRole("link", { name: /link button/i });
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", "https://revenuecat.com");
  expect(link).toHaveClass("bg-surface-secondary");
});

test("correctly appends and merges custom classNames", () => {
  render(
    <Button variant="outline" className="custom-class-override shadow-lg">
      Custom Styled Button
    </Button>
  );
  const button = screen.getByRole("button", { name: /custom styled button/i });
  expect(button).toBeInTheDocument();
  expect(button).toHaveClass("custom-class-override");
  expect(button).toHaveClass("shadow-lg");
  expect(button).toHaveClass("st-surface-secondary"); // Still keeps design system base classes
});

test("applies size and disabled attributes correctly", () => {
  render(
    <Button variant="ghost" size="sm" disabled>
      Small Disabled Button
    </Button>
  );
  const button = screen.getByRole("button", { name: /small disabled button/i });
  expect(button).toBeInTheDocument();
  expect(button).toBeDisabled();
  expect(button).toHaveClass("text-body-sm"); // Verified from size="sm" mapping
});
