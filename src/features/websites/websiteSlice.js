import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { LIMIT_PER_PAGE } from "../../app/config";

const initialState = {
  isLoading: false,
  status: "idle",
  error: null,
  websites: [],
  totalPage: 0,
  website: {},
};

const slice = createSlice({
  name: "website",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWebsites.pending, (state, action) => {
        state.status = "loading";
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getWebsites.fulfilled, (state, action) => {
        state.status = "idle";
        state.isLoading = false;
        state.error = "";
        state.websites = action.payload.websiteList;
        state.totalPage = action.payload.totalPage;
      })
      .addCase(getWebsites.rejected, (state, action) => {
        state.status = "fail";
        state.isLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(getSingleWebsite.pending, (state, action) => {
        state.status = "loading";
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getSingleWebsite.fulfilled, (state, action) => {
        state.status = "idle";
        state.isLoading = false;
        state.error = "";
        state.website = action.payload.website;
      })
      .addCase(getSingleWebsite.rejected, (state, action) => {
        state.status = "fail";
        state.isLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(deleteSingleWebsite.pending, (state, action) => {
        state.status = "loading";
        state.isLoading = true;
        state.error = "";
      })
      .addCase(deleteSingleWebsite.fulfilled, (state, action) => {
        state.status = "idle";
        state.isLoading = false;
        state.error = "";
      })
      .addCase(deleteSingleWebsite.rejected, (state, action) => {
        state.status = "fail";
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const getSingleWebsite = createAsyncThunk(
  "websites/getSingleWebsite",
  async ({ websiteId }) => {
    const response = await apiService.get(`/website/${websiteId}`);
    return response.data.data;
  }
);
export const deleteSingleWebsite = createAsyncThunk(
  "websites/deleteSingleWebsite",
  async ({ websiteId }) => {
    const response = await apiService.delete(`/website/${websiteId}`);
    return response.data.data;
  }
);
export const getWebsites = createAsyncThunk(
  "websites/getWebsites",
  async ({
    limit = LIMIT_PER_PAGE,

    page,
  }) => {
    const params = {
      limit,
      page,
    };

    const response = await apiService.get(`/website`, { params });
    return response.data.data;
  }
);

export default slice.reducer;
