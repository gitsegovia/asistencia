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
import Alert from "../Alert";
import { fade, InputBase } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import AssignmentIcon from '@material-ui/icons/Assignment';
import ScheduleIcon from '@material-ui/icons/Schedule';
import EditIcon from '@material-ui/icons/Edit';

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
  status,
  schedule,
) {
  return {
    firstName,
    surname,
    identification,
    bussiness,
    position,
    photo,
    status,
    schedule,
  };
}

const useStyles = makeStyles((theme)=>({
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
  const [alertDelete, setAlertDelete] = useState(null);
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
      {alertDelete === 'yes' && <Alert color="#038DEF">¡Registro Eliminado!</Alert>}
      {alertDelete === 'no' && <Alert color="#980d14">¡Error al Eliminar Registro!</Alert>}
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
            <StyledTableCell align="center">Empresa</StyledTableCell>
            <StyledTableCell align="center">Cargo</StyledTableCell>
            <StyledTableCell align="center">Foto</StyledTableCell>
            <StyledTableCell align="center">Estatus</StyledTableCell>
            <StyledTableCell align="center">Acciones</StyledTableCell>
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
                {row.charges !== null ? row.charges.name : ""}
              </StyledTableCell>
              <StyledTableCell align="center">{row.photo}</StyledTableCell>
              <StyledTableCell align="center">{row.status}</StyledTableCell>
              <StyledTableCell align="center">
                <div style={{display: 'flex', flexFlow: 'row' , alignContent: 'center', boxSizing: 'content-box'}}>
                  
                  <DeleteButton route={'/employee/'+row.id} onDeleted={(deleted) => {
                    setEmployees(employees.filter(e => e.id !== row.id));
                    setAlertDelete("yes");
                    setTimeout(() => {
                      setAlertDelete(null);
                    }, 1500)
                  }} />

                  <Link to={{pathname: "/listado-de-asistencia", state: row}}>
                    <Button><AssignmentIcon/></Button>
                  </Link>

                  <Link to={{pathname: "/seleccion-horarios", state: {...row, hidden: false}  }}>
                    <Button><ScheduleIcon/></Button>
                  </Link>

                  <Link to={{pathname: "/edicion-de-empleados", state: row}}>
                    <Button><EditIcon/></Button>
                  </Link>

                </div>
                
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table> 
    </TableContainer>
    </>
  );
}
