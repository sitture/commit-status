import React from 'react';
import './AppIcon.css';
import Logo from '../../assets/icons/github-light.png';
const AppIcon = () => {
    return (
        <div class="app-icon-container">
            <a href="https://github.com/sitture/commit-status/">
                <img src={Logo}></img>
            </a>
        </div>
    );
};

export default AppIcon;
