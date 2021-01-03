import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import QrReader from 'react-qr-reader'
import successAlert from '../../assets/success-alert.mp3';
import Loading from '../../stores/loadingContainer';
import axios from '../../utils/axios';
import Alert from "../Alert";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function InputWithIcon() {

  const classes = useStyles();
  const succesAudio = new Audio(successAlert);
  const [currentScan, setCurrentScan] = useState();
  let loading = Loading.useContainer();
  const [failed, setFailed] = useState(null);
  const [identification, setIdentification] = useState();

  const sign = () => {
    loading.start();
    axios.get(`/sign/${identification}`)
      .then(resp => {
        console.log(resp)
        setFailed(resp.data.error ? "yes" : "no");
        setIdentification("");
      })
      .catch(e => {
        console.log(e)
        setFailed("yes");
      }).finally(() => {
        setTimeout(() => setFailed(null), 2000);
        loading.stop();
      })
  }

  const handleScan = (scan) => {
    if(scan) {
      succesAudio.play();
      const rxCedula = new RegExp(/([V])\w+/g);
      const matches = rxCedula.exec(scan);
      if(matches.length === 0) {
        //
      }
      setCurrentScan(matches[0]);
      setTimeout(() => {
        setCurrentScan(undefined);
      }, 5000)
    }
  }

  return (
    <>
      <div>
        {failed === "no" && <Alert color="#038DEF">¡Marcado Exitoso!</Alert>}
        {failed === "yes" && <Alert color="#980d14">¡Fallo el Marcado!</Alert>}
      </div>
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField 
              onChange={(v) => setIdentification(v.target.value)}
              value={identification}
              id="identification" 
              label="Ingrese su identificacion" 
              type="number"
              />
          </Grid>
        </Grid>
      </div>
      <div className={classes.margin}>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => sign()}
      >
        Enviar
      </Button>
      {!currentScan ? <QrReader
          delay={200}
          onError={e => console.log(e)}
          onScan={handleScan}
          style={{ width: '75%' }}
          resolution={1920}
          showViewFinder
          facingMode="environment"
        /> : `CEDULA ESCANEADA ${currentScan}`}
      </div>
    </>
  );
}
