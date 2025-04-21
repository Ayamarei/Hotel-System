import { Box, Button, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import { THEMECOLOR } from "../../Services/ThemeColors";
import { privateUserAxiosInstance } from "../../Services/Axiosinstance";
import { FACILITES_URLS } from "../../Services/Urls";
import { useEffect, useState } from "react";
import { IFacility } from "../../Interfaces/FacilitesInterface";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: THEMECOLOR.HeadTableColor,
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


export default function FacilitesList() {

    const [allFacilites,setAllFacilites]= useState<IFacility[]>([])



//   Fetch Data
    const getAllFacilites =async()=>{
      try {
        let response =await privateUserAxiosInstance.get(FACILITES_URLS.GET_FACILITES)
       
        setAllFacilites(response?.data?.data?.facilities)
        console.log("Facilites",response?.data?.data?.facilities); 
      } catch (error) {
        console.log(error);
        
      }
    }

    useEffect(()=>{
        getAllFacilites()
    },[])


  return (
    <>
    <Box className="content ">
      {/* <Box sx={{display:"flex",justifyContent:"space-between",mx:"30px"}}>
       <div>
       <p>Facilities Table Details</p>
       <p>You can check all details</p>
       </div>
       <Button sx={{backgroundColor:"#203FC7", height:"50px" }} variant="contained">Add New Facility</Button>
      </Box> */}
      <Box
  sx={(theme) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mx: "30px",
    gap: 2,
    flexDirection: "row", 

    [theme.breakpoints.down("md")]: {
      flexDirection: "column", 
      alignItems: "center",
      my:"30px"
    },
  })}
>
  <div>
    <p>Facilities Table Details</p>
    <p>You can check all details</p>
  </div>
  <Button
    sx={{
      backgroundColor: "#203FC7",
      height: "50px",
      mt: { xs: 1, sm: 0 }, 
    }}
    variant="contained"
  >
    Add New Facility
  </Button>
</Box>

<Box sx={{ overflowX: "auto" ,width:"auto"}}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Created At</StyledTableCell>
            <StyledTableCell>Updated At</StyledTableCell>
            <StyledTableCell>Created By</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allFacilites.map((Facilite) => (
            <StyledTableRow key={Facilite._id}>
              <StyledTableCell component="th" scope="row"> {Facilite._id} </StyledTableCell>
              <StyledTableCell component="th" scope="row"> {Facilite.name} </StyledTableCell>
              <StyledTableCell component="th" scope="row"> {Facilite.createdAt} </StyledTableCell>
              <StyledTableCell component="th" scope="row"> {Facilite.updatedAt} </StyledTableCell>
              <StyledTableCell component="th" scope="row"> {Facilite.createdBy.userName} </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </Box>
    
    </>
  )
}
