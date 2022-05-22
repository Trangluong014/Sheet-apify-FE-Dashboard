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
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Tooltip,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

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
import useAuth from "../hooks/useAuth";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
function HomePage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { user } = useAuth();

  const theme = useTheme();

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
      <Card>
        <CardHeader title={`${user?.name}'s team`} />
        <CardContent>
          <Typography variant="body1" gutterBottom>
            Welcome back ✨
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Card
                elevation={0}
                sx={{
                  borderBottom: `2px solid ${theme.palette.primary.light}`,
                  borderRadius: 0,
                }}
              >
                <CardHeader subheader="Team members" sx={{ padding: 0 }} />
                <CardContent sx={{ padding: 0 }}>
                  <Typography variant="h6" sx={{ fontSize: "2rem" }}>
                    1
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card
                elevation={0}
                sx={{
                  borderBottom: `2px solid ${theme.palette.primary.light}`,
                  borderRadius: 0,
                }}
              >
                <CardHeader subheader="Visitors" sx={{ padding: 0 }} />
                <CardContent sx={{ padding: 0 }}>
                  <Typography variant="h6" sx={{ fontSize: "2rem" }}>
                    0
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
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
          style={{ margin: "1rem 0" }}
        />
        {/* //sort */}
      </FormProvider>

      <Stack direction="column">
        <Box sx={{ position: "relative", height: 1 }}>
          {error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <Card>
              <CardHeader title="Websites" />

              <CardContent>
                <Typography variant="body1">
                  Create a new website from your spreadsheet or use one of our
                  existing templates
                </Typography>
              </CardContent>

              <CardContent>
                <Button
                  variant="contained"
                  onClick={() => navigate(`/home/website/create`)}
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                >
                  Create New Website
                </Button>
              </CardContent>

              {isLoading || isUpdating ? (
                <CardContent>
                  <Skeleton animation="wave" />
                </CardContent>
              ) : (
                <>
                  <CardContent>
                    <List>
                      {websites?.length ? (
                        websites.map((website) => (
                          <ListItem
                            key={website._id}
                            secondaryAction={
                              <Stack direction="row">
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ marginTop: ".6rem", marginRight: 1 }}
                                >
                                  Last Updated:{" "}
                                  {new Date(
                                    parseInt(website.lastUpdate)
                                  ).toLocaleString()}
                                </Typography>

                                <Tooltip title="Open website">
                                  <IconButton
                                    onClick={() =>
                                      window.open(
                                        getWebsiteUrl(website),
                                        "_blank"
                                      )
                                    }
                                  >
                                    <OpenInNewIcon />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip title="Update data">
                                  <IconButton
                                    onClick={() =>
                                      updateWebsite(website.websiteId)
                                    }
                                    disabled={isUpdating}
                                  >
                                    <RefreshIcon />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip title="Edit">
                                  <IconButton
                                    onClick={() =>
                                      navigate(
                                        `/home/website/${website.websiteId}`
                                      )
                                    }
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                            }
                          >
                            <ListItemAvatar>
                              <Avatar>
                                <img
                                  src={website?.config?.logo || noImage}
                                  height="200"
                                  width="200"
                                  alt={website?.name}
                                />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={website.name}
                              secondary={website.websiteId}
                            />
                          </ListItem>
                        ))
                      ) : (
                        <></>
                      )}
                    </List>
                    <Pagination
                      count={totalPage}
                      page={page}
                      onChange={(e) => setPage(e.target.value)}
                    />
                  </CardContent>
                </>
              )}
            </Card>
          )}
        </Box>
      </Stack>
    </Container>
  );
}

export default HomePage;
