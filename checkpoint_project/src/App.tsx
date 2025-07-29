import { useState, FC } from "react";
import "./App.css";
import "./index.css";
import "./styles.css";
import { ThreatIntelProvider } from "./context/IntelContextProvider";
import { IPInput } from "./components/IPInput";
import { ResultsView } from "./components/ResultsView";
import { SearchHistory } from "./components/SearchHistory";

const App = () => {
  return (
    <ThreatIntelProvider>
      <div className="app">
        <div className="container">
          <div className="header">
            <h1 className="title">Threat Intelligence Dashboard</h1>
            <p className="subtitle">
              Analyze IP addresses for potential security threats and reputation
              data
            </p>
          </div>

          <div className="contentSpace">
            <IPInput />
            <ResultsView />
            <SearchHistory />
          </div>
        </div>
      </div>
    </ThreatIntelProvider>
  );
};

export default App;
