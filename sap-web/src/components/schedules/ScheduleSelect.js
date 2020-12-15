import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Button, FormHelperText } from "@material-ui/core";
import Alert from "../Alert";
import customAxios from "../../utils/axios";
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

export default function ScheduleSelect({onEmployeeChange}) {
  let loading = Loading.useContainer();

    const [form, setForm] = useState({
      employeeId: "",
      scheduleId: "",
      dayOfWeek: "",

  });
    const [formError, setFormError] = useState({
      employeeId: "",
      scheduleId: "",
      dayOfWeek: "",
    });

    const [dayOfWeek, setDayOfWeek] = React.useState('');
    const classes = useStyles();      
    const [renderEmployee, setRenderEmployee] = useState([]);
    const [renderSchedule, setRenderSchedule] = useState([]);
    const [failed, setFailed] = useState(null); //--- Maneja el error del form
    
    const handleSubmit = async (event)=> {
      event.preventDefault();
      console.log(form);
      let submit = true;
      const errors = {
        employeeId: form.employeeId !== "" ? "" : "Seleccione Empleado",
        scheduleId: form.scheduleId !== "" ? "" : "Selcciones Horario",
        dayOfWeek: form.dayOfWeek !== "" ? "" : "Seleccione Dia de la Semana",
      };
      setFormError({
        ...formError,
        ...errors,
      });

      submit = !Object.keys(errors)
        .map((error)=> errors[error] === "")
        .includes(false);

      let data = {
        ...form,
        
      }
      if (submit){
        console.log(form);
        try {
          loading.start();
          const resp = await customAxios.post("/employeeSchedule", data);
          if(resp.data.error){
            setFailed(resp.data.error ? "yes" : "no");
              console.log("Mensaje de error");
              return;
            } else {
              setFailed("no");
            }
            resetForm();
        } catch (error) {
          setFailed("yes");
          console.log("Error de conexion");
          return;
        } finally{
          setTimeout(()=> setFailed(null), 2000);
          loading.stop();

        }
      }
    }
      const resetForm = ()=>{
        setForm({
          employeeId: "",
          scheduleId: "",

        })
        setFormError({
          employeeId: "",
          scheduleId: "",
        })
      }
      async function consultaBDEmployee(){
        const response = await customAxios.get("/employee");
        console.log(response);
        let consulta = response.data;
        if (consulta.error === false){
            setRenderEmployee(consulta.data);
        }
      }
      async function consultaBDSchedule(){
        const response = await customAxios.get("/schedule");
        console.log(response);
        let consulta = response.data;
        if (consulta.error === false){
            setRenderSchedule(consulta.data);
        }
      }
    
      const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setForm({
          ...form,
          [name]: value,
        });
      };
    
    useEffect(() => {
      consultaBDEmployee();
      consultaBDSchedule();
    }, []);

    const handleChangeDay = (event) => {
      setForm({...form, dayOfWeek: event.target.value});
      setDayOfWeek(event.target.value);
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
              style={{ backgroundColor: "#" }}
            >
            <h1>Fijar Horario</h1>
            <FormControl>
            <InputLabel id="label-empresa">Empleado</InputLabel>
            <Select
              labelId="employeeId"
              id="employeeId"
              name="employeeId"
              size="small"
              value={form.employeeId}
              onChange={(e) => {
                handleChange(e);
                onEmployeeChange(e.target.value);
              }}
              error={form.employeeId === "" && formError.employeeId}
            >
              {renderEmployee.map((item) => (
                <MenuItem value={item.id} key={item.id}>
                  {item.firstName}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error>{formError.employeeId}</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
          <InputLabel id="label">Dia</InputLabel>
           <Select
            labelId="day"
            id="day"
            value={dayOfWeek}
            onChange={handleChangeDay}
        >
          <MenuItem value={0}>Lunes</MenuItem>
          <MenuItem value={1}>Martes</MenuItem>
          <MenuItem value={2}>Miercoles</MenuItem>
          <MenuItem value={3}>Jueves</MenuItem>
          <MenuItem value={4}>Viernes</MenuItem>
          <MenuItem value={5}>Sabado</MenuItem>
          <MenuItem value={6}>Domingo</MenuItem>
        </Select>
        </FormControl>

          <FormControl>
            <InputLabel id="label-empresa">Horario</InputLabel>
            <Select
              labelId="scheduleId"
              id="scheduleId"
              name="scheduleId"
              size="small"
              value={form.scheduleId}
              onChange={handleChange}
              error={form.scheduleId === "" && formError.scheduleId}
            >
              {renderSchedule.map((item) => (
                <MenuItem value={item.id} key={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error>{formError.employeeId}</FormHelperText>
          </FormControl>
          <Button htmlType="submit" onClick={(e) => handleSubmit(e)}>
          Submit
        </Button>
         </form>
         </React.Fragment> 
        
    )}