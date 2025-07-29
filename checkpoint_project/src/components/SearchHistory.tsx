import { Clock } from "lucide-react";
import { useThreatIntel } from "../hooks/useIntel";
import { getRiskDotStylesClass } from "../utilities/ui_utilities";

export const SearchHistory = () => {
  const { state, dispatch } = useThreatIntel();

  const handleHistoryClick = (historyItem: string) => {
    dispatch({ type: "ADD_TO_HISTORY", payload: historyItem });
  };

  if (state.searchHistory.length === 0) {
    return null;
  }

  return (
    <div className="card">
      <h3 className="cardHeader">
        <Clock className="cardHeaderIcon" />
        Recent Searches
      </h3>

      <ul className="historyList">
        {state.searchHistory.map((item, index) => (
          <li
            key={index}
            onClick={() => handleHistoryClick(item)}
            className="historyItem"
          >
            <div className="historyItemLeft">
              <div className={getRiskDotStylesClass(item.riskLevel)}></div>
              <span className="historyIp">{item.ipAddress}</span>
              <span className="historyCountry">{item.country}</span>
            </div>
            <span className="historyDate">
              {new Date(item.timestamp).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
