
import React from "react";
import { Route, Routes } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import DetailsPage from "../pages/DetailsPage";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";

import RegisterPage from "../pages/RegisterPage";
import WebCreatePage from "../pages/WebCreatePage";
import AuthRequire from "./AuthRequire";

function Router() {
  return (
    <Routes>
      <Route
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/website/:id" element={<DetailsPage />} />
        <Route path="/website/create" element={<WebCreatePage />} />
      </Route>
      <Route path="/" element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
