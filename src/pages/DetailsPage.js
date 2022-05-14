import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Link,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams, Link as RouterLink } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { fCurrency } from "../utils/numberFormat";
import noImage from "../components/no-image.png";
import { getSingleWebsite } from "../features/websites/websiteSLice";

function DetailPage() {
  const params = useParams();
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
      <Typography color="text.primary">{website?.name}</Typography>

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
                    <Grid container>
                      <Typography variant="h5" paragraph>
                        {website.name}
                      </Typography>

                      <Divider sx={{ borderStyle: "dashed" }} />
                      <Typography>{website.template}</Typography>
                      <Divider sx={{ borderStyle: "dashed" }} />
                      <Box sx={{ my: 3 }}>
                        <Button variant="contained" onClick={() => {}}>
                          Update Website
                        </Button>
                      </Box>
                    </Grid>
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
