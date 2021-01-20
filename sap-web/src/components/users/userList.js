import React, {useEffect, useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios, { baseURL } from '../../utils/axios';
import Loading from '../../stores/loadingContainer';
import DeleteButton from "../funtions/deleteButton";
import Alert from "../Alert";


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

function createData(name) {
  return { name};
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function UserList() {
  
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [alertDelete, setAlertDelete] = useState(null);
  let loading = Loading.useContainer();

  useEffect(() => {
    loading.start();
    axios.get(baseURL+'/user')
      .then(response => {
        setUsers(response.data.data);
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
            <StyledTableCell align="center">Usuario</StyledTableCell>
            <StyledTableCell align="center">Nombre</StyledTableCell>
            <StyledTableCell align="center">Apellido</StyledTableCell>
            <StyledTableCell align="center">Correo</StyledTableCell>
            <StyledTableCell align="center">Opciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align="center" component="th" scope="row">
                {row.username}
              </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
                {row.firstName}
              </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
                {row.surName}
              </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
                {row.email}
              </StyledTableCell>
              <StyledTableCell align="center">
                <DeleteButton route={'/user/'+row.id} onDeleted={(deleted) => {
                  setUsers(users.filter(e => e.id !== row.id));
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
