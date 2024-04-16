import React from "react";
import { fetchItems } from "../../services/api";
import Card from "@mui/material/Card";
import BasicTable from "../elements/tables/BasicTable";
import Grid from "@mui/material/Grid";
import Status from "../elements/Status";

export function loader({ params }) {
  return fetchItems(params.id);
}

const Details = (props) => {
  const item = props.item;

  const createTableRow = (name, value) => {
    return { name, value };
  };

  const createTableRows = () => {
    let result = [];
    result.push(createTableRow("Status", (<Status status={item.status}></Status>)));
    result.push(createTableRow("Brand", item.brand));
    result.push(createTableRow("Category", item.type));
    result.push(createTableRow("SKU", item.reference));
    result.push(createTableRow("Size", item.size));
    result.push(createTableRow("Min Quantity", item.threshold));
    result.push(createTableRow("In Inventory", item.availablecount));
    result.push(
      createTableRow("In Use (Rooms)", [
        item.inrooms,
        <Grid key="rooms" container sx={{ paddingTop: "19px" }}>
          {item.roomitems.map((i) => (
            <Card
              key={i._id}
              sx={{
                textAlign: "center",
                minHeight: "10px",
                maxWidth: "172px",
                padding: "15px 24px",
                marginRight: "16px",
                marginBottom: "16px",
                flexGrow: 2,
              }}
            >
              {i.room.name} ({i.quantity}{" "}
              {i.quantity <= 1 ? item.type : item.type + "s"})
            </Card>
          ))}
        </Grid>,
      ])
    );
    return result;
  };

  return (
    <>
      {item ? (
        <BasicTable dark rows={createTableRows()}></BasicTable>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Details;
