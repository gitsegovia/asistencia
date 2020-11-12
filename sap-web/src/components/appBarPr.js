import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { Switch, Route, Link } from "react-router-dom";
import EmployeeForm from "./employee/employeeForm";
import EmployeeList from "./employee/employeeList";
import BussinessList from "./bussiness/bussinessList";
import ChargesList from "./charges/chargesList";
import SchedulesList from "./schedules/schedulesList";
import RolesList from "./roles/rolesList";
import RolesForm from "./roles/rolesForm";

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
    marginTop: 30,
  },
}));

export default function AppBarPr() {
  const classes = useStyles();

  const links = [
    { title: "Empleados", path: "/listado-de-empleados" },
    { title: "Empresa", path: "/listado-de-empresas" },
    { title: "Cargos", path: "/listado-de-cargos" },
    { title: "Horarios", path: "/listado-de-horarios" },
    { title: "Roles", path: "/listado-de-roles" },

    { title: "Role **", path: "/creacion-de-roles" },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
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
            {links.map(({ title, path }, index) => (
              <Link to={path}>
                <ListItem button key={title}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={title} />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Switch>
          <Route exact path="/crear-empleado">
            <EmployeeForm />
          </Route>
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
        </Switch>
      </main>
    </div>
  );
}
