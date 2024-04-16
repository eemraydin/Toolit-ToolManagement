import React from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import Header from "./components/common/headers/Header";
import Sidebar from "./components/common/sidebars/Sidebar";
import "./style.css";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import AppBar from "@mui/material/AppBar";
import MobileMenu from "./components/menus/MobileMenu";
import { useMediaQuery } from "@mui/material";
import { isLoggedIn } from "./services/auth";
import Landing from "./pages/landing";

function App() {
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));

  const location = useLocation();

    if (location.pathname === "/") {
      return (
          <Landing />
      );
    }

  // Redirect to login page if the user is not logged in
  if (!isLoggedIn() && location.pathname !== "/login") {
    return <Navigate to="/login" />;
  }

   // Landing page component with a Checkout button


  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed">
        <Header />
      </AppBar>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div
           style={{
            flex: 1,
            overflowY: "auto",
            height: "calc(100vh - 150px)",
            marginTop: "70px",
            padding:  "20px",
            marginLeft: isMobileView ? 0 : 236,
          }}
        >
          <Outlet />
        </div>
      </div>

      {isMobileView && <MobileMenu />}
    </ThemeProvider>
  );
}

export default App;
