import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ItemList from "../components/itemLists/ItemList";
import { Typography, Grid } from "@mui/material";
import Popups from "../components/common/Popups";
import Button from "../components/elements/buttons/Button";


function Inventory() {
  const location = useLocation(); // Get the current location
  const [showPopup, setShowPopup] = useState(false); // Initially hide the popup

  useEffect(() => {
    // Check if the query parameter showPopup exists in the URL
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has("showPopup")) {
      setShowPopup(true);
    }

    // Hide the popup after 2 seconds
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 2000);

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, [location.search]); // Include location.search in the dependency array

  // Define the popup message
  const popupMessage = {
    content: "Please select an item to report issue",
  };

  return (
    <>
      <Grid container mb={2}>
        <Grid item xs={12} md={9}>
          <Typography variant="h2" gutterBottom>
            Inventory
          </Typography>
          <Typography variant="subtitle">
            These are the items within your system
          </Typography>
        </Grid>
        <Grid item xs={12} md={3} mt={3}>
          <Button to={"/items/new"} children={"Add New Item"} />
        </Grid>
      </Grid>
      {showPopup && (
        <Popups
          onClose={() => setShowPopup(false)}
          popupMessage={popupMessage}
        />
      )}
      <ItemList />
      <Outlet />
    </>
  );
}

export default Inventory;
