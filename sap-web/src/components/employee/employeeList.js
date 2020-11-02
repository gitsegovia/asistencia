import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { baseURL } from '../../utils/axios';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(firstName, surname, identification, bussiness, photo, status) {
  return { firstName, surname, identification, bussiness, photo, status};
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function EmployeeList() {
  
  const classes = useStyles();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get(baseURL+'/employee')
      .then(response => {
        setEmployees(response.data.data);
      })
      .catch(err => console.log(err));
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell align="right">Apellido</StyledTableCell>
            <StyledTableCell align="right">Cedula</StyledTableCell>
            <StyledTableCell align="right">Empresa</StyledTableCell>
            <StyledTableCell align="right">Cargo</StyledTableCell>
            <StyledTableCell align="right">Foto</StyledTableCell>
            <StyledTableCell align="right">Estatus</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.firstName}
              </StyledTableCell>
              <StyledTableCell align="right">{row.surname}</StyledTableCell>
              <StyledTableCell align="right">{row.identification}</StyledTableCell>
              <StyledTableCell align="right">{row.bussiness}</StyledTableCell>
              <StyledTableCell align="right">{row.position}</StyledTableCell>
              <StyledTableCell align="right">{row.photo}</StyledTableCell>
              <StyledTableCell align="right">{row.status}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
