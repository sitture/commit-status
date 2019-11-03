import React from 'react';
import './ProjectList.css';
import AddProject from '../AddProject/AddProject';
import Filter from '../Filter/Filter';

var axios = require('axios');

export default class ProjectList extends React.Component {
  DEFAULT_STATUS = 'pending';
  LS_PROJECTS_KEY = 'projects';

  state = {
    projects: [],
  };

  authoRefreshIntervalId = null;

  componentDidMount = () => {
    this.loadProjects();
    if (this.props.refreshEnabeledGlobally) {
      this.autoRefreshProjectStatuses();
    }
  };

  componentWillUnmount = () => {
    this.stopProjectsAutoRefresh();
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (
      this.props.refreshEnabeledGlobally &&
      (!this.authoRefreshIntervalId ||
        prevState.projects.length !== this.state.projects.length)
    ) {
      this.autoRefreshProjectStatuses();
    } else if (!this.props.refreshEnabeledGlobally) {
      this.stopProjectsAutoRefresh();
    }
  };

  stopProjectsAutoRefresh = () => {
    clearInterval(this.authoRefreshIntervalId);
    this.authoRefreshIntervalId = null;
  };

  loadProjects = () => {
    const projects = this.getProjectsFromLocalStorage();

    const sortedProjects = projects
      .map(project => {
        return { name: project, status: this.DEFAULT_STATUS };
      })
      .sort(this.sortProjects);

    this.setState({ projects: sortedProjects }, this.loadProjectStatuses);
  };

  loadProjectStatuses = () => {
    const params = {};

    if (process.env.REACT_APP_GITHUB_TOKEN) {
      params.headers = {
        Authorization: process.env.REACT_APP_GITHUB_TOKEN,
      };
    }

    let promiseArray = this.state.projects.map(project => {
      return axios.get(
        `https://api.github.com/repos/${project.name}/commits/master/status`,
        params
      );
    });
    Promise.all(promiseArray)
      .then(
        results => {
          const sortedProjects = results.map(project => {
            return {
              name: project.data.repository.full_name,
              status: project.data.state,
            };
          });

          const updatedProjects = [...this.state.projects];
          let shouldUpdateState = false;
          sortedProjects.forEach((project, index) => {
            if (updatedProjects[index].status !== project.status) {
              updatedProjects[index].status = project.status;
              shouldUpdateState = true;
            }
          });

          if (shouldUpdateState) {
            this.setState({
              projects: updatedProjects,
            });
          }
        },
        reason => {
          console.log('error', reason);
        }
      )
      .catch(console.log);
  };

  autoRefreshProjectStatuses = () => {
    if (this.state.projects.length && !this.authoRefreshIntervalId) {
      const authoRefreshIntervalId = setInterval(() => {
        this.loadProjectStatuses();
      }, 20000);
      this.authoRefreshIntervalId = authoRefreshIntervalId;
    } else if (
      !this.state.projects.length &&
      this.authoRefreshIntervalId
    ) {
      this.stopProjectsAutoRefresh();
    }
  };

  sortProjects = (a, b) => {
    if (a.name < b.name) return -1;
    else if (a.name > b.name) return 1;
    return a.status > b.status ? -1 : 1;
  };

  onRemoveClick(name) {
    return event => {
      event.stopPropagation();

      let filteredArray = this.state.projects.filter(
        project => project.name !== name
      );

      this.removeProjectFromLocalStorage(name);

      this.setState({
        projects: filteredArray,
      });
    };
  }

  addProject = project => {
    let flag = 0;
    this.state.projects.forEach(proj => {
      if (proj.name === project.name && proj.status === project.status) {
        flag = 1;
      }
    });

    if (!(flag === 1)) {
      let newArray = [...this.state.projects, project].sort(this.sortProjects);
      this.addProjectToLocalStorage(project.name);

      this.setState({ projects: newArray });
    }
  };

  getProjectsFromLocalStorage() {
    const projects = localStorage.getItem(this.LS_PROJECTS_KEY);

    if (!projects) {
      return [];
    }

    return JSON.parse(projects);
  }

  addProjectToLocalStorage = projectName => {
    const projects = this.getProjectsFromLocalStorage();
    projects.push(projectName);

    localStorage.setItem(this.LS_PROJECTS_KEY, JSON.stringify(projects));
  };

  removeProjectFromLocalStorage = projectName => {
    const projects = this.getProjectsFromLocalStorage();
    const updatedProjectsList = projects.filter(
      project => project !== projectName
    );

    localStorage.setItem(
      this.LS_PROJECTS_KEY,
      JSON.stringify(updatedProjectsList)
    );
  };

  handleProjectClick(index) {
    this.setState({
      projects: this.state.projects.map((project, pIndex) => {
        if (pIndex === index)
          return {
            ...project,
            isOpen: !project.isOpen,
          };
        return project;
      }),
    });
  }

  clickWithNoPropagation(e) {
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation();
  }

  render = () => {
    let addProject = this.addProject;

    return (
      <div>
        <AddProject addProject={project => addProject(project)} />
        <Filter
          projects={this.state.projects}
          handleProjectClick={this.handleProjectClick.bind(this)}
          onRemoveClick={this.onRemoveClick.bind(this)}
          refreshEnabeledGlobally={this.props.refreshEnabeledGlobally}
        />
      </div>
    );
  };
}
