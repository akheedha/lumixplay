import React from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { motion } from "framer-motion";

/* USER PAGES */

import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Search from "./pages/user/Search";
import Watchlist from "./pages/user/Watchlist";
import Profile from "./pages/user/Profile";
import MovieDetails from "./pages/user/MovieDetails";
import VideoPlayer from "./pages/user/VideoPlayer";

/* ADMIN PAGES */

import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Movies from "./pages/admin/Movies";
import AddMovie from "./pages/admin/AddMovie";
import Users from "./pages/admin/Users";
import Reports from "./pages/admin/Reports";

/* SIDEBARS */

import Sidebar from "./components/common/Sidebar";
import AdminSidebar from "./components/admin/AdminSidebar";

function PageWrapper({ children }) {

  return (

    <motion.div
      initial={{ opacity:0, y:20 }}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:0.4 }}
    >
      {children}
    </motion.div>

  );

}

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* USER ROUTES */}

        <Route
          path="/"
          element={
            <PageWrapper>
              <Login />
            </PageWrapper>
          }
        />

        <Route
          path="/home"
          element={
            <PageWrapper>
              <Sidebar />
              <Home />
            </PageWrapper>
          }
        />

        <Route
          path="/login"
          element={
            <PageWrapper>
              <Login />
            </PageWrapper>
          }
        />

        <Route
          path="/register"
          element={
            <PageWrapper>
              <Register />
            </PageWrapper>
          }
        />

        <Route
          path="/search"
          element={
            <PageWrapper>
              <Sidebar />
              <Search />
            </PageWrapper>
          }
        />

        <Route
          path="/watchlist"
          element={
            <PageWrapper>
              <Sidebar />
              <Watchlist />
            </PageWrapper>
          }
        />

        <Route
          path="/profile"
          element={
            <PageWrapper>
              <Sidebar />
              <Profile />
            </PageWrapper>
          }
        />

        <Route
          path="/movie-details/:id"
          element={
            <PageWrapper>
              <Sidebar />
              <MovieDetails />
            </PageWrapper>
          }
        />

        <Route
          path="/player/:id"
          element={
            <PageWrapper>
              <Sidebar />
              <VideoPlayer />
            </PageWrapper>
          }
        />

        {/* ADMIN ROUTES */}

        <Route
          path="/admin/login"
          element={
            <PageWrapper>
              <AdminLogin />
            </PageWrapper>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <PageWrapper>
              <AdminSidebar />
              <Dashboard />
            </PageWrapper>
          }
        />

        <Route
          path="/admin/movies"
          element={
            <PageWrapper>
              <AdminSidebar />
              <Movies />
            </PageWrapper>
          }
        />

        <Route
          path="/admin/add-movie"
          element={
            <PageWrapper>
              <AdminSidebar />
              <AddMovie />
            </PageWrapper>
          }
        />

        <Route
          path="/admin/users"
          element={
            <PageWrapper>
              <AdminSidebar />
              <Users />
            </PageWrapper>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <PageWrapper>
              <AdminSidebar />
              <Reports />
            </PageWrapper>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default AppRoutes;
