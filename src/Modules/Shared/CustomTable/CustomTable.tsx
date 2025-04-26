import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Loading from '../Loading/Loading';
import NoData from '../NoData/NoData';
import noimg from '../../../assets/images/no-img.jpeg'
import { IRoomData } from '../../../Interfaces/RoomInterface';
import { CoulmnsLables } from '../../../Interfaces/CustomTableInterface';
import { IFacility } from '../../../Interfaces/FacilitesInterface';
import { IBookingData } from '../../../Interfaces/BookingData';
import { IUserData } from '../../../Interfaces/UserData';

import { Iad } from "../../../Interfaces/AdsInterface";


const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(226, 229, 235, 1)",
    color: "rgba(31, 38, 62, 1)",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));







function CustomTable<T extends IRoomData|IFacility|IBookingData|IUserData| Iad >({loading,columnsLables,booking,user,ads,data,facility,room,renderActions}
    :{
        loading:boolean,
        columnsLables:CoulmnsLables,
        data:T[],
        room?:boolean,
        facility?:boolean,
        ads?:boolean,
        booking?:boolean,
        user?:boolean,
        renderActions?: (row:T) => React.ReactNode; 
          
    }) {
  return (
    <TableContainer component={Paper} sx={{ mt: "30px" }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        {!loading && (
          <TableHead>
            <TableRow>
              {columnsLables.map((col, index) => (
                <StyledTableCell key={index} align={col.align}>
                  {col.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {loading ? (
            <StyledTableRow>
              <StyledTableCell colSpan={columnsLables.length} align="center">
                <Loading />
              </StyledTableCell>
            </StyledTableRow>
          ) : //   in case of rooms
          room && data.length > 0 ? (
            (data as IRoomData[]).map((room: IRoomData) => (
              <StyledTableRow key={room._id}>
                <StyledTableCell component="th" scope="row">
                  {room.roomNumber}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <img
                    src={room?.images[0] || noimg}
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "8px",
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">{room.price}</StyledTableCell>
                <StyledTableCell align="right">{room.capacity}</StyledTableCell>
                <StyledTableCell align="right">{room.discount}</StyledTableCell>
                <StyledTableCell align="right">
                  {room.facilities[0]?.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {renderActions ? renderActions(room as T) : null}
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : facility && data.length > 0 ? (
            (data as IFacility[]).map((facility: IFacility) => (
              <StyledTableRow key={facility._id}>
                <StyledTableCell component="th" scope="row">
                  {facility._id}
                </StyledTableCell>
                <StyledTableCell align="right">{facility.name}</StyledTableCell>
                <StyledTableCell align="right">
                  {facility.createdAt}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {facility.updatedAt}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {facility.createdBy.userName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {renderActions ? renderActions(facility as T) : null}
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : ads && data.length > 0 ? (
            (data as Iad[]).map((ad: Iad) => (
              <StyledTableRow key={ad._id}>
                <StyledTableCell align="left">
                  {ad.isActive ? "Active" : "Inactive"}
                </StyledTableCell>
                <StyledTableCell align="right">{ad.room.roomNumber}</StyledTableCell>
                <StyledTableCell align="right">{ad.room.capacity}</StyledTableCell>
                <StyledTableCell align="right">{ad.room.discount}</StyledTableCell>
                <StyledTableCell align="right">{ad.createdAt?.slice(0, 10)}</StyledTableCell>
                <StyledTableCell align="right">
                  {renderActions ? renderActions(ad as T) : null}
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : 

          //   in case of bookings
          booking&&data.length > 0 ? (
            (data as IBookingData[]).map((booking:IBookingData) => (
                <StyledTableRow key={booking._id}>
                  <StyledTableCell component="th" scope="row">{booking.room.roomNumber}</StyledTableCell>
                  <StyledTableCell align="right">{booking.totalPrice} EGP</StyledTableCell> 
                  <StyledTableCell align="right">{new Date(booking?.startDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}</StyledTableCell>
                  <StyledTableCell align="right">{new Date(booking?.endDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}</StyledTableCell>
                  <StyledTableCell align="right">{booking.user.userName}</StyledTableCell>
                  <StyledTableCell align="right">
                    {renderActions  ? renderActions(booking as T) : null}
                  </StyledTableCell>
                </StyledTableRow>
            ))
          ) : 

          //   in case of users
          user&&data.length > 0 ? (
            (data as IUserData[]).map((user:IUserData) => (
                <StyledTableRow key={user._id}>
                  <StyledTableCell component="th" scope="row">{user.userName}</StyledTableCell>
                  <StyledTableCell align="right">
                    <img src={user?.profileImage || noimg} style={{ width: '56px', height: '56px', borderRadius: '8px' }} />
                  </StyledTableCell>
                  <StyledTableCell align="right">{user.email}</StyledTableCell>
                  <StyledTableCell align="right">{user.phoneNumber}</StyledTableCell>
                  <StyledTableCell align="right">{user.country}</StyledTableCell>
                  <StyledTableCell align="right">{user.role}</StyledTableCell>
                  <StyledTableCell align="right">
        {renderActions  ? renderActions(user as T) : null}
      </StyledTableCell>

                          </StyledTableRow>
            ))
          ) : 
          
           
           
        //   add reset data
           (
            <StyledTableRow>
              <StyledTableCell colSpan={columnsLables.length} align="center">
                <NoData />
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomTable;
