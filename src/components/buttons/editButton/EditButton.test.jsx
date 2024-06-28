import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import EditButton from "./EditButton";

vi.mock("../../modals/entryFormWrapper/EntryFormWrapper", () => {
  return {
    default: () => <div role="form">Mocked FormWrapper</div>,
  };
});

describe("EditButton", () => {
  it("renders without crashing", () => {
    render(<EditButton updateParent={() => {}} />);
    const editButton = screen.getByRole("button");
    expect(editButton).toBeInTheDocument();
  });

  it("does not render FormWrapper on initial render", () => {
    render(<EditButton updateParent={() => {}} />);
    const formWrapper = screen.queryByRole("form");
    expect(formWrapper).toBe(null);
  });

  it("renders FormWrapper on button click", () => {
    render(<EditButton updateParent={() => {}} />);
    const editButton = screen.getByRole("button");
    fireEvent.click(editButton);

    const formWrapper = screen.queryByRole("form");
    expect(formWrapper).toBeInTheDocument();
  });
});
