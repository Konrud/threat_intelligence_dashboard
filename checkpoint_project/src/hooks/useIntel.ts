import { useContext } from "react";
import { ThreatIntelContext } from "../context/IntelContext";

export const useThreatIntel = () => {
  const context = useContext(ThreatIntelContext);
  if (!context) {
    throw new Error('useThreatIntel must be used within ThreatIntelProvider');
  }
  return context;
};