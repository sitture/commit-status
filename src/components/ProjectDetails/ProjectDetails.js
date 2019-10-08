import React, { Component } from 'react';
import "./ProjectDetails.css";
var axios = require('axios');
export default class ProjectDetails extends Component {
    state={
        commitDetails:null
    }
    componentDidMount=()=>{
        const params = {};
      if (process.env.REACT_APP_GITHUB_TOKEN) {
        params.headers = {
          Authorization: process.env.REACT_APP_GITHUB_TOKEN,
        };
      }
  
      axios.get(
        `https://api.github.com/repos/${this.props.name}/commits`,
        params
      ).then(data=>this.setState({commitDetails:data.data}))
    }
    render() {
       if(!this.state.commitDetails){
           return(
               <div><h5>Loading details ...</h5></div>
           )
       }
        return (
            <div>
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
