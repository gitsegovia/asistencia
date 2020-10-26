import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

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
    photo: ''
  })

  const handleSubmit = async (event) => {
    event.preventDefault();

    let submit = true;
    if(submit){
      console.log(form);
    }
  
  }

  const onFormChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setForm({
      ...form,
      [name]: value
    })
  }

  const classes = useStyles();
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <form
      onChange={(e) => onFormChange(e)}
      onSubmit={handleSubmit}
      className={classes.root}
      noValidate
      autoComplete="off"
      style={{ backgroundColor: "#cfe8fc", height: "100vh" }}
      
    >
      <h1>Registro de Empleado</h1>
      <TextField
        id="nombreEmpl"
        name="firstName"
        label="Nombre"
        variant="outlined"
        size="small"
        required
      />
      <TextField
        id="apellidoEmpl"
        name="surName"
        label="Apellido"
        variant="outlined"
        size="small"
        required
      />
      <TextField
        id="cedulaEmpl"
        label="Cedula"
        variant="outlined"
        size="small"
        name="identification"
      />
      <div />
      <TextField
        id="firmaEmpl"
        name="firm" 
        label="Firma"
        variant="outlined"
        size="small" />
      <TextField 
        id="fotoEmpl"
        name="photo" 
        label="Foto" 
        variant="outlined" 
        size="small" />

      <InputLabel 
      name="empresa"
      id="empresa">Empresa</InputLabel>
      <Select
        labelId="empresa"
        id="empresa1"
        value={age}
        onChange={handleChange}
        size="small"
      >
        <MenuItem value={10}>Gobernacion</MenuItem>
        <MenuItem value={20}>DGI</MenuItem>
      </Select>
      <div>
      <input type="submit" 
             value="Submit"
              />
      </div>

    </form>
  );
}
