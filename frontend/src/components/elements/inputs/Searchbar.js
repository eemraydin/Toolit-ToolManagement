import React from "react";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const InputArea = styled(InputBase)(({ theme }) => ({
  backgroundColor: "#f1f1f1",
  color: "black",
  width: "100%",  
}));

const SearchContainer = styled("div")(({ theme, customWidth }) => ({
  display: "flex",
  backgroundColor: "#f1f1f1",
  borderRadius: "5px",
  width: customWidth || "260px",
  height: "48px",
  justifyContent: "start",
  alignItems: "center",
}));

const StyledSearchIcon = styled(SearchIcon)(({ theme }) => ({
  color: "gray",
  width: "24px",
  height: "24px",
  padding: "0 10px",
}));

function Searchbar({ onSearch, customWidth }) {
  const isMobileView = useMediaQuery("(max-width:600px)");
  const location = useLocation();
  const isHomePage = location.pathname === "/home";
   const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    const query = event.target.value;
    onSearch(query);
  };


 const handleSearch= (event) => {
   setSearchTerm(event.target.value);
 };

 const handleSubmit = (event) => {
   event.preventDefault();
   onSearch(searchTerm);
 };
  

  return (
    <SearchContainer customWidth={customWidth}>
      <StyledSearchIcon />
      {isMobileView && isHomePage ? (
        <form onSubmit={handleSubmit}>
          <InputArea
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
            onKeyDown={handleSearch}
          />
        </form>
      ) : (
        <InputArea
          placeholder="Search"
          inputProps={{ "aria-label": "search" }}
          onChange={handleSearchChange}
        />
      )}
    </SearchContainer>
  );
}

export default Searchbar;
