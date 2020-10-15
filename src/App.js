import React, { Component } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './App.css';
import Header from './components/Header/Header';
import ProjectList from './components/ProjectList/ProjectList';
import AppIcon from './components/AppIcon/AppIcon';
import RefreshSettings from './components/RefreshSettings';

export default class App extends Component {
  state = {
    isRefreshEnabled: true,
    refreshIntervalSeconds: 30,
  };

  handleRefreshToggleChange = () => {
    this.setState(prevState => {
      return { isRefreshEnabled: !prevState.isRefreshEnabled };
    });
  };

  handleRefreshIntervalChange = (event) => {
    this.setState({refreshIntervalSeconds: event.target.value});
  };

  getRefreshIntervalInMilliSeconds = () => this.state.refreshIntervalSeconds * 1000;

  render() {
    return (
      <div className="App">
        <HelmetProvider>
          <Helmet
            htmlAttributes={{ lang: 'en', amp: undefined }}
            meta={[
              {
                name: 'description',
                content:
                  'A simple React app that shows a list of projects with their Github commit status and use it as a dashboard to view status of your CI pipelines.',
              },
            ]}
            title="CommitStatus"
          />
        </HelmetProvider>
        <AppIcon></AppIcon>
        <RefreshSettings
          isRefreshEnabled={this.state.isRefreshEnabled}
          refreshIntervalSeconds={this.state.refreshIntervalSeconds}
          onRefreshIntervalChange={this.handleRefreshIntervalChange}
          onRefreshToggleChange={this.handleRefreshToggleChange}
        />
        <Header />
        <ProjectList
          isRefreshEnabled={this.state.isRefreshEnabled}
          refreshIntervalMillis={this.getRefreshIntervalInMilliSeconds()}
        />
      </div>
    );
  }
}
