import { render, screen } from "@testing-library/react";
import { Card } from "./Card";
import { expect, test } from "vitest";

test("renders container with children and default surface class", () => {
  render(<Card>Card Content</Card>);
  const card = screen.getByText("Card Content");
  expect(card).toBeInTheDocument();
  expect(card.tagName).toBe("DIV");
  expect(card).toHaveClass("st-surface-secondary");
});

test("supports polymorphic container tag elements", () => {
  render(<Card as="li">List Item Card</Card>);
  const card = screen.getByText("List Item Card");
  expect(card).toBeInTheDocument();
  expect(card.tagName).toBe("LI");
});
