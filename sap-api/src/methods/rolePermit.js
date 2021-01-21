import db from "../models";


export const RolePermit = {
    createRolePermit: async function (req, res) {
        let RESPONSE = {
          error: false,
          msg: "",
          data: null,
          token: null
        };
        const {roleId, permitId} = req.body;
        try {
          const rolePermitData = await db.RolePermit.create({
            roleId, permitId
          });
          RESPONSE.error = false;
          RESPONSE.msg = `Registro de RolePermit ${rolePermitData} Exitoso`;
          RESPONSE.data = rolePermitData;
          res.json(RESPONSE);
        } catch (error) {
          RESPONSE.error = true;
          RESPONSE.msg = error.toString();
          res.json(RESPONSE);
        }
      },
      rolePermit: async function (req, res) {
        let RESPONSE = {
          error: false,
          msg: "",
          data: null,
          token: null
        };
        try {
          let rolePermit = await db.RolePermit.findAll();
          RESPONSE.error = false;
          RESPONSE.msg = "Busqueda de Rol Exitosa";
          RESPONSE.data = rolePermit;
          res.json(RESPONSE);
        } catch (error) {
          RESPONSE.error = true;
          RESPONSE.msg = error.toString();
          res.json(RESPONSE);
        }
      },
      rolePermitId: async function (req, res) {
        let RESPONSE = {
          error: false,
          msg: "",
          data: null,
          token: null
        };
        try {
          const rolePermitId = await db.RolePermit.findAll({ where: { id: req.params.rolePermitId } });
          RESPONSE.error = false;
          RESPONSE.msg = "Busqueda Exitosa";
          RESPONSE.data = rolePermitId;
          res.json(RESPONSE);
        } catch (error) {
          RESPONSE.error = true;
          RESPONSE.msg = error.toString();
          res.json(RESPONSE);
        }
      },
      updateRolePermit: async function (req, res) {
        let RESPONSE = {
          error: false,
          msg: "",
          data: null,
          token: null
        };
        const { roleId, permitId} = req.body;
        const id = req.params.roleId;
        try {
          const roleData = await db.Role.findOne({ where: { id } });
          if (roleData) {
            roleData.permitId = permitId;
            await permitData.save();
            RESPONSE.error = false;
            RESPONSE.msg = `Role-Permit ${roleData.id} fue actualizado`;
            RESPONSE.data = roleData;
            res.json(RESPONSE);
          }
        } catch (error) {
          RESPONSE.error = true;
          RESPONSE.msg = error.toString();
          res.json(RESPONSE);
        }
      },    
      //--- GRUD de udate-delete falta verificar

      deleteRolePermit: async function (req, res) {
        let RESPONSE = {
          erro: false,
          msg: "",
          data: null,
          token: null
        };
        try {
          const role = await db.RolePermit.findOne({ where: { id: req.params.rolePermitId } });
          await role.destroy();
          RESPONSE.error = false;
          RESPONSE.msg = `role ${role.name} fue eliminado exitosamente`
          res.json(RESPONSE);
        } catch (error) {
          RESPONSE.error = true;
          RESPONSE.msg = error.toString();
          res.json(RESPONSE);
        }
      },
    

}

