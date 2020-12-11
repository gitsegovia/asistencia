import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import QrReader from 'react-qr-reader'
import successAlert from '../../assets/success-alert.mp3';

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
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField id="identification" label="Ingrese su identificacion" />
          </Grid>
        </Grid>
      </div>
      <div className={classes.margin}>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
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
