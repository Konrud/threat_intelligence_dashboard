import { Shield, Loader2, Search } from "lucide-react";
import { useState } from "react";
import { useThreatIntel } from "../hooks/useIntel";
import { validateIP } from "../utilities/utilities";
import "../styles.css";

export const IPInput = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [inputError, setInputError] = useState("");
  const { state, dispatch } = useThreatIntel();

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setInputError("");

    if (!ipAddress.trim()) {
      setInputError("Please enter an IP address");
      return;
    }

    if (!validateIP(ipAddress.trim())) {
      setInputError("Please enter a valid IP address");
      return;
    }

    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const response = await fetch(
        `http://localhost:5000/api/intel?ip=${ipAddress}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      const result = await response.json();

      const data = result;

      const enrichedData = {
        ...data,
      };

      dispatch({ type: "SET_RESULT", payload: enrichedData });
      dispatch({ type: "ADD_TO_HISTORY", payload: enrichedData });
    } catch (error) {
      const errorMessage =
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message: string }).message
          : "An unknown error occurred";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
    }
  };

  return (
    <div className="card">
      <h2 className="cardHeader">
        <Shield className="cardHeaderIcon" />
        IP Threat Intelligence Lookup
      </h2>

      <div className="inputGroup">
        <label htmlFor="ip-input">Enter IP Address</label>
        <div className="inputContainer">
          <input
            id="ip-input"
            type="text"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
            placeholder="e.g., 8.8.8.8"
            className={`${inputError ? "inputError" : null}`}
            disabled={state.loading}
          />
          <button onClick={handleSubmit} disabled={state.loading}>
            {state.loading ? (
              <Loader2 className="loader-spin" />
            ) : (
              <Search className="search" />
            )}
            <span>{state.loading ? "Checking..." : "Check"}</span>
          </button>
        </div>
        {inputError && <p className="errorText">{inputError}</p>}
      </div>
    </div>
  );
};
