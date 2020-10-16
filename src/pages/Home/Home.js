import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import Header from "../../components/Header/Header";
import ProjectList from "../../components/ProjectList/ProjectList";
import RefreshSettings from "../../components/RefreshSettings";

import { AuthContext } from "../../App";
import "../../App.css";

export default function Home() {
  const { state } = useContext(AuthContext);

  const [isRefreshEnabled, setIsRefreshEnabled] = useState(false);
  const [refreshIntervalSeconds, setRefreshIntervalSeconds] = useState(30);

  if (!state.isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <RefreshSettings
        isRefreshEnabled={isRefreshEnabled}
        refreshIntervalSeconds={refreshIntervalSeconds}
        onRefreshIntervalChange={(event) =>
          setRefreshIntervalSeconds(event.target.value)
        }
        onRefreshToggleChange={() => setIsRefreshEnabled(!isRefreshEnabled)}
      />
      <Header />
      <ProjectList
        isRefreshEnabled={isRefreshEnabled}
        refreshIntervalMillis={() => refreshIntervalSeconds * 1000}
      />
    </div>
  );
}
