import { Shield, AlertTriangle, XCircle, CheckCircle } from "lucide-react";
import { THREAT_LEVELS } from "../types/threatLevelsType";

export const getRiskStylesClass = (level: string) => {
  switch (level) {
    case THREAT_LEVELS.LOW:
      return "riskLow";
    case THREAT_LEVELS.MEDIUM:
      return "riskMedium";
    case THREAT_LEVELS.HIGH:
      return "riskHigh";
    default:
      return undefined;
  }
};

export const getRiskIcon = (level: string) => {
  const baseInlineStyle = { width: "16px", height: "16px" };
  switch (level) {
    case THREAT_LEVELS.LOW:
      return <CheckCircle style={baseInlineStyle} />;
    case THREAT_LEVELS.MEDIUM:
      return <AlertTriangle style={baseInlineStyle} />;
    case THREAT_LEVELS.HIGH:
      return <XCircle style={baseInlineStyle} />;
    default:
      return <Shield style={baseInlineStyle} />;
  }
};

export const getRiskDotStylesClass = (level: string) => {
  switch (level.toLowerCase()) {
    case THREAT_LEVELS.LOW:
      return "historyRiskDotLow";
    case THREAT_LEVELS.MEDIUM:
      return "historyRiskDotMedium";
    case THREAT_LEVELS.HIGH:
      return "historyRiskDotHigh";
    default:
      return undefined;
  }
};
