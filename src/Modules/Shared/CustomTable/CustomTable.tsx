import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Loading from '../Loading/Loading';
import NoData from '../NoData/NoData';
import {  IColumnLabel } from '../../../Interfaces/CustomTableInterface';
import { BaseEntity } from '../../../Interfaces/BaseIntity';



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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function CustomTable<T extends BaseEntity>({
  loading,
  columnsLabels,
  data,
  renderActions,
}: {
  loading: boolean;
  columnsLabels: IColumnLabel<T>[];
  data: T[];
  renderActions?: (row: T) => React.ReactNode;
}) {
  return (
    <TableContainer component={Paper} sx={{ mt: "30px" }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        {!loading && (
          <TableHead>
            <TableRow>
              {columnsLabels.map((col, index) => (
                <StyledTableCell key={index} align={col.align}>
                  {col.label}
                </StyledTableCell>
              ))}
              {renderActions && (
                <StyledTableCell align="center">Actions</StyledTableCell>
              )}
            </TableRow>
          </TableHead>
        )}
<TableBody>
  {loading ? (
    <StyledTableRow>
      <StyledTableCell colSpan={columnsLabels.length} align="center">
        <Loading />
      </StyledTableCell>
    </StyledTableRow>
  ) : data.length > 0 ? (
    data.map((row, index) => (
      <StyledTableRow key={row._id || index}>
        {columnsLabels.map((col, colIndex) => (
          <StyledTableCell key={colIndex} align={col.align}>
            {col.accessor ? col.accessor(row) : null}
          </StyledTableCell>
        ))}
            {renderActions && (
        <StyledTableCell>
          {renderActions(row)}
        </StyledTableCell>
      )}
      </StyledTableRow>
    ))
  ) : (


        <StyledTableRow>
          <StyledTableCell colSpan={columnsLabels.length} align="center">
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
