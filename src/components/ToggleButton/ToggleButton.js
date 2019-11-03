import React from 'react';

const ToggleButton = props => {
  return (
    <div className={props.className}>
      <label className="switch">
        <input
          className="refreshCheckbox"
          type="checkbox"
          onChange={props.onChange}
          checked={props.checked}
        />
        <span className="slider round" />
      </label>
      <span className="slider-text">
        {props.checked ? 'Disable Auto Refresh' : 'Enable Auto Refresh'}
      </span>
    </div>
  );
};

export default ToggleButton;
