import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const FilterContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  max-width: 340px;
  justify-items: center;
  align-items: center;
`;

const StyledFormControl = styled(FormControl)`
  margin: 8px;
  width: 100px;
`;

function FilterButtons({ brands, statuses , onFilterChange }) {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  //  const [selectedRooms, setSelectedRooms] = useState([]); 

  const handleBrandChange = (event) => {
    const brand = event.target.value;
    setSelectedBrand(brand);
    onFilterChange(brand, selectedStatus);
  };

  const handleStatusChange = (event) => {
    const status = event.target.value;
    setSelectedStatus(status);
    onFilterChange(selectedBrand, status);
  };

    //  const handleRoomChange = (event) => {
    //    const rooms = event.target.value;
    //    setSelectedRooms(rooms); // Update selected rooms
    //    onFilterChange(selectedBrand, selectedStatus, rooms); // Pass selected rooms
    //  };

  return (
    <FilterContainer>
      <span style={{ marginRight: "10px" }}>Filter By </span>
      <StyledFormControl fullWidth size="small">
        <InputLabel id="brand-select-label">Brand</InputLabel>
        <Select
          labelId="brand-select-label"
          label="Brand"
          id="brand-select"
          value={selectedBrand}
          onChange={handleBrandChange}
          style={{
            borderRadius: "8px",
            color: "#54509B",
            backgroundColor: "white",
          }}
        >
          <MenuItem value="">All Brands</MenuItem>
          {brands.map((brand) => (
            <MenuItem key={brand} value={brand}>
              {brand}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>
      {/* <StyledFormControl size="small">
        <InputLabel id="room-select-label">Room</InputLabel>
        <Select
          label="Room"
          labelId="room-select-label"
          id="room-select"
          multiple // Enable multiple selection
          value={selectedRooms}
          onChange={handleRoomChange}
          style={{
            borderRadius: "8px",
            color: "#54509B",
            backgroundColor: "white",
          }}
        >
          <MenuItem value="">All Rooms</MenuItem>
          {rooms.map((room) => (
            <MenuItem key={room} value={room}>
              {room}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl> */}
      <StyledFormControl size="small">
        <InputLabel id="status-select-label">Status</InputLabel>
        <Select
          label="Status"
          labelId="status-select-label"
          id="status-select"
          value={selectedStatus}
          onChange={handleStatusChange}
          style={{
            borderRadius: "8px",
            color: "#54509B",
            backgroundColor: "white",
          }}
        >
          <MenuItem value="">All Statuses</MenuItem>
          {statuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>
    </FilterContainer>
  );
}

export default FilterButtons;
