import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Loading from "../../stores/loadingContainer";
import axios, { baseURL } from "../../utils/axios";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";

import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Button} from "@material-ui/core";
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

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

function createData(name, permit) {
  return { name, permit };
}

export default function AssistsAA() {
  const classes = useStyles();
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [assistances, setAssistances] = useState([]);
  const [alertDelete, setAlertDelete] = useState(null);
  let loading = Loading.useContainer();
  const routeState = useHistory().location.state;

  useEffect(() => {
    loading.start();
    axios
      .get(`${baseURL}/assistances-of-date/${date}/${routeState.id}`)
      .then((response) => {
        setAssistances(response.data.assistances);
      })
      .catch((err) => console.log(err))
      .finally(() => loading.stop());
  }, [date]);

  return (
    <Grid container justify="space-around">
      <Grid sm={12} item>
        <TextField
          onChange={(v) => setDate(v.target.value)}
          id="date"
          defaultValue={date}
          label="Seleccione Fecha"
          type="date"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid sm={12} item spacing={["10", "0"]}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Hora</StyledTableCell>
                <StyledTableCell align="center">Tipo</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assistances.map((row, i) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {moment(row.createdAt).format("LT")}
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {i % 2 === 0 ? (
                      <>
                        <DirectionsWalkIcon />
                        <MeetingRoomIcon />
                      </>
                    ) : (
                      <>
                      <MeetingRoomIcon />
                        <DirectionsWalkIcon
                          style={{ transform: "rotate(-360deg) scaleX(-1)" }}
                          //style={{ color: green[500] }}
                        />
                      </>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid>
      <Link to={{pathname: "/listado-de-asistencias"}}>
                    <Button color="primary" variant="contained">Atras</Button>
                  </Link>
      </Grid>
    </Grid>
  );
}
