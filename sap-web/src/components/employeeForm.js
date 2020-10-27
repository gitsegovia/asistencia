import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import axios from 'axios';

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
  const [form, setForm] = useState({
    firstName: '',
    surName: '',
    identification: '',
    firm: '',
    photo: '',   
  })
  const [formError, setFormError] = useState({
    firstName: '',
    surName: '',
    identification: '',
    firm: '',
    photo: '',   
  })

  const [bussiness, setBusssiness] = useState('');
  const [renderBussiness, setRenderBussiness] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let submit = true;

    if(form.firstName===''){
      setFormError({
        ...formError,
        firstName: 'Ingrese su nombre'
      });
      submit=false;
    }
    if(form.surname===''){
      setFormError({
        ...formError,
        surName: 'Ingrese su apellido'
      });
      submit=false;
    }

    let data = {
      ...form,
      bussiness
    }
    if(submit){
      console.log(form);
      try {
        const resp = await axios.post('http://locahost:3002/employee', data);  
        if(resp.data.error){
          console.log('mensaje de error');
          return;
        }
        console.log('mensaje de guardo');
      } catch (error) {
        console.log('Error en conexion');
          return;
      }
    }
    setForm({
      firstName: '',
      surName: '',
      identification: '',
      firm: '',
      photo: '',   
    });
    setFormError({
      firstName: '',
      surName: '',
      identification: '',
      firm: '',
      photo: '',   
    });
  }

  const classes = useStyles();

  const handleChange = (e) => {
    console.log(form);
    const value = e.target.value;
    const name = e.target.name;
    console.log(name, value);
    setForm({
      ...form,
      [name]: value
    })
  };

  const handleChangeSelect = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    console.log(name, value);
    setBusssiness(value);
  };

  async function consultaBasedatos(){
    const response = await axios.get('http://localhost:3002/bussiness');
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
        value={form.firstName}
        onChange={handleChange}
        required
        error={formError.firstName!=='' ? true : false}
        helperText={formError.firstName}
      />
      <TextField
        id="surName"
        name="surName"
        label="Apellido"
        variant="outlined"
        size="small"
        required
        value={form.surname}
        onChange={handleChange}
        error={formError.surName !== '' ? true : false}
        helperText={formError.surName}
      />
      <TextField
        id="identification"
        label="Cedula"
        variant="outlined"
        size="small"
        name="identification"
        value={form.identification}
        onChange={handleChange}
        error={formError.identification !== '' ? true : false}
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
        error={formError.firm !== '' ? true : false}
        helperText={formError.firm}
        />

<FormControl >
      <TextField 
        id="photo"
        name="photo" 
        label="Foto" 
        variant="outlined" 
        size="small" />
        </FormControl>
        <FormControl >
        <InputLabel id="label-empresa">Empresa</InputLabel>
      <Select
        labelId="label-empresa"
        id="bussiness"        
        name="bussiness"
        size="small"
        value={bussiness}
        onChange={handleChangeSelect}
      >
        {renderBussiness.map((item)=>(
          <MenuItem value={item.id}>{item.firstName}</MenuItem>
        ))}        
      </Select>
      </FormControl>
      <div>
      <input type="submit" 
             value="Submit"
              />
      </div>
     </form>
    </React.Fragment>
  );
}
