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
import Loading from '../../stores/loadingContainer';
import Alert from "../Alert";
import DeleteButton from "../funtions/deleteButton";



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

function createData(name, entryTime, departureTime, coment, ) {
  return { name, entryTime, departureTime, coment,};
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function SchedulesList() {
  
  const classes = useStyles();
  const [schedules, setSchedules] = useState([]);
  const [alertDelete, setAlertDelete] = useState(null);
  let loading = Loading.useContainer();

  useEffect(() => {
    loading.start();
    axios.get(baseURL+'/schedule')
      .then(response => {
        setSchedules(response.data.data);
      })
      .catch(err => console.log(err))
      .finally(() => loading.stop());
  }, [])

  return (
    <>
      {alertDelete === 'yes' && <Alert color="#038DEF">¡Registro Eliminado!</Alert>}
      {alertDelete === 'no' && <Alert color="#980d14">¡Error al Eliminar Registro!</Alert>}
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Horario</StyledTableCell>
            <StyledTableCell align="center">Hora de Entrada</StyledTableCell>
            <StyledTableCell align="center">Hora de Salida</StyledTableCell>
            <StyledTableCell align="center">Descripcion</StyledTableCell>
            <StyledTableCell align="center">Acciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schedules.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align="center" component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
                {row.entryTime}
              </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
                {row.departureTime}
              </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
                {row.coment}
              </StyledTableCell>
              <StyledTableCell align="center">
                <DeleteButton route={'/schedule/'+row.id} onDeleted={(deleted) => {
                  setSchedules(schedules.filter(e => e.id !== row.id));
                  setAlertDelete("yes");
                  setTimeout(() => {
                    setAlertDelete(null);
                  }, 1500)
                }} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
