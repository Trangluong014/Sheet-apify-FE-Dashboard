import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Container,
  Divider,
  Grid,
  Link,
  Rating,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  FilledInput,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import noImage from "../components/no-image.png";
import { getSingleWebsite, deleteSingleWebsite } from "../features/websites/websiteSlice";
import { getWebsiteUrl } from "../app/constants";

import LinkIcon from "@mui/icons-material/Link";

function DetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { website, isloading, error } = useSelector((state) => state.website);
  const websiteId = params.id;
  console.log(params);
  console.log(websiteId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleWebsite({ websiteId }));
  }, [websiteId, dispatch]);

  return (
    <Container sx={{ my: 3 }}>
      <Box sx={{ position: "relative", height: 1 }}>
        {isloading ? (
          <LoadingScreen />
        ) : (
          <>
            {error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <>
                {website ? (
                  <Card>
                    <CardHeader 
                      title={`${website.name} (${website.websiteId})`}
                      subheader={`Last updated: ${new Date(parseInt(website.lastUpdate)).toLocaleString()}`}
                      action={
                        <IconButton aria-label="Visit Website" onClick={() => window.location.href = getWebsiteUrl(website)}>
                          <LinkIcon /> 
                        </IconButton>
                      }
                    />

                    <CardMedia>
                      <img src={noImage} />
                    </CardMedia>

                    <CardContent>
                      <Box sx={{ '& > :not(style)': { m: 1 } }}>
                        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                          <InputLabel>Template</InputLabel>
                          <FilledInput
                            disabled
                            variant="outlined"
                            value={website.template}
                          />
                        </FormControl>
                        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                          <InputLabel>Spreadsheet ID</InputLabel>
                          <FilledInput
                            disabled
                            variant="outlined"
                            value={website.spreadsheetId}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton>
                                  <LinkIcon />
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </Box>
                    </CardContent>

                    <CardActions style={{ justifyContent: 'space-between' }}>
                      <Button onClick={() => {}}>
                        Update Website
                      </Button>
                      <Button color="error" onClick={() => {
                        dispatch(deleteSingleWebsite({ websiteId }))
                        navigate("/");
                      }}>
                        Delete Website
                      </Button>
                    </CardActions>
                  </Card>
                ) : (
                  <Typography variant="h6">Website not found!</Typography>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </Container>
  );
}

export default DetailPage;
