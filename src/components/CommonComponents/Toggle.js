import React from 'react';
import './Toggle.css';
import './CommonCss.css';

export default class Toggle extends React.Component {
    render() {
        return (
            <div className={this.props.align+"-align"}>
                <span>{this.props.toggleText}</span>
                <label className="switch">
                    <input type="checkbox" onChange={this.props.action}/>
                    <span className="slider round"></span>
                </label>
            </div>
        );
    }
}
