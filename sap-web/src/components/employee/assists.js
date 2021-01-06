import React, { useEffect, useState } from "react";
import { withStyles, makeStyles, fade } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios, { baseURL } from "../../utils/axios";
import Loading from "../../stores/loadingContainer";
import InputBase from "@material-ui/core/InputBase";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

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

function createData(firstName, surname, identification, schedule) {
  return {
    firstName,
    surname,
    identification,
    schedule,
  };
}

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(5),
      width: "auto",
    },
  },
  inputRoot: {
    color: "inherit",
  },
}));

export default function EmployeeList() {
  const classes = useStyles();
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  let loading = Loading.useContainer(); //Variable que guarda el Loading

  useEffect(() => {
    loading.start(); //Activa el loading
    axios
      .get(baseURL + "/employee")
      .then((response) => {
        setEmployees(response.data.data);
        setFilteredEmployees(response.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => loading.stop()); // Finaliza el loading
  }, []);

  const search = (word) => {
    if (word !== "") {
      setFilteredEmployees(
        employees.filter((employee) => {
          const { firstName, surname, identification } = employee;
          const searchIn = `${firstName} ${surname} ${identification}`;
          return searchIn.toLowerCase().includes(word.toLowerCase());
        })
      );
    } else {
      setFilteredEmployees(employees);
    }
  };

  return (
    <>
      <div className={classes.search}>
        <InputBase
          placeholder="Buscar... 🔎"
          onKeyUp={(v) => search(v.target.value)}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Nombre</StyledTableCell>
              <StyledTableCell align="center">Apellido</StyledTableCell>
              <StyledTableCell align="center">Cedula</StyledTableCell>
              <StyledTableCell align="center">Horario</StyledTableCell>
              <StyledTableCell align="center">Asistencias</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="center" component="th" scope="row">
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
                  <Link to={{pathname: "/listado-de-assists", state: row}}>
                    <Button>Ver</Button>
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
