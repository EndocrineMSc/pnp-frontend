import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CollapseButton from "./CollapseButton";

describe("CollapseButton", () => {
  it("renders without crashing", () => {
    render(
      <CollapseButton
        isExpanded={true}
        toggleCollapse={() => {}}
        isPageRight={true}
      />,
    );
    const collapseButton = screen.getByRole("button");
    expect(collapseButton).toBeInTheDocument();
  });

  it("calls prop onClose function on user click", () => {
    const spyFunction = vi.fn(() => {});
    render(
      <CollapseButton
        isExpanded={true}
        toggleCollapse={spyFunction}
        isPageRight={true}
      />,
    );
    const collapseButton = screen.getByRole("button");
    expect(spyFunction).toHaveBeenCalledTimes(0);
    fireEvent.click(collapseButton);
    expect(spyFunction).toHaveBeenCalledTimes(1);
  });
});
