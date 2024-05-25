import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import AddButton from "./AddButton";
import * as useCampaignId from "../../hooks/useCampaignId";
import * as addNote from "../../utilityFunctions/addNote";

vi.mock("../modals/EntryFormWrapper", (props) => {
  return {
    default: () => <div role="form">Mocked FormWrapper</div>,
  };
});

vi.mock("../../hooks/useCampaignId", () => {
  return {
    default: () => ["mockedCampaignId", () => {}],
  };
});

vi.mock("../../utilityFunctions/addNote", (props) => {
  return {
    default: () => {},
  };
});

describe("AddButton", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders without crashing", () => {
    render(<AddButton type="" />);
    const addButton = screen.getByRole("button");
    expect(addButton).toBeInTheDocument();
  });

  it("does not render FormWrapper on initial render", () => {
    render(<AddButton type="" updateParent={() => {}} />);
    const formWrapper = screen.queryByRole("form");
    expect(formWrapper).toBe(null);
  });

  it("renders the FormWrapper component on click if campaign id exists", () => {
    render(<AddButton type="" updateParent={() => {}} />);
    const addButton = screen.getByRole("button");
    fireEvent.click(addButton);

    const formWrapper = screen.getByRole("form");
    expect(formWrapper).toBeInTheDocument();
  });

  it("does not render FormWrapper on click if no campaign id exists and type isn't campaign", () => {
    vi.spyOn(useCampaignId, "default").mockImplementation(() => ["", () => {}]);
    render(<AddButton type="" updateParent={() => {}} />);
    const addButton = screen.getByRole("button");
    fireEvent.click(addButton);

    const formWrapper = screen.queryByRole("form");
    expect(formWrapper).toBe(null);
  });

  it("does render FormWrapper on click if no campaign id exists and type is campaign", () => {
    vi.spyOn(useCampaignId, "default").mockImplementation(() => ["", () => {}]);
    render(<AddButton type="campaign" updateParent={() => {}} />);
    const addButton = screen.getByRole("button");
    fireEvent.click(addButton);

    const formWrapper = screen.queryByRole("form");
    expect(formWrapper).toBeInTheDocument();
  });

  it("creates a new note if type is note", () => {
    const noteSpy = vi.spyOn(addNote, "default");
    render(<AddButton type="note" updateParent={() => {}} />);
    const addButton = screen.getByRole("button");
    expect(noteSpy).toHaveBeenCalledTimes(0);
    fireEvent.click(addButton);
    expect(noteSpy).toHaveBeenCalledTimes(1);
  });

  it("does not create a new note if type is not note", () => {
    const noteSpy = vi.spyOn(addNote, "default");
    render(<AddButton type="" updateParent={() => {}} />);
    const addButton = screen.getByRole("button");
    expect(noteSpy).toHaveBeenCalledTimes(0);
    fireEvent.click(addButton);
    expect(noteSpy).toHaveBeenCalledTimes(0);
  });
});
