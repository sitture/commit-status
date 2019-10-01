import React from 'react';
import './ProjectList.css';

var axios = require('axios');

export default class ProjectList extends React.Component {
  state = {
    projects: [],
  };

  componentDidMount() {
    var th = this;
    var processedProjects = [];
    this.serverRequest = axios.get(this.props.source).then(function(result) {
      var status = result.data.defaultStatus;
      result.data.projects.map(function(project) {
        return processedProjects.push({ name: project, status: status });
      });
      th.setState({
        projects: processedProjects.sort((a, b) => {
          if (a.name < b.name) 
            return -1
          else if (a.name > b.name)
            return 1
          return a.status > b.status ? -1 : 1
        }),
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

  handleProjectClick(index){
    this.setState({
      projects: this.state.projects.map(async (project, pIndex) => {
        if (pIndex !== index){
          project.isOpen = false
          return project
        }
        if (pIndex === index && project.isOpen){
          project.isOpen = false
          return project
        }
        project.subStatus = project.subStatus 
          ? project.subStatus 
          : await axios.get(`https://api.github.com/repos/${project.name}/commits/master/status`)
        project.isOpen = true
        return project
      })
    })
  }

  render() {
    return (
      <div>
        {this.state.projectStatus}
        {this.state.projects.map(function(project, index) {
          return (
            <div key={index} className={`project ${project.status}`}>
              <button onClick={() => this.handleProjectClick(index)}>More</button>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://github.com/${project.name}`}
              >
                {project.name}
              </a>{' '}
              - <span className={project.status}>{project.status}</span>
              {
                project.isOpen && (
                  <div>
                    { project.subStatus }
                  </div>
                )
              }
            </div>
          );
        })}
      </div>
    );
  }
}
