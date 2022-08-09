import React from "react";
import { Switch, Route } from "react-router-dom";

import { NotFound, PrivateRoute } from "./components/Common";
import { AdminLayout } from "./components/Layout";

import LoginPage from "./features/auth/pages/LoginPage";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/login" component={LoginPage} />

        <PrivateRoute>
          <Route path="/admin" component={AdminLayout} />
        </PrivateRoute>

        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
