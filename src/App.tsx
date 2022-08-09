import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import cityApi from "./api/cityApi";
import { useAppDispatch } from "./app/hooks";

import { NotFound, PrivateRoute } from "./components/Common";
import { AdminLayout } from "./components/Layout";
import { authActions } from "./features/auth/authSlice";

import LoginPage from "./features/auth/pages/LoginPage";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    cityApi.getAll().then((response) => console.log(response));
  }, []);
  return (
    <div>
      <Button
        color="primary"
        variant="contained"
        onClick={() => dispatch(authActions.logout())}
      >
        Log out
      </Button>

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
