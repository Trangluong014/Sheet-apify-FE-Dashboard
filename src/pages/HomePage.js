import {
  Alert,
  Container,
  Stack,
  Typography,
  Box,
  InputAdornment,
  Button,
  Pagination,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import LoadingScreen from "../components/LoadingScreen";

import { FormProvider, FTextField } from "../components/form";
import { getWebsites } from "../features/websites/websiteSlice";
import { useNavigate } from "react-router-dom";
import { getWebsiteUrl } from "../app/constants";
import apiService from "../app/apiService";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";
import noImage from "../components/no-image.png";

function HomePage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { websites, isLoading, totalPage, error } = useSelector(
    (state) => state.website
  );

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

  const [isUpdating, setIsUpdating] = useState(false);

  const updateWebsite = async (websiteId) => {
    try {
      setIsUpdating(true);
      await apiService.post(`/website/${websiteId}/update`);
      dispatch(
        getWebsites({
          page,
          search,
        })
      );
      setIsUpdating(false);
    } catch {}
  };

  return (
    <Container>
      <FormProvider methods={methods}>
        {/* //search */}
        <FTextField
          name="search"
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
          style={{ margin: "1rem" }}
        />
        {/* //sort */}
      </FormProvider>

      <Stack direction="column">
        <Box sx={{ position: "relative", height: 1 }}>
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <>
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(12, 1fr)"
                  gap={2}
                >
                  {websites?.length ? (
                    websites.map((website) => (
                      <Box gridColumn="span 4" key={website._id}>
                        <Card>
                          <CardHeader
                            title={website.name}
                            subheader={website.websiteId}
                          />

                          <CardContent>
                            <img src={website?.config?.logo || noImage} />
                          </CardContent>

                          <CardContent>
                            <Typography variant="body2" color="text.secondary">
                              Last Updated:{" "}
                              {new Date(
                                parseInt(website.lastUpdate)
                              ).toLocaleString()}
                            </Typography>
                          </CardContent>
                          <CardActions
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Button
                              onClick={() =>
                                (window.location.href = getWebsiteUrl(website))
                              }
                            >
                              Visit Website
                            </Button>
                            <Stack direction="row">
                              <IconButton
                                onClick={() => updateWebsite(website.websiteId)}
                                disabled={isUpdating}
                              >
                                <RefreshIcon />
                              </IconButton>
                              <IconButton
                                onClick={() =>
                                  navigate(`/website/${website.websiteId}`)
                                }
                              >
                                <EditIcon />
                              </IconButton>
                            </Stack>
                          </CardActions>
                        </Card>
                      </Box>
                    ))
                  ) : (
                    <></>
                  )}
                </Box>
              )}
            </>
          )}
        </Box>
        <Box
          style={{
            marginTop: "1rem",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Button
            variant="contained"
            onClick={() => navigate(`/website/create`)}
            style={{ marginLeft: "auto", marginRight: "auto" }}
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
