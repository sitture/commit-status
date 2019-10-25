import React, { Component } from 'react';
import Helmet from 'react-helmet';
import './App.css';
import Header from './components/Header/Header';
import ProjectList from './components/ProjectList/ProjectList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
        <Route exact path="/">
        <div className="App">
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
          <Header />
          <ProjectList/>
        </div>
        </Route>
        <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    );
  }
}


function NoMatch() {
  let location = useLocation();

  return (
    <div className="header">
        No match for {location.pathname}
        <a className="NoMatch-go-back" href="/">Go back to HomePage</a>
    </div>
  );
}