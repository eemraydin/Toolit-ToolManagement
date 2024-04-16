import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Alert from "@mui/material/Alert";

import NumberInput from "../inputs/NumberInput";
import Searchbar from "../inputs/Searchbar";
import CardElement from "../cards/Card";
import BasicTable from "./BasicTable";
import { getItemQuantityInRoom } from "../../../utils/roomItemUtils";

const StyledTableContainer = styled("div")`
  margin: 1rem 0;
`;

const StyledCheckbox = styled("input")`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const StyledLabel = styled("label")`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
`;

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-columnHeader": {
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
  border: `2px solid ${theme.palette.surface[100]}`,
  borderRadius: "8px",
  overflow: "hidden",
}));

const RoomItemsTable = (props) => {
  const isInventory = props.type == "inventory";
  const targetItems = props.items;
  const roomId = isInventory && props.roomId;
  if (!targetItems || targetItems.length < 1) {
    return <p>{`Please add item to ${isInventory ? "inventory" : "room"}`}</p>;
  }

  const columns = [
    {
      field: "itemName",
      headerName: "ITEM NAME",
      width: 480,
      flex: {md:4, sm:2},
    },
    {
      field: "size",
      headerName: "SIZE",
      width: 120,
      flex: 1,
    },
    {
      field: "brand",
      headerName: "BRAND",
      width: 120,
      flex: 2,
    },
    {
      field: "reference",
      headerName: "REFERENCE",
      width: 120,
      flex: 2,
    },
    {
      field: "quantity",
      headerName: "QUANTITY",
      type: "number",
      width: 240,
      flex: {md:2, sm:3},
      renderCell: (params) => (
        <>
          <NumberInput
            defaultValue={params.row.quantity}
            id={"quantity_" + params.row.id}
            disabled={!props.itemSelection.includes(params.row.id)}
          />
          <br></br>
          {props.error.find((x) => x.id == params.row.id) && (
            <Alert severity="error" id={"error_" + params.row.id}>
              {props.error.find((x) => x.id == params.row.id).error}
            </Alert>
          )}
        </>
      ),
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredItems = targetItems.filter((targetItem) => {
    const displayedItem = isInventory ? targetItem : targetItem.item;
    return (
      !searchQuery ||
      displayedItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      displayedItem.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      displayedItem.reference.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  let rows = [];
  filteredItems.map((targetItem) => {
    const displayedItem = isInventory ? targetItem : targetItem.item;
    rows.push({
      id: targetItem._id,
      itemName: displayedItem.name,
      size: displayedItem.size,
      brand: displayedItem.brand,
      reference: displayedItem.reference,
      quantity: isInventory
        ? getItemQuantityInRoom(targetItem, roomId)
        : targetItem.quantity,
    });
  });

  const createTableRow = (name, value) => {
    return { name, value };
  };

  const createMobileTable = (item) => {
    let result = [];
    result.push(createTableRow("Size", item.size));
    result.push(createTableRow("Brand", item.brand));
    result.push(createTableRow("Reference", item.reference));
    result.push(
      createTableRow(
        "Quantity",
        <>
          <NumberInput
            defaultValue={item.quantity}
            id={"quantity_" + item.id}
            disabled={!props.itemSelection.includes(item.id)}
          />
          <br></br>
          {props.error.find((x) => x.id == item.id) && (
            <Alert severity="error" id={"error_" + item.id}>
              {props.error.find((x) => x.id == item.id).error}
            </Alert>
          )}
        </>
      )
    );
    return result;
  };

  const handleMobileSelectionChange = () => {
    let selectedItems = [];
    rows.map((row) => {
      if (document.getElementById(`roomitem_${row.id}`).checked) {
        selectedItems.push(row.id);
      }
    });
    props.handleSelectionChange(selectedItems);
  };

  return (
    <>
      {props.isMobile ? (
        <>
          <CardElement>
            <Searchbar onSearch={handleSearch} customWidth={"100%"} />
          </CardElement>
          {rows &&
            rows.map((row) => {
              return (
                <CardElement>
                  <StyledLabel>
                    <StyledCheckbox
                      type="checkbox"
                      id={`roomitem_${row.id}`}
                      onChange={handleMobileSelectionChange}
                    />
                    {row.itemName}
                  </StyledLabel>
                  <BasicTable isMobile rows={createMobileTable(row)} />
                </CardElement>
              );
            })}
        </>
      ) : (
        <>
          <Searchbar onSearch={handleSearch} />
          <StyledTableContainer style={{ height: "calc(100vh - 420px)", width: "100%" }}>
            <StyledDataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 100 },
                },
              }}
              pageSizeOptions={[25, 50, 100]}
              checkboxSelection
              disableRowSelectionOnClick
              rowSelectionModel={props.itemSelection}
              onRowSelectionModelChange={(newRowSelection) =>
                props.handleSelectionChange(newRowSelection)
              }
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
              }
            />
          </StyledTableContainer>
        </>
      )}
    </>
  );
};

export default RoomItemsTable;
