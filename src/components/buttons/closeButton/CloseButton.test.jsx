import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CloseButton from "./CloseButton";

describe("CloseButton", () => {
  it("renders without crashing", () => {
    render(<CloseButton onClose={() => {}} />);
    const closeButton = screen.getByRole("button");
    expect(closeButton).toBeInTheDocument();
  });

  it("calls prop onClose function on user click", () => {
    const spyFunction = vi.fn(() => {});
    render(<CloseButton onClose={spyFunction} />);
    const closeButton = screen.getByRole("button");
    expect(spyFunction).toHaveBeenCalledTimes(0);
    fireEvent.click(closeButton);
    expect(spyFunction).toHaveBeenCalledTimes(1);
  });
});
