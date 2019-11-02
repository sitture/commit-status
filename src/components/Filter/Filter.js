import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './Filter.css';

import ProjectDetails from '../ProjectDetails/ProjectDetails';

export default class Filter extends Component {
  printProjectList = proj => {
    return proj.map((project, index) => {
      return (
        <div
          key={index}
          className={`project ${project.status}`}
          onClick={() => this.props.handleProjectClick(index)}
        >
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://github.com/${project.name}`}
          >
            {project.name}
          </a>{' '}
          - <span className={project.status}>{project.status}</span>
          <button
            className="remove"
            onClick={this.props.onRemoveClick(project.name)}
          >
            Remove
          </button>
          {project.isOpen && (
            <ProjectDetails
              name={project.name}
              refreshEnabeledGlobally={this.props.refreshEnabeledGlobally}
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
