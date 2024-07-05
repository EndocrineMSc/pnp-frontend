import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import EditButton from "./EditButton";

vi.mock("../../../utility/otherFunctions/deleteImageByUrl");
vi.mock("../../modals/entryFormWrapper/EntryFormWrapper", () => {
  return {
    default: () => <div role="form">Mocked FormWrapper</div>,
  };
});

describe("EditButton", () => {
  const type = "character";
  const data = { name: "Test Name" };
  const updateParent = vi.fn();

  it("renders without crashing", () => {
    render(<EditButton type={type} data={data} updateParent={updateParent} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("presentation")).toBeInTheDocument(); //Icon mdi role
  });

  it("does not render FormWrapper on initial render", () => {
    render(<EditButton type={type} data={data} updateParent={updateParent} />);
    expect(screen.queryByRole("form")).toBe(null);
  });

  it("renders FormWrapper on button click", () => {
    render(<EditButton type={type} data={data} updateParent={updateParent} />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.queryByRole("form")).toBeInTheDocument();
  });
});
