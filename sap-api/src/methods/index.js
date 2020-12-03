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
      RESPONSE.msg = "Busqueda de usuarios Exitosa";
      RESPONSE.data = user;
      res.json(RESPONSE);
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
    }
  },
  userId: async function (req, res) {
    let RESPONSE = {
      error: false,
      msg: "",
      data: null,
      token: null
    };
    try {
      let userId = await db.User.findAll({ where: { id: req.params.userId } });
      RESPONSE.error = false;
      RESPONSE.msg = "Busqueda Exitosa";
      RESPONSE.data = userId;
      res.json(RESPONSE);
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
    }
  },
  createUser: async function (req, res) {
    let RESPONSE = {
      error: false,
      msg: "",
      data: null,
      token: null
    };
    const { firstName, user, password } = req.body;
    try {
      const userData = await db.User.create({
        firstName,
        user,
        password
      });
      RESPONSE.error = false;
      RESPONSE.msg = `Registro de usuario ${userData.user} Exitoso`;
      RESPONSE.data = userData;
      res.json(RESPONSE);
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
    }
  },
  updateUser: async function (req, res) {
    let RESPONSE = {
      error: false,
      msg: "",
      data: null,
      token: null
    };
    const {
      firstName,
      user,
      password
    } = req.body;
    const { id: userId } = req.params;
    try {
      const userData = await db.User.findOne({ where: { id } });
      if (userData) {
        userData.firstName = firstName;
        userData.user = user;
        userData.password = password;
        await userData.save();
        RESPONSE.error = false;
        RESPONSE.msg = `Usuario ${userData.id} fue actualizado`;
        RESPONSE.data = userData;
        res.json(RESPONSE);
      }
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
    }
  },
  deleteUser: async function (req, res) {
    let RESPONSE = {
      erro: false,
      msg: "",
      data: null,
      token: null
    };
    try {
      const user = await db.User.findOne({ where: { id: req.params.userId } });
      const deletedUser = await user.destroy();
      RESPONSE.error = false;
      RESPONSE.msg = `Usuario ${user.firstName} fue eliminado exitosamente`
      res.json(RESPONSE);
    } catch (error) {
      RESPONSE.error = true,
        RESPONSE.msg = error.toString();
      res.json(RESPONSE);
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
      RESPONSE.msg = "Busqueda de roles Exitosa";
      RESPONSE.data = roles;
      res.json(RESPONSE);
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
    }
  },
  roleId: async function (req, res) {
    let RESPONSE = {
      error: false,
      msg: "",
      data: null,
      token: null
    };
    try {
      let roleId = await db.Role.findAll({ where: { id: req.params.roleId } });
      RESPONSE.error = false;
      RESPONSE.msg = "Busqueda Exitosa";
      RESPONSE.data = roleId;
      res.json(RESPONSE);
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
    }
  },
  createRole: async function (req, res) {
    let RESPONSE = {
      error: false,
      msg: "",
      data: null,
      token: null
    };
    const { name, permit } = req.body;
    try {
      const roleData = await db.Role.create({
        name,
        permit
      });
      RESPONSE.error = false;
      RESPONSE.msg = `Resgistro de rol ${roleData.name} exitoso`;
      RESPONSE.data = roleData;
      res.json(RESPONSE);
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
    }
  },
  updateRole: async function (req, res) {
    let RESPONSE = {
      error: false,
      msg: "",
      data: null,
      token: null
    };
    const { name, permit } = req.body;
    const id = req.params.roleId;
    try {
      const roleData = await db.Role.findOne({ where: { id } });
      if (roleData) {
        roleData.name = name;
        roleData.permit = permit;
        await roleData.save();
        RESPONSE.error = false;
        RESPONSE.msg = `Role ${roleData.id} fue actualizado`;
        RESPONSE.data = roleData;
        res.json(RESPONSE);
      }
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
    }
  },
  deleteRole: async function (req, res) {
    let RESPONSE = {
      error: false,
      msg: "",
      data: null,
      token: null
    };
    try {
      const role = await db.Role.findOne({ where: { id: req.params.roleId } });
      const deletedRole = await role.destroy();
      RESPONSE.error = false;
      RESPONSE.msg = `Rol ${role.name} fue eliminado`;
      res.json(RESPONSE);
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
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
      RESPONSE.msg = "Busqueda de bussiness Exitosa";
      RESPONSE.data = bussiness;
      res.json(RESPONSE);
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
    }
  },
  bussinessId: async function (req, res) {
    let RESPONSE = {
      error: false,
      msg: "",
      data: null,
      token: null
    };
    try {
      const bussiness = await db.Bussiness.findAll({ where: { id: req.params.bussinessId } });
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
  createBussiness: async function (req, res) {
    let RESPONSE = {
      error: false,
      msg: "",
      data: null,
      token: null
    };
    const { firstName, rif, direction, logo } = req.body;
    try {
      const bussinessData = await db.Bussiness.create({
        firstName,
        rif,
        logo,
        direction
      });
      RESPONSE.error = false;
      RESPONSE.msg = `Registro de bussiness ${bussinessData.firstName} Exitoso`;
      RESPONSE.data = bussinessData;
      res.json(RESPONSE);
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
    }
  },
  updateBussiness: async function (req, res) {
    let RESPONSE = {
      error: false,
      msg: "",
      data: null,
      token: null
    };
    const { firstName, rif, diretion, logo } = req.body;
    try {
      const bussinessData = await db.Bussiness.findOne({ where: { id: req.params.bussinessId } });
      if (bussinessData) {
        bussinessData.firstName = firstName;
        bussinessData.rif = rif;
        bussinessData.logo = logo;
        bussinessData.diretion = diretion;
        await bussinessData.save();
        RESPONSE.error = false;
        RESPONSE.msg = `Bussiness ${bussinessData.id} fue actualizado`;
        RESPONSE.data = bussinessData;
        res.json(RESPONSE);
      }
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
    }
  },
  deleteBussiness: async function (req, res) {
    let RESPONSE = {
      erro: false,
      msg: "",
      data: null,
      token: null
    };
    try {
      const bussiness = await db.Bussiness.findOne({ where: { id: req.params.bussinessId } });
      const deletedBussiness = await bussiness.destroy();
      RESPONSE.error = false;
      RESPONSE.msg = `Bussiness ${bussiness.firstName} fue eliminado exitosamente`
      res.json(RESPONSE);
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
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
      let employee = await db.Employee.findAll({
        include: [{
          model: db.Bussiness,
          as: 'bussiness'
        },
      {
        model: db.Position,
        as: 'charges'
      },{
        model: db.Schedule,
        as: 'schedule'
      }]
      });
      RESPONSE.error = false;
      RESPONSE.msg = "Busqueda de employee Exitosa";
      RESPONSE.data = employee;
      res.json(RESPONSE);
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
    }
  },
  employeeId: async function (req, res) {
    let RESPONSE = {
      error: false,
      msg: "",
      data: null,
      token: null
    };
    try {
      const employeeId = await db.Employee.findAll({ where: { id: req.params.employeeId } });
      RESPONSE.error = false;
      RESPONSE.msg = "Busqueda Exitosa";
      RESPONSE.data = employeeId;
      res.json(RESPONSE);
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
    }
  },
  createEmployee: async function (req, res) {
    let RESPONSE = {
      error: false,
      msg: "",
      data: null,
      token: null
    };
    const {
      firstName,
      surname,
      identification,
      firm,
      photo=null,
      bussinessId,
      position,
      schedule} = req.body;
    try {
      const employeeData = await db.Employee.create({
        firstName,
        surname,
        identification,
        firm,
        photo,
        bussinessId,
        positionId: position,
        scheduleId: schedule,
      });
      RESPONSE.error = false;
      RESPONSE.msg = `Registro de employee ${employeeData.firstName} Exitoso`;
      RESPONSE.data = employeeData;
      res.json(RESPONSE);
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
    }
  },
  updateEmployee: async function (req, res) {
    let RESPONSE = {
      error: false,
      msg: "",
      data: null,
      token: null
    };
    const {
      firstName,
      surname,
      identification,
      firm,
      photo } = req.body;
    const id = req.params.employeeId;
    try {
      const employeeData = await db.Employee.findOne({ where: { id } });
      if (employeeData) {
        employeeData.firstName = firstName;
        employeeData.surname = surname;
        employeeData.firm = firm;
        employeeData.identification = identification;
        employeeData.photo = photo;
        await employeeData.save();
        RESPONSE.error = false;
        RESPONSE.msg = `Employee ${employeeData.id} fue actualizado`;
        RESPONSE.data = employeeData;
        res.json(RESPONSE);
      }
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
    }
  },
  deleteEmployee: async function (req, res) {
    let RESPONSE = {
      erro: false,
      msg: "",
      data: null,
      token: null
    };
    try {
      const employee = await db.Employee.findOne({ where: { id: req.params.employeeId } });
      const deletedEmployee = await employee.destroy();
      RESPONSE.error = false;
      RESPONSE.msg = `Employee ${employee.firstName} fue eliminado exitosamente`
      res.json(RESPONSE);
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
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
      RESPONSE.msg = "Busqueda de schedule Exitosa";
      RESPONSE.data = schedule;
      res.json(RESPONSE);
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
    }
  },
  scheduleId: async function (req, res) {
    let RESPONSE = {
      error: false,
      msg: "",
      data: null,
      token: null
    };
    try {
      const scheduleId = await db.Schedule.findAll({ where: { id: req.params.scheduleId } });
      RESPONSE.error = false;
      RESPONSE.msg = "Busqueda Exitosa";
      RESPONSE.data = scheduleId;
      res.json(RESPONSE);
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
    }
  },
  createSchedule: async function (req, res) {
    let RESPONSE = {
      error: false,
      msg: "",
      data: null,
      token: null
    };
    const { name, entryTime, departureTime } = req.body;
    try {
      const scheduleData = await db.Schedule.create({
        name, entryTime, departureTime
      });
      RESPONSE.error = false;
      RESPONSE.msg = `Registro de schedule ${scheduleData.name} Exitoso`;
      RESPONSE.data = scheduleData;
      res.json(RESPONSE);
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
    }
  },
  updateSchedule: async function (req, res) {
    let RESPONSE = {
      error: false,
      msg: "",
      data: null,
      token: null
    };
    const { name, entryTime, departureTime } = req.body;
    const id = req.params.scheduleId;
    try {
      const scheduleData = await db.Schedule.findOne({ where: { id } });
      if (scheduleData) {
        scheduleData.name = name;
        scheduleData.entryTime = entryTime;
        scheduleData.departureTime = departureTime;
        await scheduleData.save();
        RESPONSE.error = false;
        RESPONSE.msg = `Schedule ${scheduleData.id} fue actualizado`;
        RESPONSE.data = scheduleData;
        res.json(RESPONSE);
      }
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
    }
  },
  deleteSchedule: async function (req, res) {
    let RESPONSE = {
      erro: false,
      msg: "",
      data: null,
      token: null
    };
    try {
      const schedule = await db.Schedule.findOne({ where: { id: req.params.scheduleId } });
      await schedule.destroy();
      RESPONSE.error = false;
      RESPONSE.msg = `Schedule ${schedule.name} fue eliminado exitosamente`
      res.json(RESPONSE);
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
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
      RESPONSE.msg = "Busqueda de assists Exitosa";
      RESPONSE.data = assists;
      res.json(RESPONSE);
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
    }
  },
  assistsId: async function (req, res) {
    let RESPONSE = {
      error: false,
      msg: "",
      data: null,
      token: null
    };
    try {
      const assistsId = await db.Assists.findOne({ where: { id: req.params.assistsId } });
      RESPONSE.error = false;
      RESPONSE.msg = "Busqueda Exitosa";
      RESPONSE.data = assistsId;
      res.json(RESPONSE);
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
    }
  },
  createAssists: async function (req, res) {
    let RESPONSE = {
      error: false,
      msg: "",
      data: null,
      token: null
    };
    const { entryTime, departureTime, date} = req.body;
    try {
      const assistsData = await db.Assists.create({
        entryTime,
        departureTime,
        date
      });
      RESPONSE.error = false;
      RESPONSE.msg = `Registro de assists ${assistsData.date} Exitoso`;
      RESPONSE.data = assistsData;
      res.json(RESPONSE);
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
    }
  },
  updateAssists: async function (req, res) {
    let RESPONSE = {
      error: false,
      msg: "",
      data: null,
      token: null
    };
    const { departureTime, entryTime, date} = req.body;
    const id = req.params.assistsId;
    try {
      const assistsData = await db.Assists.findOne({ where: { id } });
      if (assistsData) {
        assistsData.entryTime = entryTime;
        assistsData.departureTime = departureTime;
        assistsData.date = date;
        await assistsData.save();
        RESPONSE.error = false;
        RESPONSE.msg = `Assists ${assistsData.id} fue actualizado`;
        RESPONSE.data = assistsData;
        res.json(RESPONSE);
      }
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg =  error.toString();
      res.json(RESPONSE);
    }
  },
  deleteAssist: async function (req, res) {
    let RESPONSE = {
      erro: false,
      msg: "",
      data: null,
      token: null
    };
    try {
      const assists = await db.Assists.findOne({ where: { id: req.params.assistsId } });
      const deletedAssists = await assists.destroy();
      RESPONSE.error = false;
      RESPONSE.msg = `Assist ${assists.date} fue eliminado exitosamente`
      res.json(RESPONSE);
    } catch (error) {
      RESPONSE.error = true,
      RESPONSE.msg = error.toString();
    res.json(RESPONSE);
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
      let position = await db.Position.findAll();
      RESPONSE.error = false;
      RESPONSE.msg = "Busqueda de position Exitosa";
      RESPONSE.data = position;
      res.json(RESPONSE);
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
    }
  },
  positionId: async function (req, res) {
    let RESPONSE = {
      error: false,
      msg: "",
      data: null,
      token: null
    };
    try {
      const positionId = await db.Position.findAll({ where: { id: req.params.positionId } });
      RESPONSE.error = false;
      RESPONSE.msg = "Busqueda Exitosa";
      RESPONSE.data = positionId;
      res.json(RESPONSE);
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
    }
  },
  createPosition: async function (req, res) {
    let RESPONSE = {
      error: false,
      msg: "",
      data: null,
      token: null
    };
    const { name } = req.body;
    try {
      const positionData = await db.Position.create({
        name
      });
      RESPONSE.error = false;
      RESPONSE.msg = `Registro de positioin ${positionData.name} Exitoso`;
      RESPONSE.data = positionData;
      res.json(RESPONSE);
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
    }
  },
  updatePosition: async function (req, res) {
    let RESPONSE = {
      error: false,
      msg: "",
      data: null,
      token: null
    };
    const { name } = req.body;
    const  id  = req.params.positionId;
    try {
      const positionData = await db.Position.findOne({ where: { id } });
      if (positionData) {
        positionData.name = name;
        await positionData.save();
        RESPONSE.error = false;
        RESPONSE.msg = `Position ${positionData.id} fue actualizado`;
        RESPONSE.data = positionData;
        res.json(RESPONSE);
      }
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
    }
  },
  deletePosition: async function (req, res) {
    let RESPONSE = {
      erro: false,
      msg: "",
      data: null,
      token: null
    };
    try {
      const position = await db.Position.findOne({ where: { id: req.params.positionId } });
      await position.destroy();
      RESPONSE.error = false;
      RESPONSE.msg = `Position ${position.name} fue eliminado exitosamente`
      res.json(RESPONSE);
    } catch (error) {
      RESPONSE.error = true;
      RESPONSE.msg = error.toString();
      res.json(RESPONSE);
    }
  },
}