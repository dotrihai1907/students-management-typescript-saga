import * as React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import { authActions } from "../authSlice";

export default function LoginPage() {
  const dispatch = useAppDispatch();

  const isLogging = useAppSelector((state) => state.auth.logging);

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
            {isLogging && (
              <CircularProgress
                size={20}
                color="info"
                sx={{ marginRight: "20px" }}
              />
            )}
            Fake Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
