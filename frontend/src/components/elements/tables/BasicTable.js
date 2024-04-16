import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

const StyledTableContainer = styled(TableContainer)`
  margin: 1rem 0;
`;

const StyledTable = styled(Table)`
  tr:nth-of-type(even) {
    background-color: #f4f4f4;
  }
`;

const BasicTable = (props) => {
  if (!props.rows || props.rows.length < 1) {
    return null;
  }

  if (props.dark) {
    return (
      <TableContainer sx={{ borderRadius: "8px" }}>
        <Table aria-label="basic table">
          <TableBody
            sx={{
              "tr:nth-of-type(odd)": { backgroundColor: "#F4F4F4" },
              "tr:nth-of-type(even)": { backgroundColor: "#E3E3E3" },
            }}
          >
            {props.rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: 700,
                    fontSize: "16px",
                  }}
                >
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else {
    return (
      <StyledTableContainer component={Paper}>
        <StyledTable aria-label="basic table">
          <TableBody>
            {props.rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    padding: props.isMobile ? "1rem 0.5rem" : "1rem",
                  }}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: props.isMobile ? "1rem 0.5rem" : "1rem",
                  }}
                >
                  {row.value ? row.value : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
    );
  }
};

export default BasicTable;
