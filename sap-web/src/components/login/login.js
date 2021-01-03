import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import axios, { baseURL } from "../../utils/axios";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Alert from "../Alert";
import Loading from "../../stores/loadingContainer";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import UserStore from "../../stores/userState";


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  paper: {
    padding: 10,
  },
}));

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [formError, setFormError] = useState({ username: "", password: "" });
  const [failed, setFailed] = useState(null);
  const userState = UserStore.useContainer()
  let loading = Loading.useContainer();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let submit = true;
    const errors = {
      username: form.username !== "" ? "" : "Ingrese su Usuario",
      password: form.password !== "" ? "" : "Ingrese su Contraceña",
    };

    setFormError({
      ...formError,
      ...errors,
    });
    submit = !Object.keys(errors)
      .map((error) => errors[error] === "")
      .includes(false);

    let data = {
      ...form,
    };
    if (submit) {
      try {
        loading.start();
        const resp = await axios.post(baseURL + "/auth/login", data);
        if (resp.data.error) {
          setFailed(resp.data.error ? "yes" : "no");
          return;
        } else {
          setFailed("no");
        }
        resetForm();
        userState.login(resp.data.token);
        window.location.reload();
      } catch (error) {
        setFailed("yes");
        console.log("Error en conexion");
        return;
      } finally {
        setTimeout(() => {
          setFailed(null);
        }, 2000);
        loading.stop();
      }
    }
  };
  const resetForm = () => {
    setForm({
      username: "",
      password: "",
    });
    setFormError({
      username: "",
      password: "",
    });
  };

  const classes = useStyles();

  const handleChange = (e,field) => {
    const value = e.target.value;
    setForm({
      ...form,
      [field]: value,
    });
  };

  return (

    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
        <Typography variant="h4" noWrap>
            Control de Asistencias
          </Typography>
        </Toolbar>
      </AppBar>

      <div>
        {failed === "no" && <Alert color="#038DEF">¡Bienvenido!</Alert>}
        {failed === "yes" && <Alert color="#980d14">¡Error!</Alert>}
      </div>
      <Paper elevation={4} className={classes.paper}>
      <form
        onSubmit={handleSubmit}
        className={classes.root}
        noValidate
        autoComplete="off"
        style={{ backgroundColor: "#", height: "100vh" }}
      >
      <h1> Ingrese sus Datos </h1>
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField 
              id="username" 
              label="Usuario"  
              required 
              value= {form.username} 
              onChange= {e => handleChange(e, "username")} 
              error={form.username === "" && formError.username}
              helperText={formError.username}
              />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <VpnKeyIcon />
          </Grid>
          <Grid item>
            <TextField
              type="password"
              id="password"
              label="Contraseña"
              required 
              value= {form.password} 
              onChange= {e => handleChange(e, "password")} 
              error={form.password === "" && formError.password}
              helperText={formError.password}
            />
          </Grid>
        </Grid>
      </div>
      <div className={classes.margin}>
        <Button variant="contained" color="primary" className={classes.button}>
          Borrar
        </Button>

        <Button type="submit" onClick={(e) => handleSubmit(e)} variant="contained" color="primary" className={classes.button}>
          Enviar
        </Button>
      </div>
      </form>
      </Paper>
      
    </>
  );
}
