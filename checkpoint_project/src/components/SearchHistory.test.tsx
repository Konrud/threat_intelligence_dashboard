import { render, screen, fireEvent } from "@testing-library/react";
import { SearchHistory } from "./SearchHistory";

// Mock dependencies
jest.mock("../hooks/useIntel", () => ({
  useThreatIntel: () => ({
    state: {
      searchHistory: [
        {
          ipAddress: "192.168.1.1",
          country: "US",
          riskLevel: "high",
          timestamp: new Date("2024-06-01T12:00:00Z").toISOString(),
        },
        {
          ipAddress: "10.0.0.2",
          country: "CA",
          riskLevel: "low",
          timestamp: new Date("2024-06-02T12:00:00Z").toISOString(),
        },
      ],
    },
    dispatch: jest.fn(),
  }),
}));

jest.mock("../utilities/ui_utilities", () => ({
  getRiskDotStylesClass: (riskLevel: string) => `risk-dot-${riskLevel}`,
}));

describe("SearchHistory", () => {
  it("renders nothing when searchHistory is empty", () => {
    jest.spyOn(require("../hooks/useIntel"), "useThreatIntel").mockReturnValue({
      state: { searchHistory: [] },
      dispatch: jest.fn(),
    });
    const { container } = render(<SearchHistory />);
    expect(container.firstChild).toBeNull();
  });

  it("renders search history items", () => {
    render(<SearchHistory />);
    expect(screen.getByText("Recent Searches")).toBeInTheDocument();
    expect(screen.getByText("192.168.1.1")).toBeInTheDocument();
    expect(screen.getByText("10.0.0.2")).toBeInTheDocument();
    expect(screen.getByText("US")).toBeInTheDocument();
    expect(screen.getByText("CA")).toBeInTheDocument();
  });

  it("renders risk dot with correct class", () => {
    render(<SearchHistory />);
    expect(
      screen.getAllByRole("listitem")[0].querySelector(".risk-dot-high")
    ).toBeTruthy();
    expect(
      screen.getAllByRole("listitem")[1].querySelector(".risk-dot-low")
    ).toBeTruthy();
  });

  it("renders formatted date", () => {
    render(<SearchHistory />);
    expect(
      screen.getByText(new Date("2024-06-01T12:00:00Z").toLocaleDateString())
    ).toBeInTheDocument();
    expect(
      screen.getByText(new Date("2024-06-02T12:00:00Z").toLocaleDateString())
    ).toBeInTheDocument();
  });

  it("calls dispatch when history item is clicked", () => {
    const dispatchMock = jest.fn();
    jest.spyOn(require("../hooks/useIntel"), "useThreatIntel").mockReturnValue({
      state: {
        searchHistory: [
          {
            ipAddress: "192.168.1.1",
            country: "US",
            riskLevel: "high",
            timestamp: new Date("2024-06-01T12:00:00Z").toISOString(),
          },
        ],
      },
      dispatch: dispatchMock,
    });
    render(<SearchHistory />);
    fireEvent.click(screen.getByText("192.168.1.1"));
    expect(dispatchMock).toHaveBeenCalledWith({
      type: "ADD_TO_HISTORY",
      payload: {
        ipAddress: "192.168.1.1",
        country: "US",
        riskLevel: "high",
        timestamp: new Date("2024-06-01T12:00:00Z").toISOString(),
      },
    });
  });
});
