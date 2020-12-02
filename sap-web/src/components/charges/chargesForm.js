import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from 'axios';
import {baseURL} from '../../utils/axios';
import { Button, FormHelperText } from "@material-ui/core";
import Alert from '../Alert';
import Loading from "../../stores/loadingContainer";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "20ch",

      formControl: {
        margin: theme.spacing(1),
        minWidth: 100,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      button: {
        margin: theme.spacing(1),
      },

    },
  },
}));

export default function ChargesForm() {
  const [form, setForm] = useState({ name: ''})
  const [formError, setFormError] = useState({ name: ''})
 const [bussiness, setBussiness] = useState('');
  const [failed, setFailed] = useState(null);
  let loading = Loading.useContainer();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let submit = true;
    const errors = {
      name: (form.name!=='') ? '' : 'Ingrese su nombre', 
    }

    setFormError({
      ...formError,
      ...errors
    });

    submit = !Object.keys(errors).map(error => errors[error] === '').includes(false);

    let data = {
      ...form 
    }
    if(submit){
      console.log(form);
      try {
        loading.start();
        const resp = await axios.post(baseURL+'/position', data);  
        if(resp.data.error){
          setFailed(resp.data.error ? "yes" : "no");
          console.log('Mensaje de error');
          return;
        }
        console.log('Registro exitoso');
 
        resetForm();
      } catch (error) {
        setFailed("yes");
        console.log('Error en conexion');
          return;
      } finally {
        loading.stop();
      }
    } 
  }

  const resetForm = () => {
    setForm({
      name: ''
    });
    setFormError({
      name: ''
    });
  }

  const classes = useStyles();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setForm({
      ...form,
      [name]: value
    })
  };


  return (
    <React.Fragment>
      <div>
        {failed === 'no' && <Alert color="#038DEF">¡Registro Exitoso!</Alert>}
        {failed === 'yes' && <Alert color="#980d14">¡Fallo el registro!</Alert>}
      </div>
     <form
       onSubmit={handleSubmit}
       className={classes.root}
       noValidate
       autoComplete="off"
       style={{ backgroundColor: "#", height: "100vh" }}
      
     >
      <h1>Registro de Cargo</h1>
      <TextField
        id="name"
        name="name"
        label="Cargo"
        variant="outlined"
        size="small"
        required
        value={form.name}
        onChange={handleChange}
        error={form.name==='' && formError.name}
        helperText={formError.name}
      />
      
      <Button type="submit" onClick={(e) => handleSubmit(e)}>
        Submit
      </Button>
     </form>
    </React.Fragment>
  );
}
