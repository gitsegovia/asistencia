import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import { ListAltOutlined, AddBox } from "@material-ui/icons/";
import { Switch, Route, Link } from "react-router-dom";
import EmployeeForm from "./employee/employeeForm";
import EmployeeList from "./employee/employeeList";
import BussinessList from "./bussiness/bussinessList";
import BussinessForm from "./bussiness/bussinessForm";
import ChargesList from "./charges/chargesList";
import ChargesForm from "./charges/chargesForm";
import SchedulesList from "./schedules/schedulesList";
import SchedulesForm  from "./schedules/scheduleForm";
import RolesList from "./roles/rolesList";
import RolesForm from "./roles/rolesForm";
import BtnDesplegable from "./BtnDesplegable";
import { Paper, IconButton } from "@material-ui/core";
import Loading from "../stores/loadingContainer";
import LinearProgress from '@material-ui/core/LinearProgress';




const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    margin: "60px 10px 0px 10px",
  },
  paper: {
    padding: 10
  }
}));

export default function AppBarPr() {

  const [open, setOpen] = React.useState(false);
  let loading = Loading.useContainer();
  
  const handleClick = () => {
    setOpen(!open);
  };

  const classes = useStyles();

  const links = [
    { title: "Empleados", path: "#", icon: <MailIcon/>, children: [
      { title: "Listar", path: "/listado-de-empleados", icon: <ListAltOutlined/>, children: []},
      { title: "Crear", path: "/creacion-de-empleados", icon: <AddBox />, children: []},
    ]},        
    { title: "Empresa", path: "#", icon: <MailIcon/>, children: [
      { title: "Listar", path: "/listado-de-empresas", icon: <ListAltOutlined/>, children: [] },
      { title: "Crear", path: "/creacion-de-empresas", icon: <AddBox />, children: [] },
    ] },
    { title: "Cargos", path: "#", icon: <MailIcon/>, children: [
      { title: "Listar", path: "/listado-de-cargos", icon: <ListAltOutlined/>, children: []},
      { title: "Crear", path: "/creacion-de-cargos", icon: <AddBox />, children: []},
    ]},
    { title: "Horarios", path: "#", icon: <MailIcon/>, children: [
      { title: "Listar", path: "/listado-de-horarios", icon: <ListAltOutlined/>, children: []},
      { title: "Crear", path: "/creacion-de-horarios", icon: <AddBox />, children: []},
    ]},
    { title: 'Roles', path: '#', icon: <MailIcon/>, children: [
      { title: "Listar", path: "/listado-de-roles", icon: <ListAltOutlined/>, children: []},
      { title: "Crear", path: "/creacion-de-roles", icon: <AddBox />, children: []},
    ]}
  ];

const drawItems = (items, style=null) => {
  return (
    items.map(({ title, path, children, icon }, index) => children.length > 0 ? 
    <BtnDesplegable title={title} icon={icon}>
      {drawItems(children, {marginLeft: 25})}
    </BtnDesplegable>
    :
    (
      <Link to={path}>
        <ListItem style={style} button key={title}>
          <ListItemIcon>
              {icon}
          </ListItemIcon>
          <ListItemText primary={title} />
        </ListItem>
      </Link>
    ))
  )
}

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton />
          <Typography variant="h4" noWrap>
            Control de Asistencias
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {drawItems(links)}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        {loading.loading && <LinearProgress /> }
        <Paper elevation={4} className={classes.paper}>
        <Switch>
          <Route exact path="/listado-de-empleados">
            <EmployeeList />
         </Route>
          <Route exact path="/listado-de-empresas">
            <BussinessList />
          </Route>
          <Route exact path="/listado-de-cargos">
            <ChargesList />
          </Route>
          <Route exact path="/listado-de-horarios">
            <SchedulesList />
          </Route>
          <Route exact path="/listado-de-roles">
            <RolesList />
          </Route>
          <Route exact path="/creacion-de-roles">
            <RolesForm />
          </Route>
          <Route exact path="/creacion-de-empleados">
            <EmployeeForm />
          </Route>
          <Route exact path="/creacion-de-empresas">
            <BussinessForm />
          </Route>
          <Route exact path="/creacion-de-cargos">
            <ChargesForm />
            </Route>
          <Route exact path="/creacion-de-horarios">
            <SchedulesForm />
          </Route>
        </Switch>
        </Paper>
      </main>
    </div>
  );
}
