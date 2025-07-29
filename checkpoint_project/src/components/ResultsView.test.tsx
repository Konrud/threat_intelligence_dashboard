import { render, screen } from "@testing-library/react";
import { ResultsView } from "./ResultsView";
import * as useThreatIntelModule from "../hooks/useIntel";

// Mock dependencies
jest.mock("../hooks/useIntel", () => ({
  useThreatIntel: jest.fn(),
}));
jest.mock("../utilities/ui_utilities", () => ({
  getRiskIcon: jest.fn(() => <span data-testid="risk-icon" />),
  getRiskStylesClass: jest.fn(() => "risk-class"),
}));
jest.mock("./InfoCard", () => ({
  InfoCard: ({ label, value }: { label: string; value: any }) => (
    <div data-testid="info-card">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  ),
}));
jest.mock("lucide-react", () => ({
  Loader2: (props: any) => <svg {...props} data-testid="loader2" />,
  XCircle: (props: any) => <svg {...props} data-testid="xcircle" />,
  Search: (props: any) => <svg {...props} data-testid="search" />,
  Globe: (props: any) => <svg {...props} data-testid="globe" />,
  Server: (props: any) => <svg {...props} data-testid="server" />,
  AlertTriangle: (props: any) => <svg {...props} data-testid="alerttriangle" />,
  Clock: (props: any) => <svg {...props} data-testid="clock" />,
  Eye: (props: any) => <svg {...props} data-testid="eye" />,
  Shield: (props: any) => <svg {...props} data-testid="shield" />,
}));

describe("ResultsView", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    (useThreatIntelModule.useThreatIntel as jest.Mock).mockReturnValue({
      state: { loading: true },
    });
    render(<ResultsView />);
    expect(screen.getByTestId("loader2")).toBeInTheDocument();
    expect(screen.getByText(/Analyzing IP address/i)).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useThreatIntelModule.useThreatIntel as jest.Mock).mockReturnValue({
      state: { loading: false, error: "Something went wrong" },
    });
    render(<ResultsView />);
    expect(screen.getByTestId("xcircle")).toBeInTheDocument();
    expect(screen.getByText(/Error/i)).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders empty state", () => {
    (useThreatIntelModule.useThreatIntel as jest.Mock).mockReturnValue({
      state: { loading: false, error: null, currentResult: null },
    });
    render(<ResultsView />);
    expect(screen.getByTestId("search")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Enter an IP address above to get threat intelligence data/i
      )
    ).toBeInTheDocument();
  });

  it("renders results with all fields", () => {
    (useThreatIntelModule.useThreatIntel as jest.Mock).mockReturnValue({
      state: {
        loading: false,
        error: null,
        currentResult: {
          ipAddress: "1.2.3.4",
          hostname: "host.example.com",
          isp: "ExampleISP",
          country: "Wonderland",
          abuseScore: 50,
          recentReports: 2,
          vpnProxy: true,
          threatScore: 80,
          riskLevel: "High",
        },
      },
    });
    render(<ResultsView />);
    expect(screen.getByText(/Threat Intelligence Report/i)).toBeInTheDocument();
    expect(screen.getByTestId("risk-icon")).toBeInTheDocument();
    expect(screen.getByText(/High Risk/i)).toBeInTheDocument();

    // InfoCards
    expect(screen.getByText("IP Address")).toBeInTheDocument();
    expect(screen.getByText("1.2.3.4")).toBeInTheDocument();
    expect(screen.getByText("Hostname")).toBeInTheDocument();
    expect(screen.getByText("host.example.com")).toBeInTheDocument();
    expect(screen.getByText("ISP")).toBeInTheDocument();
    expect(screen.getByText("ExampleISP")).toBeInTheDocument();
    expect(screen.getByText("Country")).toBeInTheDocument();
    expect(screen.getByText("Wonderland")).toBeInTheDocument();
    expect(screen.getByText("Abuse Score")).toBeInTheDocument();
    expect(screen.getByText("0.5")).toBeInTheDocument();
    expect(screen.getByText("Recent Reports")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("VPN/Proxy")).toBeInTheDocument();
    expect(screen.getByText("DETECTED")).toBeInTheDocument();
    expect(screen.getByText("Threat Score")).toBeInTheDocument();
    expect(screen.getByText("80/100")).toBeInTheDocument();
    expect(screen.getByText(/Last checked:/i)).toBeInTheDocument();
  });

  it("renders results with missing optional fields", () => {
    (useThreatIntelModule.useThreatIntel as jest.Mock).mockReturnValue({
      state: {
        loading: false,
        error: null,
        currentResult: {
          ipAddress: "5.6.7.8",
          isp: "",
          country: "",
          abuseScore: undefined,
          recentReports: undefined,
          vpnProxy: false,
          riskLevel: "Low",
        },
      },
    });
    render(<ResultsView />);
    expect(screen.getByText("IP Address")).toBeInTheDocument();
    expect(screen.getByText("5.6.7.8")).toBeInTheDocument();
    expect(screen.queryByText("Hostname")).not.toBeInTheDocument();
    expect(screen.getByText("ISP")).toBeInTheDocument();
    expect(screen.getByText("Unknown")).toBeInTheDocument();
    expect(screen.getByText("Country")).toBeInTheDocument();
    expect(screen.getByText("Unknown")).toBeInTheDocument();
    expect(screen.getByText("Abuse Score")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("Recent Reports")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("VPN/Proxy")).toBeInTheDocument();
    expect(screen.getByText("NOT_DETECTED")).toBeInTheDocument();
    expect(screen.queryByText("Threat Score")).not.toBeInTheDocument();
  });
});
