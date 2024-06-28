import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DeleteButton from "./DeleteButton";

vi.mock("../../modals/confirmationBox/ConfirmationBox", () => {
  return {
    default: () => <div>Delete?</div>,
  };
});

describe("DeleteButton", () => {
  it("renders without crashing", () => {
    render(<DeleteButton deleteEntry={() => {}} />);
    const deleteButton = screen.getByRole("button");
    expect(deleteButton).toBeInTheDocument();
  });

  it("does not render modal on initial render", () => {
    render(<DeleteButton deleteEntry={() => {}} />);
    const modal = screen.queryByText("Delete?");
    expect(modal).toBe(null);
  });

  it("renders modal on button click", () => {
    render(<DeleteButton deleteEntry={() => {}} />);
    const deleteButton = screen.getByRole("button");
    fireEvent.click(deleteButton);

    const modal = screen.getByText(/delete?/i);
    expect(modal).toBeInTheDocument();
  });
});
