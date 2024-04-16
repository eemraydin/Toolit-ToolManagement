import React from "react";
import { fetchItems } from "../../services/api";
import { useLoaderData } from "react-router-dom";
import ItemImage from "./itemImage.js";
import Details from "./details.js";
import AuditLog from "./auditLog.js";
import ItemForm from "../forms/ItemForm.js";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CustomModal from "../elements/dialogs/CustomModal.js";
import ReserveForm from "../forms/ReserveForm.js"
import ReportIssuesForm from "../forms/ReportIssuesForm.js"
import AdjustStockForm from "../forms/AdjustStockForm.js";
import SuccessSnackbar from "../elements/dialogs/SuccessSnackbar.js";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "75%",
  height: '75vh',
  bgcolor: 'background.paper',
  borderRadius: '8px',
  padding: "2rem",
  overflow: 'auto'
};

export function loader({params}) {
  return fetchItems(params.id);
}

function Items() {
  const [openItem, setOpenItem] = React.useState(false);
  const handleOpenItem = () => setOpenItem(true);
  const handleCloseItem = () => setOpenItem(false);

  const [openReserve, setOpenReserve] = React.useState(false);
  const handleOpenReserve = () => setOpenReserve(true);
  const handleCloseReserve = () => setOpenReserve(false);

  const [openAdjustStock, setOpenAdjustStock] = React.useState(false);
  const handleOpenAdjustStock = () => setOpenAdjustStock(true);
  const handleCloseAdjustStock = () => {
    setOpenAdjustStock(false)
    setSelectedAdjustType({title: "Adjust Stock",
                           subtitle: "Inventory tracking is enabled by default"})
  };

  const [openReportIssues, setOpenReportIssues] = React.useState(false);
  const handleOpenReportIssues = () => setOpenReportIssues(true);
  const handleCloseReportIssues = () => {
    setOpenReportIssues(false)
    setSelectedReportIssues({title: "Report Issues",
                             subtitle: "Select the most appropriate option"})
  };

  const [selectedReportIssues, setSelectedReportIssues] = React.useState({title: "Report Issues",
  subtitle: "Select the most appropriate option"});

  const [selectedAdjustType, setSelectedAdjustType] = React.useState({title: "Adjust Stock",
  subtitle: "Inventory tracking is enabled by default"});

  const [item, setItem] = React.useState(useLoaderData())
  const handleItem = (updatedItem) => setItem(updatedItem);
  const actionEnum={
    editItem: { 
      buttonLabel: "Edit Item Details", 
      innerButtonLabel: "Save",
      method: "PATCH",
      redirect: `/items/${item._id}`
      }
  }

  const [openCompleteSuccess, setOpenCompleteSuccess] = React.useState(false);
  const handleOpenCompleteSuccess = () => setOpenCompleteSuccess(true);
  const handleCloseCompleteSuccess = (event, reason) => {
    if (reason != "clickaway") setOpenCompleteSuccess(false);
  };

  const [message, setMessage] = React.useState();

  return (
    <>
      {item ? (
      <>
      <SuccessSnackbar
                open={openCompleteSuccess}
                onClose={handleCloseCompleteSuccess}
                message={message}
      />
              
      <Grid container>
        <Grid item xs={12} md={4} order={{ md: 0, xs: 1 }} >
          <Typography gutterBottom 
            sx={{ paddingLeft: { xs: '1rem', md: 0 }, typography:{ md: 'h2', xs: 'h4' } }}>
            {item.name}
          </Typography>
        </Grid>
        <Grid item xs={12} md={8} container gap={{md: 2, xs: 0.5}} justifyContent={{md: "flex-end", xs: "space-around"}} sx={{marginBottom: "24px"}} order={{ md:1, xs: 0 }}>
          <CustomModal 
                title={selectedReportIssues.title} 
                subtitle={selectedReportIssues.subtitle}
                open={openReportIssues} 
                handleClose={handleCloseReportIssues} 
                handleOpen={handleOpenReportIssues} 
                buttonName={"Report Issues"} 
                description={
                <ReportIssuesForm 
                    handleClose={handleCloseReportIssues} 
                    item={item} 
                    setItem={setItem}
                    setSelectedReportIssues={setSelectedReportIssues}
                    handleOpenCompleteSuccess={handleOpenCompleteSuccess}
                    setMessage={setMessage}/>
              }>
          </CustomModal>
          <CustomModal 
                title={selectedAdjustType.title} 
                subtitle={selectedAdjustType.subtitle}
                open={openAdjustStock} 
                handleClose={handleCloseAdjustStock} 
                handleOpen={handleOpenAdjustStock} 
                buttonName={"Adjust Stock"} 
                description={
                <AdjustStockForm 
                    handleClose={handleCloseAdjustStock} 
                    item={item} 
                    setItem={setItem}
                    setSelectedAdjustType={setSelectedAdjustType}
                    handleOpenCompleteSuccess={handleOpenCompleteSuccess}
                    setMessage={setMessage}/>
              }>
            </CustomModal>
          <CustomModal 
                title={"Reserve"} 
                subtitle={"Move item to the selected room"}
                open={openReserve} 
                handleClose={handleCloseReserve} 
                handleOpen={handleOpenReserve} 
                buttonName={"Reserve"} 
                description={
                <ReserveForm 
                    handleClose={handleCloseReserve} 
                    item={item} 
                    setItem={setItem}
                    handleOpenCompleteSuccess={handleOpenCompleteSuccess}
                    setMessage={setMessage}/>
              }>
            </CustomModal>
        </Grid>
      </Grid>

      <Grid container component={Paper} sx={{marginBottom: "24px", padding: "24px", borderRadius: "8px"}} rowGap={2.5} >
          <Grid item md={12} xs={6} order={{ md: 0 }}>
            <Typography variant="h4">
              Overview
            </Typography>
          </Grid>

          <Grid item xs={12} md={6} sx={{paddingRight: {md: "24px"}}} order={{ md: 1, xs: 2 }} >
            <ItemImage item={item} />
          </Grid>
          
          <Grid item xs={12} md={6} sx={{paddingLeft:  {md: "24px"}}} order={{ md: 2, xs: 3 }}>
            <Details item={item}/>
          </Grid>

          <Grid item md={12} xs={6} order={{ md: 3, xs: 1 }} >
            <CustomModal style={style} open={openItem} handleClose={handleCloseItem} handleOpen={handleOpenItem} buttonName={"Edit Item Details"} 
                  isEditItem={true}
                  description={ 
                    <ItemForm sx={style} action={actionEnum.editItem} item={item} 
                    handleItem={handleItem} 
                    handleClose={handleCloseItem}
                    handleOpenCompleteSuccess={handleOpenCompleteSuccess}
                    setMessage={setMessage}
                    />
                  }>
            </CustomModal>
          </Grid>
      </Grid>

      <Grid item xs={12} component={Paper} sx={{marginBottom: "24px", padding: "24px", borderRadius: "8px"}}>
          <AuditLog item={item}/>
      </Grid>
    </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

   

export default Items;
