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
import Alert from '../Alert';
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

function createData(firstName, direction, logo) {
  return {firstName, direction, logo};
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function BussinessList() {
  
  const classes = useStyles();
  const [bussiness, setBussiness] = useState([]);
  const [alertDelete, setAlertDelete] = useState(null);
  let loading = Loading.useContainer();

  useEffect(() => {
    loading.start();
    axios.get(baseURL+'/bussiness')
      .then(response => {
        setBussiness(response.data.data);
      })
      .catch(err => console.log(err))
      .finally(() => loading.stop());
  }, []);

  return (
    <>
    {alertDelete === 'yes' && <Alert color="#038DEF">¡Registro Eliminado!</Alert>}
      {alertDelete === 'no' && <Alert color="#980d14">¡Error al Eliminar Registro!</Alert>}
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow >
            <StyledTableCell align="center">Empresa</StyledTableCell>
            <StyledTableCell align="center">Dirección</StyledTableCell>
            <StyledTableCell align="center">Logo</StyledTableCell>
            <StyledTableCell align="center">Acciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bussiness.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align="center" component="th" scope="row">
                {row.firstName}
              </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
                {row.direction}
              </StyledTableCell>
              <StyledTableCell align="center" component="th" scope="row">
                {row.logo}
              </StyledTableCell>
              <StyledTableCell align="center">
                <DeleteButton route={'/bussiness/'+row.id} onDeleted={(deleted) => {
                  setBussiness(bussiness.filter(e => e.id !== row.id));
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
