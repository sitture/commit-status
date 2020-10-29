import React, { createContext, useReducer } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { initialState, reducer } from "./store/reducer";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

export const AuthContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <HelmetProvider>
        <Helmet
          htmlAttributes={{ lang: "en", amp: undefined }}
          meta={[
            {
              name: "description",
              content:
                "A simple React app that shows a list of projects with their Github commit status and use it as a dashboard to view status of your CI pipelines.",
            },
          ]}
          title="CommitStatus"
        />
      </HelmetProvider>
      <AuthContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
