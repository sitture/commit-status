import React, { PureComponent } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Delete } from 'react-feather';
import './Filter.css';

import ProjectDetails from '../ProjectDetails/ProjectDetails';
const projectIconMaxSize = 64;
export default class Filter extends PureComponent {
  printProjectList = proj => {
    return proj.map((project, index) => {
      return (
        <div
          key={project.name}
          className={`project ${project.status}`}
          onClick={() => this.props.handleProjectClick(index)}
        >
          <div className="row">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://github.com/${project.name}`}
            >
              <img  className="project-icon-img" src={"https://github.com/" + project.name.substring(0,project.name.indexOf('/')) + ".png?size=" + projectIconMaxSize}></img>
              {project.name}
            </a>{' '}
            <button
              className="remove"
              onClick={this.props.onRemoveClick(project.name)}
            >
              <Delete />
            </button>
          </div>
          {project.isOpen && (
            <ProjectDetails
              name={project.name}
              isRefreshEnabled={this.props.isRefreshEnabled}
              refreshIntervalMillis={this.props.refreshIntervalMillis}
            />
          )}
        </div>
      );
    });
  };

  render = () => {
    const { projects } = this.props;

    let unhealthyList = projects.filter(proj => {
      return proj.status !== 'success';
    });

    return (
      <div className="tab-filter">
        <Tabs>
          <TabList>
            <Tab>All</Tab>
            <Tab>Unhealthy</Tab>
          </TabList>

          <TabPanel>
            {projects.length > 0
              ? this.printProjectList(projects)
              : 'No projects are being monitored.'}
          </TabPanel>
          <TabPanel>
            {(() => {
              if (projects.length === 0)
                return 'No projects are being monitored.';
              if (unhealthyList.length === 0) return 'All projects are green.';
              return this.printProjectList(unhealthyList);
            })()}
          </TabPanel>
        </Tabs>
      </div>
    );
  };
}
