import React from 'react';
import './ProjectList.css';

var axios = require('axios');

export default class ProjectList extends React.Component {
  state = {
    projects: [],
  };

  componentDidMount =() => {
    let th = this;
    let processedProjects = [];
    this.serverRequest = axios.get(this.props.source).then(function(result) {
      var status = result.data.defaultStatus;
      result.data.projects.map(function(project) {
        return processedProjects.push({ name: project, status: status });
      });
      th.setState({
        projects: processedProjects,
      });
      const params = {};
      if (process.env.REACT_APP_GITHUB_TOKEN) {
        params.headers = {
          Authorization: process.env.REACT_APP_GITHUB_TOKEN,
        };
      }
      let promiseArray = processedProjects.map(project =>
        axios.get(
          `https://api.github.com/repos/${project.name}/commits/master/status`,
          params
        )
      );
      Promise.all(promiseArray)
        .then(
          results => {
            console.log('values', results);
            processedProjects = [];
            results.map(function(project) {
              return processedProjects.push({
                name: project.data.repository.full_name,
                status: project.data.state,
              });
            });
            th.setState({
              projects: processedProjects,
            });
          },
          reason => {
            console.log('error', reason);
          }
        )
        .catch(console.log());
    });
  }

  handlePress = (name) => {
    
    let filteredArray = this.state.projects.filter((project)=>project.name!==name)
    
    this.setState({
      projects : filteredArray
    })
  }


  render = () => {
   let handlePress = this.handlePress;
    return (
      <div>
        {this.state.projectStatus}
        {this.state.projects.map(function(project, index) {
          return (
            <div key={index} className={`project ${project.status}`}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://github.com/${project.name}`}
              >
                {project.name}
              </a>{' '}
              - <span className={project.status}>{project.status}</span>
              <button  onClick={(index)=>handlePress(project.name)}>
                Remove Repo
              </button>  
            </div>
          );
        })}
      </div>
    );
  }
}
