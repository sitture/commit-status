import React from 'react';
import '../ProjectList/ProjectList.css';
export default class ListSearch extends React.Component {
  state = {
    project: null,
    input:""
  };



  handlePress = (name) => {
    
   
    
    // this.setState({
    //   projects : filteredArray
    // })
  }


  render = () => {
  let project=this.props.project;
  
    return (
        <div className={`project ${project.state}`}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://github.com/${project.repository.full_name}`}
        >
          {project.repository.full_name}
        </a>{' '}
        - <span className={project.state}>{project.state}</span>
        <button  onClick={()=>this.handlePress(project.repository.full_name)}>
          Add Repo
        </button>  
      </div>
    );
  }
}
