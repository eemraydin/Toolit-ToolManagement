import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { useLoaderData, useNavigate } from "react-router-dom";
import { fetchData, updateData } from "../services/api";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import IssuesFilterButton from "../components/elements/buttons/issuesFilterButton"; // Import the filter button component
import Searchbar from "../components/elements/inputs/Searchbar"; // Import the search bar component
import { useMediaQuery } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import theme from "../theme";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import NumberInput from "../components/elements/inputs/NumberInput";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

const Container = styled("div")(({ theme }) => ({
  height: "100%",
  width: "100%",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: "#342C62",
  "&:hover": {
    backgroundColor: "#54509b",
  },
  "&:disabled": {
    backgroundColor: "#a3a3a3",
  },
}));

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .inventory-list--header": {
    backgroundColor: "#C5C2DB",
    textTransform: "uppercase",
    fontweight: "700",
  },
  "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
    borderRight: `1px solid ${
      theme.palette.mode === "light" ? "#F4F4F4" : "#303030"
    }`,
  },
  width: "100%",
  marginTop: "20px",
  cursor: "pointer",
  border: `1px solid ${theme.palette.surface[100]}`,
  borderRadius: "4px",
  overflow: "hidden",
}));

const MobileFilterCard = styled(Card)(({ theme }) => ({
  display: "none",

  [theme.breakpoints.down("sm")]: {
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
    gap: "20px",
  },
}));

const ResolveIssueDiaglog = styled(DialogContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "center",
  minWidth: "300px", 
  padding: "20px", 
  textAlign: "center", 
  [theme.breakpoints.down("sm")]: {
    minWidth: "unset",
    textAlign: "left", 
  },
}));


const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.accent.green,
  color: "white",
  "&:hover": {
    backgroundColor: theme.palette.accent.green,
  },
}));

const CancelButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.accent.red,
  color: "white",
  "&:hover": {
    backgroundColor: theme.palette.accent.red,
  },
}));

const StyledItemCardTypo = styled(Typography)(({ theme }) => ({
  padding: "0.5rem",
  borderRadius: "4px",
  marginBottom: "5px",
  display: "flex",
  alignItems: "center",
}));

const StyledItemCardRow = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "start",
  borderRadius: "4px",
}));

const StatusCircle = styled("div")(({ theme, statusColor }) => ({
  width: 24,
  height: 24,
  borderRadius: "50%",
  backgroundColor: statusColor,
  marginRight: 8,
}));

const QuantityChangeButtons = styled(IconButton)(({ theme }) => ({
  padding: "0",
  margin: "0",
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  backgroundColor: "#342C62",
  color: "white",
  fontSize: "20px",
  "&:disabled": {
    backgroundColor: "#f4f4f4",
  },
  "&:hover": {
    backgroundColor: "#54509b",
  },
}));




export function loader() {
  return fetchData("issues");
}

