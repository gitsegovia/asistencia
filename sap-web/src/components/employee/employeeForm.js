import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import axios from 'axios';
import {baseURL} from '../../utils/axios';
import { Button, FormHelperText } from "@material-ui/core";
import Alert from '../Alert';

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

export default function EmployeeForm() {
  const [form, setForm] = useState({ firstName: '', surname: '', identification: '', firm: '', photo: '', bussiness: ''})
  const [formError, setFormError] = useState({ firstName: '', surname: '', identification: '', firm: '', photo: '', bussiness: ''})
  const [bussiness, setBussiness] = useState('');
  const [renderBussiness, setRenderBussiness] = useState([]);
  const [failed, setFailed] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let submit = true;
    const errors = {
      firstName: (form.firstName!=='') ? '' : 'Ingrese su nombre', 
      surName:   (form.surname!=='')  ? '' : 'Ingrese su apellido',
      identification:   (form.identification!=='') ? '' : 'Ingrese su cedula',
      firm: (form.firm !== '') ? '' : 'Ingrese firma',
      photo: (form.photo !== '') ? '' : 'Ingrese foto',
      bussiness: form.bussiness !== '' ? '' : 'Seleccione la empresa'
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
        const resp = await axios.post(baseURL+'/employee', data);  
        if(resp.data.error){
          setFailed(resp.data.error ? "yes" : "no");
          console.log('Mensaje de error');
          return;
        }
        console.log('Mensaje de guardo');
 
        resetForm();
      } catch (error) {
        setFailed("yes");
        console.log('Error en conexion');
          return;
      }
    } 
  }

  const resetForm = () => {
    setForm({
      firstName: '',
      surname: '',
      identification: '',
      firm: '',
      photo: '',
      bussiness: ''   
    });
    setFormError({
      firstName: '',
      surname: '',
      identification: '',
      firm: '',
      photo: '',   
      bussiness: ''
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

  const handleChangeSelect = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setBussiness(value);
  };

  async function consultaBasedatos(){
    const response = await axios.get(baseURL+"/bussiness");
    console.log(response);
    let consulta = response.data;
    if(consulta.error===false){
      setRenderBussiness(consulta.data);
    }
  }

  useEffect(() => {
    consultaBasedatos();
  }, [])

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
       style={{ backgroundColor: "#cfe8fc", height: "100vh" }}
      
     >
      <h1>Registro de Empleado</h1>
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
        id="surname"
        name="surname"
        label="Apellido"
        variant="outlined"
        size="small"
        required
        value={form.surname}
        onChange={handleChange}
        error={form.surname==='' && formError.surname}
        helperText={formError.surname}
      />
      <TextField
        id="identification"
        label="Cedula"
        variant="outlined"
        size="small"
        name="identification"
        value={form.identification}
        onChange={handleChange}
        error={form.identification==='' && formError.identification}
        helperText={formError.identification}
      />
      <div />
      <TextField
        id="firm"
        name="firm" 
        label="Firma"
        variant="outlined"
        size="small"
        value={form.firm}
        onChange={handleChange}
        error={form.firm === '' && formError.firm}
        helperText={formError.firm}
        />

<FormControl >
      <TextField 
        id="photo"
        name="photo" 
        label="Foto" 
        variant="outlined" 
        size="small" 
        value={form.photo}
        onChange={handleChange}
        error={form.photo === '' && formError.photo}
        helperText={formError.photo}
        />
        </FormControl>

      <FormControl >
        <InputLabel id="label-empresa">Empresa</InputLabel>
      <Select
        labelId="label-empresa"
        id="bussiness"        
        name="bussiness"
        size="small"
        value={form.bussiness}
        onChange={handleChange}
        error={form.bussiness === '' && formError.bussiness}
      >
        {renderBussiness.map((item)=>(
          <MenuItem value={item.id} key={item.id}>{item.firstName}</MenuItem>
        ))}        
      </Select>
        <FormHelperText error>{formError.bussiness}</FormHelperText>
      </FormControl>
      <Button type="submit" onClick={(e) => handleSubmit(e)}>
        Submit
      </Button>
     </form>
    </React.Fragment>
  );
}
