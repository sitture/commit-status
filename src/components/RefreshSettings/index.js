import React, { useContext } from "react";
import { AuthContext } from "../../App";

const RefreshSettings = (props) => {
  const { dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <div className="refresh-settings-container">
      <button onClick={() => handleLogout()}>Logout</button>
      <div>
        <span className="slider-text">Refresh every</span>
        <input
          className="refresh-interval-input"
          value={props.refreshIntervalSeconds}
          onChange={props.onRefreshIntervalChange}
        />
        <span className="slider-text">seconds</span>
        <label className="switch">
          <input
            className="refreshCheckbox"
            type="checkbox"
            onChange={props.onRefreshToggleChange}
            checked={props.isRefreshEnabled}
          />
          <span className="slider round" />
        </label>
      </div>
    </div>
  );
};

export default RefreshSettings;
