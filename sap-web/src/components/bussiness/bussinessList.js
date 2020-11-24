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
  const [schedules, setSchedules] = useState([]);
  let loading = Loading.useContainer();

  useEffect(() => {
    loading.start();
    axios.get(baseURL+'/bussiness')
      .then(response => {
        setSchedules(response.data.data);
      })
      .catch(err => console.log(err))
      .finally(() => loading.stop());
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Empresa</StyledTableCell>
            <StyledTableCell>Dirección</StyledTableCell>
            <StyledTableCell>Logo</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schedules.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.firstName}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.direction}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.logo}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
