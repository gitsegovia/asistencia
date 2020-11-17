import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { baseURL } from "../../utils/axios";
import { Button, FormHelperText } from "@material-ui/core";
import Alert from "../Alert";


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

export default function ScheduleForm() {
  const [form, setForm] = useState({
    name: "",
    entryTime: "",
    departureTime: "",
  });
  const [formError, setFormError] = useState({
    name: "",
    entryTime: "",
    departureTime: "",
  });
  const [bussiness, setBussiness] = useState("");
  const [failed, setFailed] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let submit = true;
    const errors = {
      name: form.name !== "" ? "" : "Ingrese su nombre",
      entryTime: form.entryTime !== "" ? "" : "Ingrese hora de entrada",
      departureTime: form.departureTime !== "" ? "" : "Ingrese hora de salida",
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
        const resp = await axios.post(baseURL + "/schedule", data);
        if (resp.data.error) {
          setFailed(resp.data.error ? "yes" : "no");
          console.log("Mensaje de error");
          return;
        }
        console.log("Registro exitoso");

        resetForm();
      } catch (error) {
        setFailed("yes");
        console.log("Error en conexion");
        return;
      }
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      entryTime: "",
      departureTime: "",
    });
    setFormError({
      name: "",
      entryTime: "",
      departureTime: "",
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
        <h1>Registro de Horario</h1>
        <TextField
          id="name"
          name="name"
          label="Horario"
          variant="outlined"
          size="small"
          required
          value={form.name}
          onChange={handleChange}
          error={form.name === "" && formError.name}
          helperText={formError.name}
        />
        <TextField
          id="entryTime"
          name="entryTime"
          label="Hora de Entrada"
          type="time"
          defaultValue="08:00"
          required
          onChange={handleChange}
          error={form.entryTime === "" && formError.entryTime}
          
        />
        <TextField
          id="departureTime"
          name="departureTime"
          label="Hora de Salida"
          type="time"
          defaultValue="02:30"
          required
          onChange={handleChange}
          error={form.departureTime === "" && formError.departureTime}
        />
        <Button type="submit" onClick={(e) => handleSubmit(e)}>
          Submit
        </Button>
      </form>
    </React.Fragment>
  );
}
