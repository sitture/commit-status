import React, { Component } from 'react';
import Helmet from 'react-helmet';
import logo from './logo.svg';
import './App.css';
import Title from './components/Header';


export default class App extends Component {
  render() {
    return(
      <div className="App" >
        <Helmet
          htmlAttributes={{ lang: "en", amp: undefined }} // amp takes no value
          meta={[
            { name: "description", content: "A simple React app that shows a list of projects with their Github commit status and use it as a dashboard to view status of your CI pipelines." }
          ]}
          title="CommitStatus"
        />
        <div className="App-header">
          <Title />
        </div>
      </div>
    );
  }
};
