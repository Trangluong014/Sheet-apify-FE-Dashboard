import { Alert, Box, Container, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { getSingleWebsite } from "../features/websites/websiteSlice";
import WebsiteEditForm from "./WebsiteEditForm";
import apiService from "../app/apiService";

function DetailPage() {
  const { websiteId } = useParams();
  const params = useMemo(() => ({ websiteId }), [websiteId]);
  const dispatch = useDispatch();

  const { website, isloading, error } = useSelector((state) => state.website);

  const [ranges, setRanges] = useState([]);

  useEffect(() => {
    const getRanges = async () => {
      const spreadsheetId = website?.spreadsheetId;
      if (spreadsheetId) {
        try {
          const response = await apiService.get(`/google/spreadsheet/sheet`, {
            params: {
              spreadsheet_id: spreadsheetId,
            },
          });
          setRanges(response?.data?.data);
        } catch {}
      }
    };
    getRanges();
  }, [setRanges, website]);

  useEffect(() => {
    dispatch(getSingleWebsite(params));
  }, [params, dispatch]);

  return (
    <Container sx={{ my: 3 }}>
      <Box sx={{ position: "relative", height: 1 }}>
        {isloading || !website || !ranges.length ? (
          <LoadingScreen />
        ) : (
          <>
            {error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <>
                {website ? (
                  <WebsiteEditForm
                    website={website}
                    websiteId={websiteId}
                    ranges={ranges}
                  />
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
