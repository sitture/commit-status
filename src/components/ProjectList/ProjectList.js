import React from 'react';
import './ProjectList.css'

var axios = require('axios');

export default class ProjectList extends React.Component {

    state = {
        projects: []
    };

    componentDidMount() {
        var th = this;
        var processedProjects = []
        this.serverRequest =
            axios.get(this.props.source)
                .then(function(result) {
                    
                    var status = result.data.defaultStatus
                    result.data.projects.map(function(project) {
                        processedProjects.push({"name": project, "status": status})
                    })
                    th.setState({
                        projects: processedProjects
                    });

                    let promiseArray = processedProjects.map(project => axios.get(`https://api.github.com/repos/${project.name}/commits/master/status`, {
                        headers: {
                            Authorization: 'token e93224369636413fd7e8bc7e86ea21280328ef6e'
                        }
                    }));
                    Promise.all(promiseArray)
                        .then(

                            results => {
                                console.log('values', results)
                                processedProjects = []
                                results.map(function (project) {
                                    processedProjects.push({ "name": project.data.repository.full_name, "status": project.data.state })
                                })
                                
                                th.setState({
                                    projects: processedProjects
                                });
                            },
                            reason => {
                                console.log('error', reason)
                            });

                });
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }

    render() {
        return (
            <div>
                {this.state.projectStatus}
                {this.state.projects.map(function(project, index) {
                    return (
                        <div key={index} className="project">
                            <a target="_blank" href={`https://github.com/${project.name}`} >{project.name}</a> - {project.status}
                        </div>
                    );
                })}
            </div>
        );
    }
};
