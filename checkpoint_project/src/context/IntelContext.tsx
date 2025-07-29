import { createContext } from "react";
import {
  type ThreatIntelAction,
  type ThreatIntelState,
} from "../reducer/threatIntelReducer";

interface ThreatIntelContextType {
  state: ThreatIntelState;
  dispatch: React.Dispatch<ThreatIntelAction>;
}

const defaultState: ThreatIntelState = {
  loading: false,
  error: null,
  currentResult: null,
  searchHistory: [],
};

export const ThreatIntelContext = createContext<ThreatIntelContextType>({
  state: defaultState,
  dispatch: () => undefined,
});
