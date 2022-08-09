import * as React from "react";

import { Box, Button, Paper, Typography } from "@mui/material";
import { useAppDispatch } from "../../../app/hooks";
import { authActions } from "../authSlice";

export default function LoginPage() {
  const dispatch = useAppDispatch();

  const handleLoginClick = () => {
    dispatch(
      authActions.login({
        username: "",
        password: "",
      })
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper elevation={1} style={{ padding: "24px" }}>
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>

        <Box mt={4}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLoginClick}
          >
            Fake Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
