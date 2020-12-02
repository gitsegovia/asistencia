import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button, FormHelperText } from "@material-ui/core";
import Alert from '../Alert';
import customAxios from '../../utils/axios';
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

export default function BussinessForm() {
  const [form, setForm] = useState({ firstName: '', direction: '', logo: ''})
  const [formError, setFormError] = useState({ firstName: '', direction: '', logo: ''})
  const [bussiness, setBussiness] = useState('');
  const [failed, setFailed] = useState(null);
  let loading = Loading.useContainer();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let submit = true;
    const errors = {
      firstName: (form.firstName!=='') ? '' : 'Ingrese su nombre', 
      direction:   (form.direction!=='')  ? '' : 'Ingrese direccion',
      logo:   (form.logo!=='') ? '' : 'Ingrese logo'
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
        const resp = await customAxios.post('/bussiness', data);  
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
      }
        finally{
          loading.stop();
        }
    } 
  }

  const resetForm = () => {
    setForm({
      firstName: '',
      direction: '',
      logo: ''
    });
    setFormError({
      firstName: '',
      direction: '',
      logo: ''
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
      <h1>Registro de Empresa</h1>
      <TextField
        id="firstName"
        name="firstName"
        label="Nombre"
        variant="outlined"
        size="small"
        required
        value={form.firstName}
        onChange={handleChange}
        error={form.firstName==='' && formError.firstName}
        helperText={formError.firstName}
      />
      <TextField
        id="direction"
        name="direction"
        label="Direccion"
        variant="outlined"
        size="small"
        required
        value={form.direction}
        onChange={handleChange}
        error={form.direction==='' && formError.direction}
        helperText={formError.direction}
      />
      <TextField
        id="logo"
        label="Logo"
        variant="outlined"
        size="small"
        name="logo"
        value={form.logo}
        onChange={handleChange}
        error={form.logo==='' && formError.logo}
        helperText={formError.logo}
      />
      
      <Button type="submit" onClick={(e) => handleSubmit(e)}>
        Submit
      </Button>
     </form>
    </React.Fragment>
  );
}
