import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import VpnKeyIcon from '@material-ui/icons/VpnKey';


const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
      },    
  }));

export default function Login() {
    const classes = useStyles();

    return (
        <>
        <h1> Ingrese sus Datos </h1>
        <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label="Usuario" />
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <VpnKeyIcon />
          </Grid>
          <Grid item>
            <TextField type= "password" id="input-with-icon-grid" label="Contraseña" />
          </Grid>
        </Grid>
      </div>
      <div className={classes.margin}>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Borrar
      </Button>
      
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Enviar
      </Button>
      </div>
      </>
    );

}