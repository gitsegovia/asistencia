import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import axios, { baseURL } from "../../utils/axios";
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@material-ui/core";
import Alert from "../Alert";
import Loading from "../../stores/loadingContainer";
import { useModules } from "../../hooks/useModules";

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

export default function PermitForm() {
  const [form, setForm] = useState({ name: "", moduleId: "" });
  const [formError, setFormError] = useState({ name: "", moduleId: "" });
  const [bussiness, setBussiness] = useState("");
  const [failed, setFailed] = useState(null);
  const [modules, modulesLoading] = useModules();

  let loading = Loading.useContainer();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let submit = true;
    const errors = {
      name: form.name !== "" ? "" : "Ingrese su nombre",
      module: form.moduleId !== "" ? "" : "Ingrese Modulo",
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
        const resp = await axios.post(baseURL + "/permit", data);
        if (resp.data.error) {
          setFailed(resp.data.error ? "yes" : "no");
          console.log("Mensaje de error");
          return;
        } else {
          setFailed("no");
        }
        console.log("Registro exitoso");
        resetForm();
      } catch (error) {
        setFailed("yes");
        console.log("Error en conexion");
        return;
      } finally {
        setTimeout(() => {
          setFailed(null);
        }, 2000);
        loading.stop();
      }
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      module: "",
    });
    setFormError({
      name: "",
      module: "",
    });
  };

  const classes = useStyles();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const moduleId = e.target.moduleId;
    setForm({
      ...form,
      [name]: value,
      [moduleId]: value,
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
        <h1>Registro de Permiso</h1>
        <TextField
          id="name"
          name="name"
          label="Permiso"
          variant="outlined"
          size="small"
          required
          value={form.name}
          onChange={handleChange}
          error={form.name === "" && formError.name}
          helperText={formError.name}
        />
        {
          <FormControl>
            <InputLabel id="label-module">Modulo</InputLabel>
            <Select
              labelId="label-module"
              id="moduleId"
              name="moduleId"
              size="small"
              disabled={modulesLoading}
              value={form.moduleId}
              onChange={handleChange}
              error={form.moduleId === "" && formError.moduleId}
            >
              {modules.map((module) => (
                <MenuItem value={module.id} key={module.id}>
                  {module.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error>{formError.moduleId}</FormHelperText>
          </FormControl>
        }
        <Button type="submit" onClick={(e) => handleSubmit(e)}>
          Submit
        </Button>
      </form>
    </React.Fragment>
  );
}
