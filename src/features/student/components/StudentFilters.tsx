import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import * as React from "react";
import { City, ListParams } from "../../../models";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent } from "react";

export interface StudentFiltersProps {
  filter: ListParams;
  cityList: City[];

  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export default function StudentFilters({
  filter,
  onSearchChange,
}: StudentFiltersProps) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;
    const newFilter = {
      ...filter,
      name_like: e.target.value,
    };
    onSearchChange(newFilter);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ m: 1 }} size="small">
            <InputLabel htmlFor="searchByName">Search by name</InputLabel>
            <OutlinedInput
              onChange={handleSearchChange}
              label="Search by name"
              id="searchByName"
              endAdornment={<SearchIcon />}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
