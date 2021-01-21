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
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ListItemText from "@material-ui/core/ListItemText";
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import HomeIcon from '@material-ui/icons/Home';
import { ListAltOutlined, AddBox, Add, ExitToAppOutlined } from "@material-ui/icons/";
import ScheduleIcon from '@material-ui/icons/Schedule';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import BusinessIcon from '@material-ui/icons/Business';
import GroupIcon from '@material-ui/icons/Group';
import { Switch, Route, Link } from "react-router-dom";
import EmployeeForm from "./employee/employeeForm";
import EmployeeList from "./employee/employeeList";
import Assists from "./employee/assists";
import BussinessList from "./bussiness/bussinessList";
import BussinessForm from "./bussiness/bussinessForm";
import ChargesList from "./charges/chargesList";
import ChargesForm from "./charges/chargesForm";
import SchedulesList from "./schedules/schedulesList";
import SchedulesForm from "./schedules/scheduleForm";
import RolesList from "./roles/rolesList";
import RolesForm from "./roles/rolesForm";
import BtnDesplegable from "./BtnDesplegable";
import { Paper, IconButton } from "@material-ui/core";
import Loading from "../stores/loadingContainer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Identification from "./principal/identification";
import ScheduleSelect from "./schedules/ScheduleSelect";
import EmployeeSchedule from "./schedules/employeeSchedule";
import Login from "./login/login";
import UserList from "./users/userList"
import UserForm from "./users/userForm"
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import UserStore from "../stores/userState";
import PermitForm from "./permit/permitForm";
import PermitList from "./permit/permitList";
import PermitListA from "./permit/permtListA";


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
    padding: 10,
  },
}));

export default function AppBarPr() {
  const [open, setOpen] = React.useState(false);
  let loading = Loading.useContainer();
  const userState = UserStore.useContainer();

  const handleClick = () => {
    setOpen(!open);
  };

  const classes = useStyles();

  const links = [
    {
      title: "Entrada",
      path: "#",
      icon: <FingerprintIcon />,
      children: [
        {
          title: "Marcar",
          path: "identification",
          icon: <ListAltOutlined />,
          children: [],
        },
      ],
    },
    {
      title: "Empleados",
      path: "#",
      icon: <GroupIcon />,
      children: [
        {
          title: "Listar",
          path: "/listado-de-empleados",
          icon: <ListAltOutlined />,
          children: [],
        },
        {
          title: "Crear",
          path: "/creacion-de-empleados",
          icon: <AddBox />,
          children: [],
        },
      ],
    },
    {
      title: "Empresa",
      path: "#",
      icon: <BusinessIcon />,
      children: [
        {
          title: "Listar",
          path: "/listado-de-empresas",
          icon: <ListAltOutlined />,
          children: [],
        },
        {
          title: "Crear",
          path: "/creacion-de-empresas",
          icon: <AddBox />,
          children: [],
        },
      ],
    },
    {
      title: "Cargos",
      path: "#",
      icon: <AssignmentIndIcon />,
      children: [
        {
          title: "Listar",
          path: "/listado-de-cargos",
          icon: <ListAltOutlined />,
          children: [],
        },
        {
          title: "Crear",
          path: "/creacion-de-cargos",
          icon: <AddBox />,
          children: [],
        },
      ],
    },
    {
      title: "Horarios",
      path: "#",
      icon: <ScheduleIcon />,
      children: [
        {
          title: "Listar",
          path: "/listado-de-horarios",
          icon: <ListAltOutlined />,
          children: [],
        },
        {
          title: "Crear",
          path: "/creacion-de-horarios",
          icon: <AddBox />,
          children: [],
        },
        {
          title: "Fijar",
          path: "/seleccion-horarios",
          icon: <Add/>,
          children: [],
        }
      ],
    },
    {
      title: "Roles",
      path: "#",
      icon: <PersonOutlineIcon />,
      children: [
        {
          title: "Listar",
          path: "/listado-de-roles",
          icon: <ListAltOutlined />,
          children: [],
        },

        {
          title: "Crear",
          path: "/creacion-de-roles",
          icon: <AddBox />,
          children: [],
        },
      ],
    },
    {
      title: "Permisos",
      path: "#",
      icon: <PermIdentityIcon/>,
      children: [
        {
        title: "Listar",
        path: "/listar-permiso",
        icon: <ListAltOutlined/>,
        children: [],
        },
        {
          title: "Listar-A",
          path: "/listar-permiso-a",
          icon: <ListAltOutlined/>,
          children: [],
          },
        {
          title: "Registrar",
          path: "/crear-permiso",
          icon: <PersonAddIcon/>,
          children: [],
        }  
      ],
    },
    {
      title: "Usuarios",
      path: "#",
      icon: <AccountCircleIcon/>,
      children: [
        {
          title: "Listar",
          path: "/listar-usuario",
          icon: <ListAltOutlined/>,
          children: [],
        },
        {
          title: "Registrar",
          path: "/crear-usuario",
          icon: <PersonAddIcon/>,
          children: [],
        }
      ]
    }
  ];

  const drawItems = (items, style = null) => {
    return items.map(({ title, path, children, icon }, index) =>
      children.length > 0 ? (
        <BtnDesplegable title={title} icon={icon}>
          {drawItems(children, { marginLeft: 25 })}
        </BtnDesplegable>
      ) : (
        <Link to={path}>
          <ListItem style={style} button key={title}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        </Link>
      )
    );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Link to="/">
          <IconButton>
            <HomeIcon fontSize="large" />
          </IconButton>
          </Link>
          <Typography variant="h4" noWrap>
            Control de Asistencias
          </Typography>
          <span style={{flex: '1 1'}}></span>
          <IconButton>
            <ExitToAppOutlined onClick={() => {
                userState.logout();
            }} />
          </IconButton>
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
          <List>{drawItems(links)}</List>
        </div>
      </Drawer>
      <main className={classes.content}>
        {loading.loading && <LinearProgress />}
        <Paper elevation={4} className={classes.paper}>
          <Switch>
            <Route exact path="/identification">
              <Identification />
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
            <Route exact path="/crear-permiso">
              <PermitForm/>
            </Route>
            <Route exact path="/listar-permiso">
              <PermitList/>
            </Route>
            <Route exact path="/listar-permiso-a">
              <PermitListA/>
            </Route>
            <Route exact path="/creacion-de-empleados">
              <EmployeeForm />
            </Route>
            <Route exact path="/creacion-de-empresas">
              <BussinessForm />
            </Route>
            <Route exact path="/listado-de-asistencia">
              <Assists/>
            </Route>
            <Route exact path="/creacion-de-cargos">
              <ChargesForm />
            </Route>
            <Route exact path="/creacion-de-horarios">
              <SchedulesForm />
            </Route>
            <Route exact path="/Seleccion-horarios">
              <EmployeeSchedule />
            </Route>
            <Route exact path="/crear-usuario">
              <UserForm />
            </Route>
            <Route exact path="/listar-usuario">
              <UserList/>
            </Route>
            <Route exact path="/admin-login">
              <Login module="admin" />
            </Route>
          </Switch>
        </Paper>
      </main>
    </div>
  );
}
