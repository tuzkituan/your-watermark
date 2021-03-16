import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import MainPage from './pages/Main'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/about">
          <MainPage />
        </Route>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
}