function StockIssues() {
  const issues = useLoaderData();
  const navigate = useNavigate();
  const [filteredType, setFilteredType] = useState(""); // State to store filtered issue type
  const [searchQuery, setSearchQuery] = useState("");

  // popup
  const [open, setOpen] = useState(false); // State variable to control the popup visibility
  const [status, setStatus] = useState(""); // State variable to store selected status of resolved issue
  const [quantity, setQuantity] = useState(1); // State variable to store selected quantity
  const [selectedItemId, setSelectedItemId] = useState(""); // State variable to store selected item id
  const [itemName, setItemName] = useState(""); // State variable to store selected item name
  const [currentQuantity, setCurrentQuantity] = useState(1); // State variable to store current quantity

  const handlePopupOpen = (itemId, itemName, quantity) => {
    setSelectedItemId(itemId);
    setItemName(itemName);
    setCurrentQuantity(quantity);
    setOpen(true);
  };

  const handlePopupClose = () => {
    setOpen(false);
    setQuantity(1);
    setStatus("");
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleResolveIssue = async () => {
    try {
      const data = {
        quantity: quantity,
        status: "resolved", // Set status to "resolved"
        resolvedType: status, // Set resolved type to the selected status
      };

      // Call the updateData function to make the PATCH request
      await updateData("issues", selectedItemId, data);

      setOpen(false); // Close the dialog
      setQuantity(1);
    } catch (error) {
      console.error("Error resolving issue:", error);
    }
    setOpen(false);
    navigate("/issues");
  };

  const handleFilterChange = (type) => {
    setFilteredType(type);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleReportIssue = () => {
    navigate("/items?showPopup=true");
  };

  // Filter issues based on selected type
  const filteredIssues = filteredType
    ? issues.filter(
        (issue) => issue.type.toLowerCase() === filteredType.toLowerCase()
      )
    : issues;

  // Filter issues based on search query
  const searchedIssues = searchQuery
    ? filteredIssues.filter((issue) =>
        issue.item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredIssues;

  const columns = [
    {
      field: "itemName",
      flex: 2,
      headerName: "Item Name",
      headerClassName: "inventory-list--header",
    },
    {
      field: "type",
      flex: 0.8,
      headerName: "Issue Type",
      headerClassName: "inventory-list--header",
    },
    {
      field: "quantity",
      flex: 0.5,
      headerName: "Quantity",
      align: "right",
      headerClassName: "inventory-list--header",
    },
    {
      field: "category",
      flex: 0.6,
      headerName: "Category",
      headerClassName: "inventory-list--header",
    },
    {
      field: "reference",
      flex: 1,
      headerName: "Reference",
      headerClassName: "inventory-list--header",
    },
    {
      field: "date",
      flex: 0.8,
      headerName: "Date",
      align: "right",
      headerClassName: "inventory-list--header",
    },
    {
      field: "priority",
      flex: 1,
      headerName: "Priority",
      headerClassName: "inventory-list--header",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              backgroundColor: getPriorityColor(params.value),
              marginRight: 5,
            }}
          />
          {params.value}
        </div>
      ),
    },
    {
      field: "action",
      flex: 1,
      headerName: "Action",
      headerClassName: "inventory-list--header",
      renderCell: (params) => (
        <Button
          variant="primary"
          onClick={() =>
            handlePopupOpen(
              params.row.id,
              params.row.itemName,
              params.row.quantity
            )
          }
          disabled={
            params.row.quantity == "0" && params.row.status == "resolved"
          }
        >
          Resolve
        </Button>
      ),
    },
  ];
  const handleIncreaseQuantity = () => {
    if (quantity < currentQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  // Map the filtered issues to the DataGrid rows
  const rows = searchedIssues
    // Filter out resolved issues
    // .filter((issue) => issue.quantity != "0")
    .map((issue) => ({
      id: issue._id,
      itemName: issue.item.name,
      type: issue.type,
      quantity: issue.quantity,
      category: issue.item.type,
      reference: issue.item.reference,
      date: `${new Date(issue.createdAt).getDate()}/${
        new Date(issue.createdAt).getMonth() + 1
      }/${new Date(issue.createdAt).getFullYear()}`, //issue.createdAt,
      priority: issue.priority,
      action: issue.action,
      status: issue.status,
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  function getPriorityColor(priority) {
    switch (priority) {
      case "high":
        return theme.palette.accent.red;
      case "medium":
        return theme.palette.accent.yellow;
      case "low":
        return theme.palette.accent.green;
      default:
        return "black";
    }
  }
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <>
      {isMobile ? (
        <Container>
          <MobileFilterCard>
            <Searchbar onSearch={handleSearch} customWidth="90%" />
            <IssuesFilterButton
              onFilterChange={handleFilterChange}
              selectedType={filteredType}
            />
          </MobileFilterCard>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "1rem",
            }}
          >
            <Button
              sx={{ fontSize: { md: "17px", xs: "14px" } }}
              variant="primary"
              onClick={handleReportIssue}
            >
              {" "}
              Report Issue
            </Button>
          </div>

          <Box display="flex" flexDirection="column" gap={1} mt={2}>
            {rows.map((row) => (
              <Card
                key={row.id}
                style={{
                  marginBottom: "20px",
                  padding: "1.5rem",
                  cursor: "pointer",
                }}
                onClick={() =>
                  handlePopupOpen(row.id, row.itemName, row.quantity)
                }
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <StyledItemCardTypo variant="h5" fontWeight={700}>
                    {row.itemName}
                  </StyledItemCardTypo>
                  <StyledItemCardTypo variant="subtitle2">
                    <StatusCircle
                      statusColor={getPriorityColor(row.priority)}
                    />
                    {row.priority} Priority
                  </StyledItemCardTypo>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
                  <div
                    style={{
                      backgroundColor: "white",
                      display: "grid",
                      gridTemplateColumns: "0.5fr 1fr",
                    }}
                  >
                    <StyledItemCardTypo variant="subtitle1">
                      Issue Type:
                    </StyledItemCardTypo>
                    <StyledItemCardTypo> {row.type}</StyledItemCardTypo>
                  </div>
                  <div
                    style={{
                      backgroundColor: "lightGray",
                      display: "grid",
                      gridTemplateColumns: "0.5fr 1fr",
                    }}
                  >
                    <StyledItemCardTypo variant="subtitle1">
                      Quantity:
                    </StyledItemCardTypo>
                    <StyledItemCardTypo> {row.quantity}</StyledItemCardTypo>
                  </div>
                  <div
                    style={{
                      backgroundColor: "white",
                      display: "grid",
                      gridTemplateColumns: "0.5fr 1fr",
                    }}
                  >
                    <StyledItemCardTypo variant="subtitle1">
                      Category:
                    </StyledItemCardTypo>
                    <StyledItemCardTypo> {row.category}</StyledItemCardTypo>
                  </div>
                  <div
                    style={{
                      backgroundColor: "lightGray",
                      display: "grid",
                      gridTemplateColumns: "0.5fr 1fr",
                    }}
                  >
                    <StyledItemCardTypo variant="subtitle1">
                      Reference:
                    </StyledItemCardTypo>
                    <StyledItemCardTypo> {row.reference}</StyledItemCardTypo>
                  </div>
                  <div
                    style={{
                      backgroundColor: "white",
                      display: "grid",
                      gridTemplateColumns: "0.5fr 1fr",
                    }}
                  >
                    <StyledItemCardTypo variant="subtitle1">
                      Date:
                    </StyledItemCardTypo>
                    <StyledItemCardTypo> {row.date}</StyledItemCardTypo>
                  </div>
                </div>
              </Card>
            ))}
          </Box>
        </Container>
      ) : (
        <Container>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h2" gutterBottom>
              Stock Issues
            </Typography>

            <IssuesFilterButton
              onFilterChange={handleFilterChange}
              selectedType={filteredType}
            />
          </Box>

          <Card style={{ marginTop: 20 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "1rem",
              }}
            >
              <Searchbar onSearch={handleSearch} />

              <Button
                sx={{ fontSize: { md: "17px", xs: "14px" } }}
                variant="primary"
                onClick={handleReportIssue}
              >
                Report Issue
              </Button>
            </Box>

            <Box sx={{ minHeight: "100%", width: "100%" }}>
              {searchedIssues.length === 0 ? (
                <Typography
                  variant="h5"
                  style={{ textAlign: "center", padding: "1rem" }}
                >
                  No matching results found.
                </Typography>
              ) : (
                <StyledDataGrid
                  rows={rows}
                  columns={columns}
                  disableSelectionOnClick
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 10,
                      },
                    },
                  }}
                  pageSizeOptions={[5, 10, 20]}
                  sx={{ height: "100%", margin: "1rem" }}
                />
              )}
            </Box>
          </Card>
        </Container>
      )}
      {/* Popup to resolve issue */}
      <Dialog open={open} onClose={handlePopupClose}>
        <DialogTitle>
          <h3> Update Item Status</h3>
          <Typography variant="subtitle2" style={{ padding: "0" }}>
            Resolve issue and make stocks up to date
          </Typography>
        </DialogTitle>

        <ResolveIssueDiaglog>
          <Typography variant="subtitle1" fontWeight={700} mb={1}>
            {itemName}
          </Typography>
          <div>
            <fieldset
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                alignItems: "center",
                border: "none",
              }}
            >
              <label>
                <input
                  type="radio"
                  value="found"
                  checked={status === "found"}
                  onChange={handleStatusChange}
                  required
                />
                Found
              </label>
              <label>
                <input
                  type="radio"
                  value="fixed"
                  checked={status === "fixed"}
                  onChange={handleStatusChange}
                  required
                />
                Fixed
              </label>
            </fieldset>
          </div>

          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              gap: " 20px",
              alignItems: "center",
            }}
          >
            <Typography variant="body1">
              How many tools were found/repaired?
            </Typography>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <QuantityChangeButtons
                onClick={handleDecreaseQuantity}
                disabled={quantity <= 1}
              >
                <RemoveIcon />
              </QuantityChangeButtons>
              <TextField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                InputProps={{
                  inputProps: { min: 1, max: currentQuantity },
                }}
                disabled
                style={{ minWidth: "80px" }}
              />
              <QuantityChangeButtons
                onClick={handleIncreaseQuantity}
                disabled={quantity >= currentQuantity}
              >
                <AddIcon />
              </QuantityChangeButtons>
            </Box>
          </Box>
        </ResolveIssueDiaglog>
        <DialogActions>
          <CancelButton onClick={handlePopupClose}>Cancel</CancelButton>
          <SubmitButton
            onClick={handleResolveIssue}
            disabled={status == "" || quantity == 0}
          >
            Resolve
          </SubmitButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default StockIssues;
