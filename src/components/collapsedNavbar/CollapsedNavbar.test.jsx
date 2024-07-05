import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import CollapsedNavbar from "./CollapsedNavbar";
import { NavbarContext } from "../../utility/contexts";
import CollapseButton from "../buttons/collapseButton/CollapseButton";

vi.mock("../buttons/collapseButton/CollapseButton", () => {
  return {
    __esModule: true,
    default: vi.fn(() => <button>Mocked CollapseButton</button>),
  };
});

describe("CollapsedNavbar component", () => {
  const providerValues = {
    toggleNavbar: vi.fn(),
    isExpanded: false,
  };

  it("renders the CollapseButton with the correct props", () => {
    render(
      <NavbarContext.Provider value={providerValues}>
        <CollapsedNavbar />
      </NavbarContext.Provider>,
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(CollapseButton).toHaveBeenCalledWith(
      {
        toggleCollapse: providerValues.toggleNavbar,
        isExpanded: providerValues.isExpanded,
        isPageRight: false,
      },
      {},
    );
  });
});
