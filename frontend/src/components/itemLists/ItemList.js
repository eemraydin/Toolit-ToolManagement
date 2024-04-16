import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { fetchData } from "../../services/api";
import { useLoaderData } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Searchbar from "../elements/inputs/Searchbar";
import FilterButtons from "../elements/buttons/InventoryFilterButton";
import { styled } from "@mui/material/styles";
import theme from "../../theme";
import { Typography, Card, Box } from "@mui/material";
import { useMediaQuery } from "@mui/material";

// Style
const Container = styled(Card)(({ theme }) => ({
  padding: "1rem",
  maxWidth: "100%",
}));

const FilterContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "end",
}));

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .inventory-list--header': {
        backgroundColor: '#C5C2DB',
        textTransform: "uppercase",
        fontWeight: "700"
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: `1px solid ${
      theme.palette.mode === 'light' ? '#F4F4F4' : '#303030'
    }`,
  },
  width: "100%",
  marginTop: "20px",
  cursor: "pointer",
  border: `2px solid ${theme.palette.surface[100]}`,
  borderRadius: "8px",
  overflow: "hidden",
}));

const SearchContainerMobile = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "1rem",
  paddingBottom: "16px",
  marginRight: "16px",
  marginBottom: "1rem",
  backgroundColor: theme.palette.surface[100],
  borderRadius: "16px",
  width: "100%",
}));

const FilterButtonsContainer = styled("div")(({ theme }) => ({
  marginTop: "20px",
}));

const StatusCircle = styled("div")(({ theme, statusColor }) => ({
  width: 24,
  height: 24,
  borderRadius: "50%",
  backgroundColor: statusColor,
  marginRight: 8,
}));

const StyledItemCardTypo = styled(Typography)(({ theme }) => ({
  padding: "0.5rem",
  borderRadius: "4px",
  marginBottom: "5px",
}));

const ItemCard = ({ item, onItemClick }) => (
  <Card
    style={{ marginBottom: "20px", padding: "1.5rem", cursor: "pointer" }}
    onClick={() => onItemClick(item.id)}
  >
    <Typography variant="h5" fontWeight={700} mb={2}>
      {item.name}
    </Typography>
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
    >
      <StatusCircle statusColor={getStatusColor(item.status)} />
      <Typography>{item.status}</Typography>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
      <div
        style={{
          backgroundColor: "white",
          display: "grid",
          gridTemplateColumns: "0.5fr 1fr",
        }}
      >
        <StyledItemCardTypo>Size:</StyledItemCardTypo>
        <StyledItemCardTypo>{item.size}</StyledItemCardTypo>
      </div>
      <div
        style={{
          backgroundColor: "lightGray",
          display: "grid",
          gridTemplateColumns: "0.5fr  1fr",
        }}
      >
        <StyledItemCardTypo>Brand:</StyledItemCardTypo>
        <StyledItemCardTypo>{item.brand}</StyledItemCardTypo>
      </div>
      <div
        style={{
          backgroundColor: "white",
          display: "grid",
          gridTemplateColumns: "0.5fr  1fr",
        }}
      >
        <StyledItemCardTypo>Reference:</StyledItemCardTypo>
        <StyledItemCardTypo>{item.reference}</StyledItemCardTypo>
      </div>
      <div
        style={{
          backgroundColor: "lightGray",
          display: "grid",
          gridTemplateColumns: "0.5fr  1fr",
        }}
      >
        <StyledItemCardTypo>Quantity:</StyledItemCardTypo>
        <StyledItemCardTypo>{item.quantity}</StyledItemCardTypo>
      </div>
    </div>
  </Card>
);

