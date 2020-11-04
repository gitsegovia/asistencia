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

function createData(name, permit) {
  return { name, permit};
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function RolesList() {
  
  const classes = useStyles();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios.get(baseURL+'/roles')
      .then(response => {
        setRoles(response.data.data);
      })
      .catch(err => console.log(err));
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Roles</StyledTableCell>
            <StyledTableCell>Permiso</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roles.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.permit}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
