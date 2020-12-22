import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios, {baseURL} from '../../utils/axios';
import { Button } from "@material-ui/core";
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

export default function RolesForm() {
  const [form, setForm] = useState({ name: '', permit: ''})
  const [formError, setFormError] = useState({ name: '', permit: ''});
 const [bussiness, setBussiness] = useState('');
  const [failed, setFailed] = useState(null);
  let loading = Loading.useContainer();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    let submit = true;
    const errors = {
      name: (form.name!=='') ? '' : 'Ingrese su nombre',
      permit: (form.permit!=='' ? '' : 'Ingrese permiso')
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
        const resp = await axios.post(baseURL+'/roles', data);  
        if(resp.data.error){
          setFailed(resp.data.error ? "yes" : "no");
          console.log('Mensaje de error');
          return;
        } else { setFailed("no")}
        console.log('Registro exitoso');
        resetForm();
      } catch (error) {
        setFailed("yes");
        console.log('Error en conexion');
          return;
      } finally{
        setTimeout(() => {
          setFailed(null)
        }, 2000);
        loading.stop();
      }
    } 
  }

  const resetForm = () => {
    setForm({
      name: '',
      permit: ''
    });
    setFormError({
      name: '',
      permit: ''
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
      <h1>Registro de rol</h1>
      <TextField
        id="name"
        name="name"
        label="Rol"
        variant="outlined"
        size="small"
        required
        value={form.name}
        onChange={handleChange}
        error={form.name==='' && formError.name}
        helperText={formError.name}
      />
      <TextField
        id="permit"
        name="permit"
        label="Permiso"
        variant="outlined"
        size="small"
        required
        value={form.permit}
        onChange={handleChange}
        error={form.permit ==='' && formError.permit}
        helperText={formError.permit}
      />
      
      <Button type="submit" onClick={(e) => handleSubmit(e)}>
        Submit
      </Button>
     </form>
    </React.Fragment>
  );
}
