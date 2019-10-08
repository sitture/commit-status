import React from 'react';
import './ProjectList.css';
import Search from '../Search Component/Search';

import ProjectDetails from '../ProjectDetails/ProjectDetails';

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
    
      let promiseArray = processedProjects.map(project =>{
        return(
        axios.get(
          `https://api.github.com/repos/${project.name}/commits/master/status`,
          params
        )
        )
      }
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

  onRemoveClick(name) {
    return (event) => {
      event.stopPropagation();

      let filteredArray = this.state.projects.filter((project)=>project.name!==name)

      this.setState({
        projects : filteredArray
      })
    }
  }

  addProject = (project) => {
    let flag = 0;
    this.state.projects.forEach(proj=>{
      if(proj.name===project.name&&proj.status===project.status){
        flag =1;
    
      }
    })

    if(!(flag===1)){
    let newArray = [ ...this.state.projects, project ];
   
    this.setState({ projects : newArray })
    }
  }

  handleProjectClick(index){
    this.setState({
      projects: this.state.projects.map((project, pIndex) => {
        if (pIndex !== index || (pIndex === index && project.isOpen)){
          project.isOpen = false
          return project
        }
        project.isOpen = true
        return project
      })
    })
  }
  

  render = () => {
   let handlePress = this.onRemoveClick;
   let addProject = this.addProject;

    return (
      <div>
        <Search addProject = {(project)=>addProject(project)}/>
        {this.state.projectStatus}
        {this.state.projects.map((project, index) => {
          return (
            <div key={index} className={`project ${project.status}`} 
              onClick={() => this.handleProjectClick(index)}
              >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://github.com/${project.name}`}
              >
                {project.name}
              </a>{' '}
              - <span className={project.status}>{project.status}</span>

              <button className="remove"  onClick={this.onRemoveClick(project.name)}>
                Remove
              </button>  

              {
                project.isOpen && <ProjectDetails name={project.name}/>
              }

            </div>
          );
        })}
      </div>
    );
  }
}
