import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios, { baseURL }  from "../../utils/axios";
import DeleteButton from "../funtions/deleteButton";
import Loading from '../../stores/loadingContainer'; 

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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(
  firstName,
  surname,
  identification,
  bussiness,
  position,
  photo,
  status
) {
  return {
    firstName,
    surname,
    identification,
    bussiness,
    position,
    photo,
    status,
  };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function EmployeeList() {
  const classes = useStyles();
  const [employees, setEmployees] = useState([]);
  let loading = Loading.useContainer(); //Variable que guarda el Loading

  useEffect(() => {
    loading.start(); //Activa el loading
    axios
      .get(baseURL + "/employee")
      .then((response) => {
        setEmployees(response.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => loading.stop()); // Finaliza el loading
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Nombre</StyledTableCell>
            <StyledTableCell align="center">Apellido</StyledTableCell>
            <StyledTableCell align="center">Cedula</StyledTableCell>
            <StyledTableCell align="center">Empresa</StyledTableCell>
            <StyledTableCell align="center">Cargo</StyledTableCell>
            <StyledTableCell align="center">Foto</StyledTableCell>
            <StyledTableCell align="center">Estatus</StyledTableCell>
            <StyledTableCell align="center">Opciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.firstName}
              </StyledTableCell>
              <StyledTableCell align="center">{row.surname}</StyledTableCell>
              <StyledTableCell align="center">
                {row.identification}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.bussiness !== null ? row.bussiness.firstName : ""}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.charges !== null ? row.charges.name : ""}
              </StyledTableCell>
              <StyledTableCell align="center">{row.photo}</StyledTableCell>
              <StyledTableCell align="center">{row.status}</StyledTableCell>
              <StyledTableCell align="center">
                <DeleteButton route={'/employee/'+row.id} onDeleted={(deleted) => {
                  setEmployees(employees.filter(e => e.id !== row.id))
                }} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
