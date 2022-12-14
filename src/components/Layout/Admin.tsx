import * as React from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";

import { Header, Sidebar } from "../Common";
import Dashboard from "../../features/dashboard";
import StudentFeature from "../../features/student";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateRows: "auto 1fr",
    gridTemplateColumns: "240px 1fr",
    gridTemplateAreas: `"header header" "sidebar content"`,
    minHeight: "100vh",
  },
  header: {
    gridArea: "header",
  },
  sidebar: {
    gridArea: "sidebar",
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
  content: {
    gridArea: "content",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 3),
  },
}));

export function AdminLayout() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>
      <Box className={classes.sidebar}>
        <Sidebar />
      </Box>
      <Box className={classes.content}>
        <Switch>
          <Route path="/admin/dashboard" component={Dashboard} />
          <Route path="/admin/students" component={StudentFeature} />
        </Switch>
      </Box>
    </Box>
  );
}
