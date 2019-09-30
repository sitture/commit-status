import React from 'react';
import '../ProjectList/ProjectList.css';
import './Search.css';
export default class ListSearch extends React.Component {



  handlePress = (project) => {
    let obj = {
      name : project.repository.full_name,
      status : project.state
    }
    this.props.addProject(obj)
  }


  render = () => {
  let project=this.props.project;
  
    return (
        <div>
      <span>Search Results:     </ span>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://github.com/${project.repository.full_name}`}
        >
          {project.repository.full_name}
        </a>{' '}
      
        <button  onClick={()=>this.handlePress(project)}>
          Add Repo
        </button>  
      </div>
    );
  }
}
