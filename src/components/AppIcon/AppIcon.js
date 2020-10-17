import React from 'react';
import './AppIcon.css';
import Logo from '../../assets/icons/github-light.png';
const AppIcon = () => {
    return (
        <div class="app-icon-container">
            <a rel="noopener" href="https://github.com/sitture/commit-status/">
                <img alt="commit-status" src={Logo}></img>
            </a>
        </div>
    );
};

export default AppIcon;
