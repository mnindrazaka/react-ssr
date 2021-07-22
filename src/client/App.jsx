/** @jsx jsx */

import React from "react";
import { css, jsx } from '@emotion/react'
import { Route, Switch } from "react-router-dom";
import WelcomeImage from "./welcome.png";
import User from "./User";
import Post from "./Post";
import styled from '@emotion/styled'

const Button = styled.button`
  padding: 32px;
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  &:hover {
    color: white;
  }
`

const App = () => (
  <div>
    <h1
      css={css`
        color: blue;
      `}
    >Hello World</h1>
    <Button>tes</Button>
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
