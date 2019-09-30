import React from 'react';
import ListSearch from './ListSearch';
import './Search.css';

var axios = require('axios');

export default class Search extends React.Component {
  state = {
    project: null,
    input:""
  };

  handleChange = (e) => {
    this.setState({input:e.target.value})
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    const params = {};
    if (process.env.REACT_APP_GITHUB_TOKEN) {
      params.headers = {
        Authorization: process.env.REACT_APP_GITHUB_TOKEN,
      };
    }

    axios.get(
      `https://api.github.com/repos/sitture/${this.state.input}/commits/master/status`,
      params
    ).then(data=>{
     
        this.setState({project:data.data,input:""})
    }).catch(console.log())
  

  }


  render = () => {
  
    return (
      <div className="search">
         <form onSubmit={this.handleSubmit}>
        <input
          className="input"
          type="text"
          onChange={this.handleChange}
          value={this.state.input}
          placeholder="Search for a repo..."
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
      {this.state.project?<ListSearch project={this.state.project}/>:null}
      </div>
    );
  }
}
