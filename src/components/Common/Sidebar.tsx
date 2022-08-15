import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  link: {
    color: "inherit",
    textDecoration: "none",

    "&.active > div": {
      backgroundColor: theme.palette.action.selected,
    },
  },
}));

export function Sidebar() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <nav aria-label="main mailbox folders">
        <List sx={{ padding: 0 }}>
          <NavLink to="/admin/dashboard" className={classes.link}>
            <ListItem disablePadding button>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
          </NavLink>

          <NavLink to="/admin/students" className={classes.link}>
            <ListItem disablePadding button>
              <ListItemButton>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Students" />
              </ListItemButton>
            </ListItem>
          </NavLink>
        </List>
      </nav>
    </Box>
  );
}