// column schema for the data grid
const columns = [
  {
    field: "itemName",
    headerName: "Item Name",
    flex: 3,
    headerClassName: "inventory-list--header",
  },
  {
    field: "size",
    headerName: "Size",
    flex: 1,
    headerClassName: "inventory-list--header",
    align: "right",
  },
  {
    field: "brand",
    headerName: "Brand",
    flex: 1,
    headerClassName: "inventory-list--header",
  },
  {
    field: "reference",
    headerName: "Reference",
    flex: 1,
    headerClassName: "inventory-list--header",
  },
  {
    field: "quantity",
    headerName: "Quantity",
    flex: 1,
    headerClassName: "inventory-list--header",
    align: "right",
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    headerClassName: "inventory-list--header",
    renderCell: (params) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            backgroundColor: getStatusColor(params.value),
            marginRight: 8,
          }}
        />
        <span>{params.value}</span>
      </div>
    ),
  },
];

export function loader() {
  return fetchData("items");
}

// Helper function to get unique brand names
function getUniqueBrands(items) {
  return [...new Set(items.map((item) => item.brand))];
}

// Helper function to get unique status values
function getUniqueStatuses(items) {
  return [...new Set(items.map((item) => item.status))];
}

// Function to determine color based on status
function getStatusColor(status) {
  switch (status) {
    case "Available":
      return theme.palette.accent.green;
    case "Low on stock":
      return theme.palette.accent.yellow;
    case "Out of Stock":
      return theme.palette.accent.red;
    default:
      return "black";
  }
}

function ItemList() {
  const params = useParams();
  const items = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBrand, setFilteredBrand] = useState("");
  const [filteredStatus, setFilteredStatus] = useState("");

  // Update search query when the URL changes from header Search
  useEffect(() => {
    if (location.pathname.startsWith("/search")) {
      setSearchQuery(params.itemName);
    }
  }, [params.itemName]);

  const handleFilterChange = (brand, status) => {
    setFilteredBrand(brand);
    setFilteredStatus(status);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Function to filter items based on search query, brand, and status
  const filteredItems = items.filter((item) => {
    const brandMatch = !filteredBrand || item.brand === filteredBrand;
    const statusMatch = !filteredStatus || item.status === filteredStatus;
    const searchMatch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return brandMatch && statusMatch && searchMatch;
  });

  // Map the filtered items to the DataGrid rows
  const rows = filteredItems.map((item) => ({
    id: item._id,
    itemName: item.name,
    size: item.size,
    brand: item.brand,
    reference: item.reference,
    quantity: item.totalcount,
    status: item.status,
  }));

  // Function to handle row click
  const handleRowClick = (params) => {
    navigate(`/items/${params.row.id}`);
  };

  // Function to handle item card click on mobile
  const handleItemClick = (itemId) => {
    navigate(`/items/${itemId}`);
  };

  const hideSearchBar = location.pathname.startsWith("/search");
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <>
      {isMobile ? (
        <div>
          <SearchContainerMobile>
             {!hideSearchBar && <Searchbar onSearch={handleSearch} customWidth="90%" />}
            <FilterButtonsContainer>
              <FilterButtons
                brands={getUniqueBrands(items)}
                statuses={getUniqueStatuses(items)}
                onFilterChange={handleFilterChange}
              />
            </FilterButtonsContainer>
          </SearchContainerMobile>

          {filteredItems.length === 0 ? (
            <Typography variant="h3" style={{ textAlign: "center" }}>
              No matching results found.
            </Typography>
          ) : (
            <Box display="flex" flexDirection="column" gap={1}>
              {filteredItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onItemClick={handleItemClick}
                />
              ))}
            </Box>
          )}
        </div>
      ) : (
        <Container>
          <FilterContainer>
            {!hideSearchBar && <Searchbar onSearch={handleSearch} />}
            <FilterButtons
              brands={getUniqueBrands(items)}
              statuses={getUniqueStatuses(items)}
              onFilterChange={handleFilterChange}
            />
          </FilterContainer>
          {filteredItems.length === 0 ? (
            <Typography variant="h3" style={{ textAlign: "center" }}>
              No matching results found.
            </Typography>
          ) : (
            <StyledDataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[5, 10, 20]}
              onRowClick={handleRowClick}
              style={{ cursor: "pointer" }}
            />
          )}
        </Container>
      )}
    </>
  );
}

export default ItemList;
