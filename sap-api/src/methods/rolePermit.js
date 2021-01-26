import db from "../models";


export const RolePermit = {
    attachOrDetachPermit: async function(req, res) {
      const {roleId, permitId} = req.body;

      let RESPONSE = {
        error: false,
        msg: "",
        data: null,
        token: null
      };
      try {
        const pivotEntry = await db.RolePermit.findOne({where: {
          roleId, permitId
        }});
  
        if(pivotEntry) {
          RESPONSE.data = await RolePermit.deleteRolePermit(pivotEntry.id)        
        } else {
          RESPONSE.data = await RolePermit.createRolePermit(roleId, permitId);
        }
        res.json(RESPONSE);          
      } catch (error) {
        RESPONSE.error = true;
        RESPONSE.msg = error.toString();
        res.status(500).json(RESPONSE);
      }

    },
    createRolePermit: async function (roleId, permitId) {
        try {
          const rolePermitData = await db.RolePermit.create({
            roleId, permitId
          });
          return rolePermitData;
        } catch (error) {
          throw Error(error.toString());
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

      deleteRolePermit: async function (rolePermitId) {
        try {
          const rolePermit = await db.RolePermit.findOne({ where: { id: rolePermitId } });
          return await rolePermit.destroy();
        } catch (error) {
          throw Error(error.toString());
        }
      },
    

}

