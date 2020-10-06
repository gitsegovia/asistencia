import db from '../models'



export const Methods = {

  //--- Methods User 
  users: async function (req, res) {
    let RESPONSE = {
      error: false,
      msg: "",
      data: null,
      token: null
    };

    try {
      let user = await db.User.findAll();
      RESPONSE.error = false;
      RESPONSE.msg = "Busqueda Exitosa";
      RESPONSE.data = user;
      res.json(RESPONSE);
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
    }
  },
  userId: async function (req, res) {
    try {
      const user = await db.User.findOne({ where: { id: req.params.userId } });
      res.json(user);
    } catch (error) {
      res.json({ error: error.toString() });
    }
  },

  createUser: async function (req, res) {
    try {
      const userData = req.body;
      const user = await db.User.create(userData);
      res.json(user);
    } catch (error) {
      res.json({ error: error.toString() });
    }
  },
  updateUser: async function (req, res) {
    try {
      const user = await db.User.findOne({ where: { id: req.params.userId } });
      const updatedUser = await user.update(req.body);
      res.json(updatedUser);
    } catch (error) {
      res.json({ error: error.toString() });
    }
  },
  deleteUser: async function (req, res) {
    try {
      const user = await db.User.findOne({ where: { id: req.params.userId } });
      const deletedUser = await user.destroy();
      return res.json({ message: "User eliminado" });
    } catch (error) {
      res.json({ error: error.toString() });
    }
  },

  //--- Methods Role
  roles: async function (req, res) {
    let RESPONSE = {
      error: false,
      msg: "",
      data: null,
      token: null
    };
    try {
      let roles = await db.Role.findAll();
      RESPONSE.error = false;
      RESPONSE.msg = "Busqueda Exitosa";
      RESPONSE.data = roles;
      res.json(RESPONSE);
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
    }
  },
  roleId: async function (req, res) {
    try {
      const role = await db.Role.findOne({ where: { id: req.params.rolesId } });
      res.json(role);
    } catch (error) {
      res.json({ error: error.toString() });
    }
  },
  createRole: async function (req, res) {
    try {
      const roleData = req.body;
      const role = await db.Role.create(roleData);
      res.json(role);
    } catch (error) {
      res.json({ error: error.toString() });
    }
  },
  updateRole: async function (req, res) {
    try {
      const role = await db.Role.findOne({ where: { id: req.params.rolesId } });
      const updatedRole = await role.update(req.body);
      res.json(updatedRole);
    } catch (error) {
      res.json({ error: error.toString() });
    }
  },
  deleteRole: async function (req, res) {
    try {
      const role = await db.Role.findOne({ where: { id: req.params.rolesId } });
      const deletedRole = await role.destroy();
      return res.json({ message: "Rol eliminado" });
    } catch (error) {
      res.json({ error: error.toString() });
    }
  },

  //--- Methods Bussiness
  bussiness: async function (req, res) {
    let RESPONSE = {
      error: false,
      msg: "",
      data: null,
      token: null
    };
    try {
      let bussiness = await db.Bussiness.findAll();
      RESPONSE.error = false;
      RESPONSE.msg = "Busqueda Exitosa";
      RESPONSE.data = bussiness;
      res.json(RESPONSE);
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
    }
  },
  bussinessId: async function (req, res) {
    try {
      const bussiness = await db.Bussiness.findOne({ where: { id: req.params.bussinessId } });
      res.json(bussiness);
    } catch (error) {
      res.json({ error: error.toString() });
    }
  },
  createBussiness: async function (req, res) {
    try {
      const bussinessData = req.body;
      const bussiness = await db.Bussiness.create(bussinessData);
      res.json(bussiness);
    } catch (error) {
      res.json({ error: error.toString() });
    }
  },
  updateBussiness: async function (req, res) {
    try {
      const bussiness = await db.Bussiness.findOne({ where: { id: req.params.bussinessId } });
      const updatedBussiness = await bussiness.update(req.body);
      res.json(updatedBussiness);
    } catch (error) {
      res.json({ error: error.toString() });
    }
  },
  deleteBussiness: async function (req, res) {
    try {
      const bussiness = await db.Bussiness.findOne({ where: { id: req.params.bussinessId } });
      const deletedBussiness = await bussiness.destroy();
      return res.json({ message: "Bussiness eliminado" });
    } catch (error) {
      res.json({ error: error.toString() });
    }
  },

//---Methods Employee
employee: async function (req, res) {
  let RESPONSE = {
    error: false,
    msg: "",
    data: null,
    token: null
  };
  try {
    let employee = await db.Employee.findAll();
    RESPONSE.error = false;
    RESPONSE.msg = "Busqueda Exitosa";
    RESPONSE.data = employee;
    res.json(RESPONSE);
  } catch (error) {
    RESPONSE.error = true;
    RESPONSE.msg = error.toString();
    res.json(RESPONSE);
  }
},
employeeId: async function (req, res) {
  try {
    const employee = await db.Employee.findOne({ where: { id: req.params.employeeId } });
    res.json(employee);
  } catch (error) {
    res.json({ error: error.toString() });
  }
},
createEmployee: async function (req, res) {
  try {
    const employeeData = req.body;
    const employee = await db.Employee.create(employeeData);
    res.json(employee);
  } catch (error) {
    res.json({ error: error.toString() });
  }
},
updateEmployee: async function (req, res) {
  try {
    const employee = await db.Employee.findOne({ where: { id: req.params.employeeId } });
    const updatedEmployee = await employee.update(req.body);
    res.json(updatedEmployee);
  } catch (error) {
    res.json({ error: error.toString() });
  }
},
deleteEmployee: async function (req, res) {
  try {
    const employee = await db.Employee.findOne({ where: { id: req.params.employeeId } });
    const deletedEmployee = await employee.destroy();
    return res.json({ message: "Employee eliminado" });
  } catch (error) {
    res.json({ error: error.toString() });
  }
},
//---Methods Schedule
schedule: async function (req, res) {
  let RESPONSE = {
    error: false,
    msg: "",
    data: null,
    token: null
  };
  try {
    let schedule = await db.Schedule.findAll();
    RESPONSE.error = false;
    RESPONSE.msg = "Busqueda Exitosa";
    RESPONSE.data = schedule;
    res.json(RESPONSE);
  } catch (error) {
    RESPONSE.error = true;
    RESPONSE.msg = error.toString();
    res.json(RESPONSE);
  }
},
scheduleId: async function (req, res) {
  try {
    const schedule = await db.Schedule.findOne({ where: { id: req.params.scheduleId } });
    res.json(schedule);
  } catch (error) {
    res.json({ error: error.toString() });
  }
},
createSchedule: async function (req, res) {
  try {
    const scheduleData = req.body;
    const schedule = await db.Schedule.create(scheduleData);
    res.json(schedule);
  } catch (error) {
    res.json({ error: error.toString() });
  }
},
updateSchedule: async function (req, res) {
  try {
    const schedule = await db.Schedule.findOne({ where: { id: req.params.scheduleId } });
    const updatedSchedule = await schedule.update(req.body);
    res.json(updatedSchedule);
  } catch (error) {
    res.json({ error: error.toString() });
  }
},
deleteSchedule: async function (req, res) {
  try {
    const schedule = await db.Schedule.findOne({ where: { id: req.params.scheduleId } });
    const deletedSchedule = await schedule.destroy();
    return res.json({ message: "Schedule eliminado" });
  } catch (error) {
    res.json({ error: error.toString() });
  }
},
//--- Methods Status
status: async function (req, res) {
  let RESPONSE = {
    error: false,
    msg: "",
    data: null,
    token: null
  };
  try {
    let status = await db.Status.findAll();
    RESPONSE.error = false;
    RESPONSE.msg = "Busqueda Exitosa";
    RESPONSE.data = status;
    res.json(RESPONSE);
  } catch (error) {
    RESPONSE.error = true;
    RESPONSE.msg = error.toString();
    res.json(RESPONSE);
  }
},
statusId: async function (req, res) {
  try {
    const status = await db.Status.findOne({ where: { id: req.params.statusId } });
    res.json(status);
  } catch (error) {
    res.json({ error: error.toString() });
  }
},
createStatus: async function (req, res) {
  try {
    const statusData = req.body;
    const status = await db.Status.create(statusData);
    res.json(status);
  } catch (error) {
    res.json({ error: error.toString() });
  }
},
updateStatus: async function (req, res) {
  try {
    const status = await db.Status.findOne({ where: { id: req.params.statusId } });
    const updatedStatus = await status.update(req.body);
    res.json(updatedStatus);
  } catch (error) {
    res.json({ error: error.toString() });
  }
},
deleteStatus: async function (req, res) {
  try {
    const status = await db.Status.findOne({ where: { id: req.params.statusId } });
    const deletedStatus = await status.destroy();
    return res.json({ message: "Status eliminado" });
  } catch (error) {
    res.json({ error: error.toString() });
  }
},
//---Methods Assists
assists: async function (req, res) {
  let RESPONSE = {
    error: false,
    msg: "",
    data: null,
    token: null
  };
  try {
    let assists = await db.Assists.findAll();
    RESPONSE.error = false;
    RESPONSE.msg = "Busqueda Exitosa";
    RESPONSE.data = assists;
    res.json(RESPONSE);
  } catch (error) {
    RESPONSE.error = true;
    RESPONSE.msg = error.toString();
    res.json(RESPONSE);
  }
},
assistsId: async function (req, res) {
  try {
    const assists = await db.Assists.findOne({ where: { id: req.params.assistsId } });
    res.json(assists);
  } catch (error) {
    res.json({ error: error.toString() });
  }
},
createAssists: async function (req, res) {
  try {
    const assistsData = req.body;
    const assists = await db.Assists.create(assistsData);
    res.json(assists);
  } catch (error) {
    res.json({ error: error.toString() });
  }
},
updateAssists: async function (req, res) {
  try {
    const assists = await db.Assists.findOne({ where: { id: req.params.assistsId } });
    const updatedAssists = await assists.update(req.body);
    res.json(updatedAssists);
  } catch (error) {
    res.json({ error: error.toString() });
  }
},
deleteAssist: async function (req, res) {
  try {
    const assists = await db.Assists.findOne({ where: { id: req.params.assistsId } });
    const deletedAssists = await assists.destroy();
    return res.json({ message: "Assists eliminado" });
  } catch (error) {
    res.json({ error: error.toString() });
  }
},
//---Methods Position
position: async function (req, res) {
  let RESPONSE = {
    error: false,
    msg: "",
    data: null,
    token: null
  };
  try {
    let position= await db.Position.findAll();
    RESPONSE.error = false;
    RESPONSE.msg = "Busqueda Exitosa";
    RESPONSE.data = position;
    res.json(RESPONSE);
  } catch (error) {
    RESPONSE.error = true;
    RESPONSE.msg = error.toString();
    res.json(RESPONSE);
  }
},
positionId: async function (req, res) {
  try {
    const position = await db.Position.findOne({ where: { id: req.params.positionId } });
    res.json(position);
  } catch (error) {
    res.json({ error: error.toString() });
  }
},
createPosition: async function (req, res) {
  try {
    const positionData = req.body;
    const position = await db.Position.create(positionData);
    res.json(position);
  } catch (error) {
    res.json({ error: error.toString() });
  }
},
updatePosition: async function (req, res) {
  try {
    const position = await db.Position.findOne({ where: { id: req.params.positionId } });
    const updatedPosition = await position.update(req.body);
    res.json(updatedPosition);
  } catch (error) {
    res.json({ error: error.toString() });
  }
},
deletePosition: async function (req, res) {
  try {
    const position = await db.Position.findOne({ where: { id: req.params.positionId } });
    const deletedPosition = await position.destroy();
    return res.json({ message: "Position eliminado" });
  } catch (error) {
    res.json({ error: error.toString() });
  }
},
}