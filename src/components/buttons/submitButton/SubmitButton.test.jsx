import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SubmitButton from "./SubmitButton";

describe("SubmitButton component", () => {
  it("renders with default text", () => {
    render(<SubmitButton onClick={() => {}} />);
    expect(screen.getByRole("button")).toHaveTextContent("Submit");
  });

  it("renders with provided text", () => {
    const buttonText = "Click Me";
    render(<SubmitButton onClick={() => {}} text={buttonText} />);
    expect(screen.getByRole("button")).toHaveTextContent(buttonText);
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<SubmitButton onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
