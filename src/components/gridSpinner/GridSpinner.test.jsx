import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import GridSpinner from "./GridSpinner";

describe("GridSpinner", () => {
  it("renders without crashing", () => {
    const { container } = render(<GridSpinner />);
    expect(container).toBeTruthy();
  });

  it("renders the Grid component", () => {
    const { getByLabelText } = render(<GridSpinner />);
    const gridElement = getByLabelText("grid-loading");
    expect(gridElement).toBeTruthy();
  });

  it("Grid component has the correct wrapper class", () => {
    const { getByLabelText } = render(<GridSpinner />);
    const gridElement = getByLabelText("grid-loading");
    expect(gridElement).toHaveClass("grid-wrapper");
  });
});
