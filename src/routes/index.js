import React from "react";
import { Route, Routes } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import DetailsPage from "../pages/DetailsPage";

import HomePage from "../pages/HomePage";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";

import RegisterPage from "../pages/RegisterPage";
import UserAccount from "../pages/UserAccount";
import WebCreatePage from "../pages/WebCreatePage";
import AuthRequire from "./AuthRequire";

function Router() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route
        path="/home"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="/home/website/create" element={<WebCreatePage />} />
        <Route path="/home/website/:websiteId" element={<DetailsPage />} />
        <Route path="/home/user" element={<UserAccount />} />
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
