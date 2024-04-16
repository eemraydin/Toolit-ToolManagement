import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../components/itemLists/ItemList";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Searchbar from "../components/elements/inputs/Searchbar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

const SearchResultTitle = styled(Typography)(({ theme }) => ({
  padding: "1rem",
  color: "black",
  fontWeight: "bold",
  fontSize: "1.5rem",
}));

const SearchbarCard = styled(Card)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem",
  borderRadius: " 0 0 5px",
  backgroundColor: theme.palette.surface[100],
  marginBottom: "1rem",
}));

const SearchbarInput = styled(Searchbar)(({ theme }) => ({
  width: "100%",
}));

function Search() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    navigate(`/search/${query}`, { state: { itemName: query } });
  };

  useEffect(() => {
    if (location.pathname.startsWith("/search")) {
      setSearchQuery(params.itemName);
    }
  }, [params.itemName]);

  return (
    <>
      <SearchResultTitle variant="subtitle1" gutterBottom>
        Search Result For: {searchQuery}
      </SearchResultTitle>
      {isMobile && (
        <SearchbarCard>
          <SearchbarInput onSearch={handleSearch} customWidth="90%" />
        </SearchbarCard>
      )}
      <ItemList />
    </>
  );
}

export default Search;
