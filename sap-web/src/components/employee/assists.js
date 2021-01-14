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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Button} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useScheduleByEmployee } from "../../hooks/useScheduleByEmployee";


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
  headEmployee:{
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  }
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

export default function Assists() {
  const classes = useStyles();
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [assistances, setAssistances] = useState([]);
  const [alertDelete, setAlertDelete] = useState(null);
  const [schedulesOfDay, setSchedulesOfDay] = useState([])
  let loading = Loading.useContainer();
  const routeState = useHistory().location.state;
  const schedules = useScheduleByEmployee(routeState.id);
  
  useEffect(() => {
    loading.start();
    axios
      .get(`${baseURL}/assistances-of-date/${date}/${routeState.id}`)
      .then((response) => {
        setAssistances(response.data.assistances);
      })
      .catch((err) => console.log(err))
      .finally(() => loading.stop());
      const sod = getScheduleOfDay(moment(date).day(), schedules)
      setSchedulesOfDay(sod)
  }, [date]);

  return (
    <Grid container justify="space-around">
      <Grid sm={12} item>
            <Link to={{pathname: "/listado-de-empleados"}}>
              <Button color="primary" variant="contained" ><ArrowBackIcon/></Button>
            </Link>
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
      <Grid sm={6} item>
          Empleado: {routeState.firstName} {routeState.surname}
      </Grid>
      <Grid sm={6} item>
          Horarios: {schedulesOfDay.map(sod => <span>{sod.schedules.name} ({sod.schedules.entryTime} - {sod.schedules.departureTime})</span>)}
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
                        <DirectionsWalkIcon 
                        style={{ color: "green" }}
                        />
                        <MeetingRoomIcon style={{ transform: "scaleX(-1)", color: "green" }}/>
                      </>
                    ) : (
                      <>
                      <MeetingRoomIcon style={{ transform: "scaleX(-1)", color: "red" }}/>
                        <DirectionsWalkIcon
                          style={{ transform: "scaleX(-1)", color: "red" }}
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
    </Grid>
  );
}

function getScheduleOfDay(dayOfWeek, schedules) {
  return schedules.filter(schedule => schedule.dayOfWeek === dayOfWeek);
}