import React from 'react';

import '../ProjectList/ProjectList.css';
import './Search.css';

var axios = require('axios');

export default class Search extends React.Component {
  state = {
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
console.log(`https://api.github.com/repos/${this.state.input}/commits/master/status`)
    axios.get(
      `https://api.github.com/repos/${this.state.input}/commits/master/status`,

      params
    ).then(data=>{
      let obj = {
        name : data.data.repository.full_name,
        status : data.data.state
      }
      this.props.addProject(obj)
     
    }).catch(console.log())
  this.setState({
    input:""
  })

  }
handlePress=(e)=>{
  e.preventDefault();
  this.setState({input:""})
}

  render = () => {
  
    return (
      <div className="search project">
         <form onSubmit={this.handleSubmit}>
        <input
          className="input"
          type="text"
          onChange={this.handleChange}
          value={this.state.input}
          placeholder="sitture/commit-status"
        />
        <button className="button" type="submit">
          Add
        </button>
        {
          this.state.input?<button onClick={this.handlePress}  className="button">
          X
        </button>:null
        }
      </form>
      </div>
    );
  }
}
