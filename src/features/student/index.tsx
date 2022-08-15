import * as React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AddEditPage from "./components/AddEditPage";
import ListPage from "./components/ListPage";

export default function StudentFeature() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={match.path} exact component={ListPage} />
      <Route path={`${match.path}/add`} component={AddEditPage} />
      <Route path={`${match.path}/:studentId`} component={AddEditPage} />
    </Switch>
  );
}
