import React from "react";
import { Route, Switch } from "react-router-dom";
import WelcomeImage from "./welcome.png";
import "./app.css";
import User from "./User";
import Post from "./Post";

const App = () => (
  <div>
    <h1>Hello World</h1>
    <img src={WelcomeImage} />
    <Switch>
      <Route path="/user">
        <User />
      </Route>
      <Route path="/post">
        <Post />
      </Route>
    </Switch>
  </div>
);

export default App;
