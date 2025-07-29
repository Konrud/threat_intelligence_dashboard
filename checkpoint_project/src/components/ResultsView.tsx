import {
  Loader2,
  XCircle,
  Search,
  Globe,
  Server,
  AlertTriangle,
  Clock,
  Eye,
  Shield,
} from "lucide-react";
import { useThreatIntel } from "../hooks/useIntel";
import { getRiskIcon, getRiskStylesClass } from "../utilities/ui_utilities";
import { INFO_CARD_VALUE_TYPE } from "../types/infoCardValueType";
import { InfoCard } from "./InfoCard";

export const ResultsView = () => {
  const { state } = useThreatIntel();

  if (state.loading) {
    return (
      <div className="card">
        <div className="centerContent">
          <Loader2 className="spin loadingIcon" />
          <p>Analyzing IP address...</p>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="card">
        <div className="errorContainer">
          <XCircle className="errorIcon" />
          <h3 className="errorTitle">Error</h3>
        </div>
        <p style={{ color: "#dc2626" }}>{state.error}</p>
      </div>
    );
  }

  if (!state.currentResult) {
    return (
      <div className="card">
        <div className="centerContent">
          <Search className="emptyIcon" />
          <p>Enter an IP address above to get threat intelligence data</p>
        </div>
      </div>
    );
  }

  const result = state.currentResult;
  const riskLevel = result.riskLevel;

  return (
    <div className="card">
      <div className="resultsHeader">
        <h3 className="resultsTitle">Threat Intelligence Report</h3>
        <div className={getRiskStylesClass(riskLevel)}>
          {getRiskIcon(riskLevel)}
          <span>{riskLevel} Risk</span>
        </div>
      </div>

      <div className="grid">
        <InfoCard
          icon={<Globe className="infoCardIcon" />}
          label="IP Address"
          value={result.ipAddress}
        />

        {result.hostname && (
          <InfoCard
            icon={<Server className="infoCardIcon" />}
            label="Hostname"
            value={result.hostname}
          />
        )}

        <InfoCard
          icon={<Server className="infoCardIcon" />}
          label="ISP"
          value={result.isp || "Unknown"}
        />

        <InfoCard
          icon={<Globe className="infoCardIcon" />}
          label="Country"
          value={result.country || "Unknown"}
        />

        <InfoCard
          icon={<AlertTriangle className="infoCardIcon" />}
          label="Abuse Score"
          value={Number.parseInt(`${result.abuseScore || 0}`) / 100}
        />

        <InfoCard
          icon={<Clock className="infoCardIcon" />}
          label="Recent Reports"
          value={result.recentReports || 0}
        />

        <InfoCard
          icon={<Eye className="infoCardIcon" />}
          label="VPN/Proxy"
          value={
            result.vpnProxy
              ? INFO_CARD_VALUE_TYPE.DETECTED
              : INFO_CARD_VALUE_TYPE.NOT_DETECTED
          }
        />

        {result.threatScore !== undefined && (
          <InfoCard
            icon={<Shield className="infoCardIcon" />}
            label="Threat Score"
            value={`${result.threatScore}/100`}
          />
        )}
      </div>

      <div className="footer">
        <p className="footerText">
          Last checked: {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  );
};
