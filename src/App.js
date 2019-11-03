import React, { Component } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './App.css';
import Header from './components/Header/Header';
import ProjectList from './components/ProjectList/ProjectList';
import ToggleButton from './components/ToggleButton/ToggleButton';

export default class App extends Component {
  state = {
    refreshEnabeledGlobally: true,
  };

  handleToggleRefreshEnabeledGlobally = () => {
    this.setState(prevState => {
      return { refreshEnabeledGlobally: !prevState.refreshEnabeledGlobally };
    });
  };

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
        <ToggleButton
          className="toggleAutoRefresh"
          checked={this.state.refreshEnabeledGlobally}
          onChange={this.handleToggleRefreshEnabeledGlobally}
        />
        <Header />
        <ProjectList
          refreshEnabeledGlobally={this.state.refreshEnabeledGlobally}
        />
      </div>
    );
  }
}
