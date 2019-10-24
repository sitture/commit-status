import React from 'react';

import '../ProjectList/ProjectList.css';
import './Search.css';

var axios = require('axios');
var errorMessages = {
  unauthorized_entry : "You do not have access",
  not_found : "The repo that you are looking is invalid",
  default_error : "Problem with Commit Status. Please try again later"
};

export default class Search extends React.Component {
  state = {
    input:""
  };

  handleChange = (e) => {
    this.setState({input:e.target.value})
  }

  alertUser = (message) => { 
    const errorElement = document.createElement('div'),
          closeBtn = document.createElement('span'),
          errorMessage = document.createTextNode(message);
    errorElement.classList.add('error-message');
    errorElement.appendChild(errorMessage);
    closeBtn.classList.add('close');
    closeBtn.innerText = 'X';
    closeBtn.addEventListener('click', this.handleClose);
    errorElement.appendChild(closeBtn);
    document.querySelector('.search')
            .appendChild(errorElement).focus();
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
     
    }).catch(er => {
      if(er.response.status === 403) {
        return this.alertUser(errorMessages['unauthorized_entry']);
      }
      else if(er.response.status === 404) {
        return this.alertUser(errorMessages['not_found']);
      }
      return this.alertUser(errorMessages['default_error'])
    })
  this.setState({
    input:""
  })

  }
handlePress=(e)=>{
  e.preventDefault();
  this.setState({input:""})
}

handleClose=(e)=>{
  e.preventDefault();
  document.querySelector('.search')
          .removeChild(e.target.parentElement);
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
          placeholder="Add a repo..."
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
