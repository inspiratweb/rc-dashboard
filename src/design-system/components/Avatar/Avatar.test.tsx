import { render, screen, fireEvent } from "@testing-library/react";
import { Avatar } from "./Avatar";
import { expect, test } from "vitest";

test("renders initials when src is not provided", () => {
  render(<Avatar fallback="Fran Sanchez" />);
  expect(screen.getByText("FS")).toBeInTheDocument();
});

test("renders image when src is provided", () => {
  render(<Avatar src="avatar.png" fallback="Fran Sanchez" alt="User Avatar" />);
  const img = screen.getByRole("img");
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute("src", "avatar.png");
  expect(img).toHaveAttribute("alt", "User Avatar");
});

test("falls back to initials on image loading error", () => {
  render(<Avatar src="broken.png" fallback="Fran Sanchez" />);
  const img = screen.getByRole("img");
  expect(img).toBeInTheDocument();
  
  // Simulate image loading error
  fireEvent.error(img);
  
  expect(img).not.toBeInTheDocument();
  expect(screen.getByText("FS")).toBeInTheDocument();
});
