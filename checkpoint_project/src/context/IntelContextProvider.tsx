import { useReducer, useEffect, type ReactNode } from "react";
import { threatIntelReducer } from "../reducer/threatIntelReducer";
import { ThreatIntelContext } from "./IntelContext";

export const ThreatIntelProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(threatIntelReducer, {
    loading: false,
    error: null,
    currentResult: null,
    searchHistory: [],
  });

  // Load search history from localStorage on mount
  useEffect(() => {
    const savedHistory = JSON.parse(
      localStorage.getItem("threatIntelHistory") || "[]"
    );
    dispatch({ type: "LOAD_HISTORY", payload: savedHistory });
  }, []);

  // Save to localStorage whenever history changes
  useEffect(() => {
    if (state.searchHistory.length > 0) {
      localStorage.setItem(
        "threatIntelHistory",
        JSON.stringify(state.searchHistory)
      );
    }
  }, [state.searchHistory]);

  return (
    <ThreatIntelContext.Provider value={{ state, dispatch }}>
      {children}
    </ThreatIntelContext.Provider>
  );
};
