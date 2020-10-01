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
      const user = await db.User.findOne({ where: { id: req.params.rolesId } });
      const updatedUser = await user.update(req.body);
      res.json(updatedRole);
    } catch (error) {
      res.json({ error: error.toString() });
    }
  },
  deleteUser: async function (req, res) {
    try {
      const user = await db.Role.findOne({ where: { id: req.params.userId } });
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
  }
}