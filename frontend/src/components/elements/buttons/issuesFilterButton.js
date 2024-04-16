import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const FilterContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  max-width: 340px;
  justify-items: center;
  align-items: center;
`;

function IssuesFilterButton({ onFilterChange }) {
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = (event, status) => {
    setSelectedStatus(status);
    onFilterChange(status);
  };

  return (
    <>
      <FilterContainer>
        <span style={{ marginRight: "10px" }}>Filter By </span>
        <ToggleButtonGroup
          value={selectedStatus}
          exclusive
          onChange={handleStatusChange}
          aria-label="FilterBy"
          size="small"
          style={{border: "1px solid #54509B", borderRadius: "8px" , color: "#54509B" , backgroundColor: "white" }}
        >
          <ToggleButton value="missing" >Missing</ToggleButton>
          <ToggleButton value="broken">Broken</ToggleButton>
          <ToggleButton value="out of order">Out Of Order</ToggleButton>
        </ToggleButtonGroup>
      </FilterContainer>
    </>
  );
}

export default IssuesFilterButton;
