import React from 'react'
import { paises } from './data.js';
import { TableCell, Table, TableContainer, TableHead, TableRow, TableBody, Paper, Button, styled, tableCellClasses} from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
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

export default function PaisList() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 700}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell>Pais</StyledTableCell>
            <StyledTableCell>Cantidad de habitantes</StyledTableCell>
            <StyledTableCell>Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paises.map((pais) =>(
          <StyledTableRow key={pais.id}>
            <StyledTableCell component="th" scope="row">{pais.id}</StyledTableCell>
            <StyledTableCell aligh="right">{pais.name}</StyledTableCell>
            <StyledTableCell aligh="right">{pais.population}</StyledTableCell>
            <StyledTableCell align='right'><Button>Edit</Button><Button>Delete</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  }