import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { baseURL } from '../../utils/axios';
import axios from 'axios';
import Loading from '../../stores/loadingContainer';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function PermitListA() {
  const classes = useStyles();
  const [permit, setPermit] = useState([]);
  let loading = Loading.useContainer();

  useEffect(() => {
    loading.start();
    axios.get(baseURL+'/module')
      .then(response => {
        let permisos = response.data.data; 
        permisos = permisos.map((permiso) => permiso.permits)
        console.log(permisos);
        setPermit(permisos)
      })
      .catch(err => console.log(err))
      .finally(()=> loading.stop());

  }, [])


  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {permit.map((permisos) => (
          <Grid item xs={12} spacing={3}>
            <div style={{display: 'flex', flexFlow: 'row'}} >
            {permisos.map((per) => 
              <Button variant="contained" color="primary">{per.name} </Button>
              )}
            </div>
          </Grid>

        ))}
        

      </Grid>
    </div>
  );
}
