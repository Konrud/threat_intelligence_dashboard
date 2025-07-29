import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { InfoCard } from "./InfoCard";

describe("InfoCard", () => {
  const icon = <span data-testid="icon">Icon</span>;
  const label = "Test Label";
  const value = "Test Value";

  it("renders icon, label, and value", () => {
    render(<InfoCard icon={icon} label={label} value={value} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(value)).toBeInTheDocument();
  });

  it("renders with correct class for value", () => {
    render(<InfoCard icon={icon} label={label} value={value} />);
    // The class depends on INFO_CARD_VALUE_TYPE.DETECTED, which is always truthy in the current code
    expect(
      screen.getByText(value).classList.contains("infoCardValueGreen")
    ).toBe(true);
  });
});
