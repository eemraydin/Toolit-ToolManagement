import React from "react";
import { fetchItems } from "../../services/api";
import Typography from '@mui/material/Typography';
import { DataGrid } from "@mui/x-data-grid";

export function loader({params}) {
    return fetchItems(params.id);
  }
  
const AuditLog = props =>{ 
  const item = props.item; 

  const logs = ()=>{
    return item.auditlog.sort((a,b) => (a.actiondate < b.actiondate) ? 1 : ((b.actiondate < a.actiondate) ? -1 : 0));
    //  return item.auditlog;
  }

  let rows = [];
  logs().map((log) => {
    rows.push({
      id: log._id,
      date: `${new Date(log.actiondate).getDate()}/${new Date(log.actiondate).getMonth() + 1}/${new Date(log.actiondate).getFullYear()}`,
      userlog: log.userlog,
      log: log.log
    });
  });

  const columns = [
    { field: "id", headerName: "Id", width: 10 },
    { field: "date", headerName: "Date", width: 200 },
    { field: "userlog", headerName: "User", width: 200 },
    { field: "log", headerName: "Log", width: 500 },
  ];

    return (
        <>
            {item ? (
              <>
              <Typography variant="h4">
                  Audit Log
                </Typography>
                <Typography variant="subtitle2" sx={{paddingTop:"16px"}}>Track user activity and tool movements</Typography>
               <DataGrid autoHeight
                  sx={{ border: "none", marginTop: "24px",
                      "& .MuiDataGrid-columnHeaders": {
                        display:"none"
                      },}}
                
                  columnVisibilityModel={{
                    id: false,
                  }}
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 10 },
                    },
                  }}
                  pageSizeOptions={[10, 50, 100]}
                />
                </>
            ) : (
            <div>Loading...</div>
            )}
        </>
        );
}       
    
export default AuditLog;