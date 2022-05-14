import {
  Alert,
  Container,
  Stack,
  Typography,
  Box,
  InputAdornment,
  Button,
  Pagination,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import LoadingScreen from "../components/LoadingScreen";

import { FormProvider, FTextField } from "../components/form";
import { getWebsites } from "../features/websites/websiteSLice";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { websites, isLoading, totalPage, error } = useSelector(
    (state) => state.website
  );

  /* //pagination */

  /* //search */

  const defaultValues = {
    search: "",
  };
  const methods = useForm({
    defaultValues,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getWebsites({
        page,
        search,
      })
    );
  }, [dispatch, page, search]);

  return (
    <Container>
      <Stack sx={{ display: "flex", alignItems: "center", m: "2rem" }}>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          SHEETS-APIFY
        </Typography>
      </Stack>

      <FormProvider methods={methods}>
        {/* //search */}
        <FTextField
          name="search"
          sx={{ width: 300 }}
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {/* //sort */}
      </FormProvider>

      <Stack direction="row" justifyContent="space-between">
        <Box sx={{ position: "relative", height: 1 }}>
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <>
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <Stack
                  direction="column"
                  spacing={2}
                  justifyContent="space-around"
                  flexWrap="wrap"
                >
                  {websites.map((website) => (
                    <ListItemButton
                      onClick={() => navigate(`/website/${website._id}`)}
                    >
                      <ListItemText>{website.name}</ListItemText>
                    </ListItemButton>
                  ))}
                </Stack>
              )}
            </>
          )}
        </Box>
        <Box sx={{ my: 3 }}>
          <Button
            variant="contained"
            onClick={() => navigate(`/website/create`)}
          >
            Create New Website
          </Button>
        </Box>
      </Stack>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3, mb: 3 }}>
        <Pagination
          count={totalPage}
          page={page}
          onChange={(e) => setPage(e.target.value)}
        />
      </Box>
    </Container>
  );
}

export default HomePage;
