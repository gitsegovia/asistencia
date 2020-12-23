import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Button, FormHelperText } from "@material-ui/core";
import Alert from "../Alert";
import customAxios from "../../utils/axios";
import Loading from "../../stores/loadingContainer";
import SingnatureCanvas from "react-signature-canvas";


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

export default function UserForm() {
  const [form, setForm] = useState({
    firstName: "",
    surName: "",
    username: "",
    password: "",
    email: "",
    bussinessId: "",
  });
  const [formError, setFormError] = useState({
    firstName: "",
    surName: "",
    username: "",
    password: "",
    email: "",
    bussinessId: "",
  });

  let sign = null;

  const [renderBussiness, setRenderBussiness] = useState([]);//--Almacena la consultad e BD
  const [failed, setFailed] = useState(null); //--- Maneja el error del form
  let loading = Loading.useContainer();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let submit = true;
    const errors = {
      firstName: form.firstName !== "" ? "" : "Ingrese su nombre",
      surName: form.surName !== "" ? "" : "Ingrese su apellido",
      username: form.username !== "" ? '' : "Ingrese su Usuario",
      password: form.password !== "" ? "" : "Ingrese su contraseña",
      bussinessId: form.bussinessId !== "" ? "" : "Seleccione la empresa",
      email: form.email !== "" ? "" : "Ingrese su Correo",

    };

    setFormError({
      ...formError,
      ...errors,
    });

    submit = !Object.keys(errors)
      .map((error) => errors[error] === "")
      .includes(false);

    let data = {
      ...form,
    };
    if (submit) {
      console.log(form);
      try {
        loading.start();
        const resp = await customAxios.post("/users", data);
        if (resp.data.error) {
          setFailed(resp.data.error ? "yes" : "no");
          console.log("Mensaje de error");
          return;
        } else {
          setFailed("no");
        }
        resetForm();
      } catch (error) {
        setFailed("yes");
        console.log("Error en conexion");
        return;
      } finally {
        setTimeout(() => setFailed(null), 2000);
        loading.stop();
      }
    }
  };

  const resetForm = () => {
    setForm({
        firstName: "",
        surName: "",
        username: "",
        password: "",
        email: "",
        bussinessId: "",
    });
    
    setFormError({
        firstName: "",
        surName: "",
        username: "",
        password: "",
        email: "",
        bussinessId: "",
    });
  };

  const classes = useStyles();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setForm({
      ...form,
      [name]: value,
    });
  };

  async function consultaBasedatos() {
    const response = await customAxios.get("/bussiness");
    console.log(response);
    let consulta = response.data;
    if (consulta.error === false) {
      setRenderBussiness(consulta.data);
    }
  }

  useEffect(() => {
    //consultaBasedatos();
  }, []);

  return (
    <React.Fragment>
      <div>
        {failed === "no" && <Alert color="#038DEF">¡Registro Exitoso!</Alert>}
        {failed === "yes" && <Alert color="#980d14">¡Fallo el registro!</Alert>}
      </div>
      <form
        onSubmit={handleSubmit}
        className={classes.root}
        noValidate
        autoComplete="off"
        style={{ backgroundColor: "#", height: "100vh" }}
      >
        <h1>Registro de Usuario</h1>
        <TextField
          id="firstName"
          name="firstName"
          label="Nombre"
          variant="outlined"
          size="small"
          required
          value={form.firstName}
          onChange={handleChange}
          error={form.firstName === "" && formError.firstName}
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
          error={form.surname === "" && formError.surname}
          helperText={formError.surname}
        />
        <div />
        <div>
            <TextField
                id= "username"
                name= "username"
                label= "Usuario"
                variant= "outlined"
                size="small"
                required
                value = {form.username}
                onChange={handleChange}
                error={form.username === "" && formError.username}
                helperText={formError.username}
            />
            <TextField 
                id= "password"
                name= "password"
                label= "Contraseña"
                tipe= "password"
                variant= "outlined"
                size="small"
                required
                value = {form.password}
                onChange={handleChange}
                error={form.password === "" && formError.password}
                helperText={formError.password}
            />
            </div>
        <TextField 
            id= "email"
            name= "email"
            label= "Correo"
            tipe= "email"
            variant= "outlined"
            size="small"
            required
            value = {form.email}
            onChange={handleChange}
            error={form.email === "" && formError.email}
            helperText={formError.email}
            />
       
        <FormControl>
          <InputLabel id="label-empresa">Empresa</InputLabel>
          <Select
            labelId="label-empresa"
            id="bussinessId"
            name="bussinessId"
            size="small"
            value={form.bussinessId}
            onChange={handleChange}
            error={form.bussinessId === "" && formError.bussinessId}
          >
            {renderBussiness.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.firstName}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error>{formError.bussinessId}</FormHelperText>
        </FormControl>
        <div>
          <Button >
            Borrar
          </Button>
        </div>
        <Button type="submit" onClick={(e) => handleSubmit(e)}>
          Guardar
        </Button>
      </form>
    </React.Fragment>
  );
}
