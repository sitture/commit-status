(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,a){},28:function(e,t,a){e.exports=a(59)},33:function(e,t,a){},36:function(e,t,a){},37:function(e,t,a){},38:function(e,t,a){},56:function(e,t,a){e.exports=a.p+"static/media/plus.26c522c2.svg"},57:function(e,t,a){},58:function(e,t,a){},59:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(24),s=a.n(o),c=(a(33),a(3)),l=a(7),i=a(5),u=a(4),h=a(6),m=a(11),f=(a(36),a(37),function(e){function t(){return Object(c.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"header"},r.a.createElement("h1",null,"CommitStatus"))}}]),t}(r.a.Component)),p=a(27),d=a(13),v=a(9),E=(a(15),a(38),a(10)),g={unauthorized_entry:"You do not have access",not_found:"The repo that you are looking is invalid",default_error:"Problem with Commit Status. Please try again later"},j=function(e){function t(){var e,n;Object(c.a)(this,t);for(var o=arguments.length,s=new Array(o),l=0;l<o;l++)s[l]=arguments[l];return(n=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(s)))).state={input:""},n.handleChange=function(e){n.setState({input:e.target.value})},n.alertUser=function(e){var t=document.createElement("div"),a=document.createElement("span"),r=document.createTextNode(e);t.classList.add("error-message"),t.appendChild(r),a.classList.add("close"),a.innerText="X",a.addEventListener("click",n.handleClose),t.appendChild(a),document.querySelector(".add-container").appendChild(t).focus()},n.handleSubmit=function(e){e.preventDefault();var t={};Object({NODE_ENV:"production",PUBLIC_URL:"/commit-status"}).REACT_APP_GITHUB_TOKEN&&(t.headers={Authorization:Object({NODE_ENV:"production",PUBLIC_URL:"/commit-status"}).REACT_APP_GITHUB_TOKEN}),E.get("https://api.github.com/repos/".concat(n.state.input,"/commits/master/status"),t).then(function(e){var t={name:e.data.repository.full_name,status:e.data.state};n.props.addProject(t)}).catch(function(e){return 403===e.response.status?n.alertUser(g.unauthorized_entry):404===e.response.status?n.alertUser(g.not_found):n.alertUser(g.default_error)}),n.setState({input:""})},n.handlePress=function(e){e.preventDefault(),n.setState({input:""})},n.handleClose=function(e){e.preventDefault(),document.querySelector(".add-container").removeChild(e.target.parentElement)},n.render=function(){return r.a.createElement("div",{className:"add-container"},r.a.createElement("div",{className:"add-bar-container"},r.a.createElement("form",{className:"add-bar-container",onSubmit:n.handleSubmit},r.a.createElement("input",{className:"add-bar",type:"text",value:n.state.input,spellCheck:"false",onChange:n.handleChange,placeholder:"sitture/commit-status"}),r.a.createElement("img",{className:"add-icon",alt:"",src:a(56)}))))},n}return Object(h.a)(t,e),t}(r.a.Component),b=a(8),R=a(61),P=(a(57),a(58),a(10)),O={};Object({NODE_ENV:"production",PUBLIC_URL:"/commit-status"}).REACT_APP_GITHUB_TOKEN&&(O.headers={Authorization:Object({NODE_ENV:"production",PUBLIC_URL:"/commit-status"}).REACT_APP_GITHUB_TOKEN});var S=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={commitDetails:null,shouldRefresh:!1},a.componentDidMount=function(){P.get("https://api.github.com/repos/".concat(a.props.name,"/commits"),O).then(function(e){a.setState({commitDetails:e.data})})},a.componentDidUpdate=function(e){a.props.isRefreshEnabled&&a.state.shouldRefresh&&!a.interval||e.refreshIntervalMillis!==a.props.refreshIntervalMillis?(a.stopLocalAutoRefresh(),a.startLocalAutoRefresh()):!a.props.isRefreshEnabled&&a.interval&&a.stopLocalAutoRefresh()},a.interval=null,a.stopLocalAutoRefresh=function(){clearInterval(a.interval),a.interval=null},a.startLocalAutoRefresh=function(){a.interval=setInterval(function(){P.get("https://api.github.com/repos/".concat(a.props.name,"/commits"),O).then(function(e){return a.setState({commitDetails:e.data})})},a.props.refreshIntervalMillis)},a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"componentWillUnmount",value:function(){this.stopLocalAutoRefresh()}},{key:"toggleAutoRefresh",value:function(e){var t=this;e.stopPropagation(),this.props.isRefreshEnabled&&this.setState(function(e){return{shouldRefresh:!e.shouldRefresh}},function(){t.stopLocalAutoRefresh(),t.state.shouldRefresh&&t.props.isRefreshEnabled&&t.startLocalAutoRefresh()})}},{key:"render",value:function(){var e=this;if(!this.state.commitDetails)return r.a.createElement("div",null,r.a.createElement("h5",null,"Loading details ..."));var t="Toggle Auto Refresh OFF";return this.props.isRefreshEnabled?this.state.shouldRefresh||(t="Toggle Auto Refresh ON"):t="Refresh Disabeled Globally",r.a.createElement("div",{className:"ProjectDetails"},r.a.createElement("button",{onClick:function(t){return e.toggleAutoRefresh(t)},className:"autoRefreshButton"},t),"Commit Details",r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Committer"),r.a.createElement("th",null,"Message"),r.a.createElement("th",null,"Date"),r.a.createElement("th",null,"Changes"))),r.a.createElement("tbody",null,this.state.commitDetails.map(function(e,t){return r.a.createElement("tr",{key:t},r.a.createElement("td",null,e.commit.committer.name),r.a.createElement("td",null,e.commit.message),r.a.createElement("td",null,e.commit.committer.date),r.a.createElement("td",null,r.a.createElement("a",{href:e.html_url,rel:"noopener noreferrer",target:"_blank"},"See changes here")))}))))}}]),t}(n.Component),C=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).printProjectList=function(e){return e.map(function(e,t){return r.a.createElement("div",{key:e.name,className:"project ".concat(e.status),onClick:function(){return a.props.handleProjectClick(t)}},r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://github.com/".concat(e.name)},e.name)," ","- ",r.a.createElement("span",{className:e.status},e.status),r.a.createElement("button",{className:"remove",onClick:a.props.onRemoveClick(e.name)},r.a.createElement(R.a,null)),e.isOpen&&r.a.createElement(S,{name:e.name,isRefreshEnabled:a.props.isRefreshEnabled,refreshIntervalMillis:a.props.refreshIntervalMillis}))})},a.render=function(){var e=a.props.projects,t=e.filter(function(e){return"success"!==e.status});return r.a.createElement("div",{className:"tab-filter"},r.a.createElement(b.d,null,r.a.createElement(b.b,null,r.a.createElement(b.a,null,"All"),r.a.createElement(b.a,null,"Unhealthy")),r.a.createElement(b.c,null,e.length>0?a.printProjectList(e):"No projects are being monitored."),r.a.createElement(b.c,null,0===e.length?"No projects are being monitored.":0===t.length?"All projects are green.":a.printProjectList(t))))},a}return Object(h.a)(t,e),t}(n.PureComponent),I=a(10),_=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).DEFAULT_STATUS="pending",a.LS_PROJECTS_KEY="projects",a.state={projects:[]},a.authoRefreshIntervalId=null,a.componentDidMount=function(){a.loadProjects(),a.props.isRefreshEnabled&&a.autoRefreshProjectStatuses()},a.componentWillUnmount=function(){a.stopProjectsAutoRefresh()},a.componentDidUpdate=function(e,t,n){!a.props.isRefreshEnabled||a.authoRefreshIntervalId&&t.projects.length===a.state.projects.length&&t.refreshIntervalMillis===a.props.refreshIntervalMillis?a.props.isRefreshEnabled||a.stopProjectsAutoRefresh():(a.stopProjectsAutoRefresh(),a.autoRefreshProjectStatuses())},a.stopProjectsAutoRefresh=function(){clearInterval(a.authoRefreshIntervalId),a.authoRefreshIntervalId=null},a.loadProjects=function(){var e=a.getProjectsFromLocalStorage().map(function(e){return{name:e,status:a.DEFAULT_STATUS}}).sort(a.sortProjects);a.setState({projects:e},a.loadProjectStatuses)},a.loadProjectStatuses=function(){var e={};Object({NODE_ENV:"production",PUBLIC_URL:"/commit-status"}).REACT_APP_GITHUB_TOKEN&&(e.headers={Authorization:Object({NODE_ENV:"production",PUBLIC_URL:"/commit-status"}).REACT_APP_GITHUB_TOKEN});var t=a.state.projects.map(function(t){return I.get("https://api.github.com/repos/".concat(t.name,"/commits/master/status"),e)});Promise.all(t).then(function(e){var t=e.map(function(e){return{name:e.data.repository.full_name,status:e.data.state}}),n=Object(d.a)(a.state.projects),r=!1;t.forEach(function(e,t){n[t].status!==e.status&&(n[t].status=e.status,r=!0)}),r&&a.setState({projects:n})},function(e){console.log("error",e)}).catch(console.log)},a.autoRefreshProjectStatuses=function(){if(a.state.projects.length&&!a.authoRefreshIntervalId){var e=setInterval(function(){a.loadProjectStatuses()},a.props.refreshIntervalMillis);a.authoRefreshIntervalId=e}else!a.state.projects.length&&a.authoRefreshIntervalId&&a.stopProjectsAutoRefresh()},a.sortProjects=function(e,t){return e.name<t.name?-1:e.name>t.name?1:e.status>t.status?-1:1},a.addProject=function(e){if(!a.state.projects.some(function(t){return t.name===e.name})){var t=[].concat(Object(d.a)(a.state.projects),[e]).sort(a.sortProjects);a.addProjectToLocalStorage(e.name),a.setState({projects:t})}},a.addProjectToLocalStorage=function(e){var t=a.getProjectsFromLocalStorage();t.push(e),localStorage.setItem(a.LS_PROJECTS_KEY,JSON.stringify(t))},a.removeProjectFromLocalStorage=function(e){var t=a.getProjectsFromLocalStorage().filter(function(t){return t!==e});localStorage.setItem(a.LS_PROJECTS_KEY,JSON.stringify(t))},a.render=function(){var e=a.addProject;return r.a.createElement("div",null,r.a.createElement(j,{addProject:function(t){return e(t)}}),r.a.createElement(C,{projects:a.state.projects,handleProjectClick:a.handleProjectClick.bind(Object(v.a)(a)),onRemoveClick:a.onRemoveClick.bind(Object(v.a)(a)),isRefreshEnabled:a.props.isRefreshEnabled,refreshIntervalMillis:a.props.refreshIntervalMillis}))},a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"onRemoveClick",value:function(e){var t=this;return function(a){a.stopPropagation();var n=t.state.projects.filter(function(t){return t.name!==e});t.removeProjectFromLocalStorage(e),t.setState({projects:n})}}},{key:"getProjectsFromLocalStorage",value:function(){var e=localStorage.getItem(this.LS_PROJECTS_KEY);return e?JSON.parse(e):[]}},{key:"handleProjectClick",value:function(e){this.setState({projects:this.state.projects.map(function(t,a){return a===e?Object(p.a)({},t,{isOpen:!t.isOpen}):t})})}},{key:"clickWithNoPropagation",value:function(e){e.nativeEvent.stopImmediatePropagation(),e.stopPropagation()}}]),t}(r.a.Component),A=function(e){return r.a.createElement("div",{className:"refresh-settings-container"},r.a.createElement("span",{className:"slider-text"},"Refresh every"),r.a.createElement("input",{className:"refresh-interval-input",value:e.refreshIntervalSeconds,onChange:e.onRefreshIntervalChange}),r.a.createElement("span",{className:"slider-text"},"seconds"),r.a.createElement("label",{className:"switch"},r.a.createElement("input",{className:"refreshCheckbox",type:"checkbox",onChange:e.onRefreshToggleChange,checked:e.isRefreshEnabled}),r.a.createElement("span",{className:"slider round"})))},N=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={isRefreshEnabled:!0,refreshIntervalSeconds:30},a.handleRefreshToggleChange=function(){a.setState(function(e){return{isRefreshEnabled:!e.isRefreshEnabled}})},a.handleRefreshIntervalChange=function(e){a.setState({refreshIntervalSeconds:e.target.value})},a.getRefreshIntervalInMilliSeconds=function(){return 1e3*a.state.refreshIntervalSeconds},a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(m.b,null,r.a.createElement(m.a,{htmlAttributes:{lang:"en",amp:void 0},meta:[{name:"description",content:"A simple React app that shows a list of projects with their Github commit status and use it as a dashboard to view status of your CI pipelines."}],title:"CommitStatus"})),r.a.createElement(A,{isRefreshEnabled:this.state.isRefreshEnabled,refreshIntervalSeconds:this.state.refreshIntervalSeconds,onRefreshIntervalChange:this.handleRefreshIntervalChange,onRefreshToggleChange:this.handleRefreshToggleChange}),r.a.createElement(f,null),r.a.createElement(_,{isRefreshEnabled:this.state.isRefreshEnabled,refreshIntervalMillis:this.getRefreshIntervalInMilliSeconds()}))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[28,1,2]]]);
//# sourceMappingURL=main.9fc6f595.chunk.js.map