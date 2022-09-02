import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
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
  cityList,
  onChange,
  onSearchChange,
}: StudentFiltersProps) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;
    const newFilter: ListParams = {
      ...filter,
      name_like: e.target.value,
      _page: 1,
    };
    onSearchChange(newFilter);
  };

  const handleCityChange = (e: SelectChangeEvent) => {
    if (!onChange) return;
    const newFilter: ListParams = {
      ...filter,
      city: e.target.value || undefined,
      _page: 1,
    };
    onChange(newFilter);
  };

  const handleSortChange = (e: SelectChangeEvent) => {
    if (!onChange) return;
    const value = e.target.value as string;
    const [_sort, _order] = value.split(".");
    const newFilter: ListParams = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as "asc" | "desc") || undefined,
    };
    onChange(newFilter);
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

        <Grid item xs={12} md={6} lg={3}>
          <FormControl fullWidth size="small" sx={{ m: 1 }}>
            <InputLabel id="demo-simple-select-label">
              Filter by city
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              label="Filter by city"
              onChange={handleCityChange}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {cityList.map((city) => (
                <MenuItem key={city.code} value={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <FormControl fullWidth size="small" sx={{ m: 1 }}>
            <InputLabel id="sort-by">Sort</InputLabel>
            <Select
              labelId="sort-by"
              label="Sort"
              onChange={handleSortChange}
              value={filter._sort ? `${filter._sort}.${filter._order}` : ""}
            >
              <MenuItem value="">
                <em>No sort</em>
              </MenuItem>
              <MenuItem value="name.asc">Name ascending</MenuItem>
              <MenuItem value="name.desc">Name decreasing</MenuItem>
              <MenuItem value="mark.asc">Mark ascending</MenuItem>
              <MenuItem value="mark.desc">Mark descending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
