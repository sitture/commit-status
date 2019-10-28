import React, { Component } from 'react';
import "./ProjectDetails.css";
var axios = require('axios');

const params = {};

if (process.env.REACT_APP_GITHUB_TOKEN) {
  params.headers = {
    Authorization: process.env.REACT_APP_GITHUB_TOKEN,
  };
}

export default class ProjectDetails extends Component {
    state={
        commitDetails:null,
        shouldRefresh: false,
    }
    componentDidMount=()=>{
      axios.get(
        `https://api.github.com/repos/${this.props.name}/commits`,
        params
      ).then(data=>this.setState({commitDetails:data.data}))
    }

    componentWillUnmount () {
      clearInterval(this.interval);
    }
 
    toggleAutoRefresh (e) {
      e.stopPropagation(); // Prevent the click event from being fired on the parent elements as well

      this.setState({
        shouldRefresh: !this.state.shouldRefresh,
      }, () => {

        clearInterval(this.interval);

        if (this.state.shouldRefresh) {
          this.interval = setInterval(() => {
            axios.get(
              `https://api.github.com/repos/${this.props.name}/commits`,
              params
            )
            .then(data => this.setState({ commitDetails:data.data }))
          }, 30000); // Refresh every 30 seconds
        }

      })
    }

    render() {
       if(!this.state.commitDetails){
           return(
               <div><h5>Loading details ...</h5></div>
           )
       }
        return (
            <div className='ProjectDetails'>

              <button onClick={(e) => this.toggleAutoRefresh(e)} className='autoRefreshButton'>
                Toggle Auto Refresh {this.state.shouldRefresh ? 'OFF' : 'ON'}
              </button>

             Commit Details
             <table>
                 <thead>
                            <tr>
                               <th>Committer</th> 
                               <th>Message</th>
                               <th>Date</th> 
                                <th>Changes</th> 
                            </tr>
                            </thead>
                            <tbody>
                {this.state.commitDetails.map((details,index)=>(
                    <tr key={index}>
                        
                        <td>{details.commit.committer.name}</td>
                        <td>{details.commit.message}</td>
                        <td>{details.commit.committer.date}</td>
                      <td><a href={details.html_url} rel="noopener noreferrer"  target="_blank">See changes here</a></td> 
                      
                    </tr>
                ))}
                </tbody> 
                  </table>
            </div>
            
        )
    }
}
