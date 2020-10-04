import React from 'react';

const RefreshSettings = (props) => {
  return (
    <div className="refresh-settings-container">
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
  );
};

export default RefreshSettings;
