import db from "../models";


export const Permit = {
    permit: async function (req, res) {
        let RESPONSE = {
          error: false,
          msg: "",
          data: null,
          token: null
        };
        try {
          let permit = await db.Permit.findAll();
          RESPONSE.error = false;
          RESPONSE.msg = "Busqueda de permit Exitosa";
          RESPONSE.data = permit;
          res.json(RESPONSE);
        } catch (error) {
          RESPONSE.error = true;
          RESPONSE.msg = error.toString();
          res.status(500).json(RESPONSE);
        }
      },
      permitId: async function (req, res) {
        let RESPONSE = {
          error: false,
          msg: "",
          data: null,
          token: null
        };
        try {
          let permitId = await db.Permit.findAll({ where: { id: req.params.permitId } });
          RESPONSE.error = false;
          RESPONSE.msg = "Busqueda Exitosa";
          RESPONSE.data = permitId;
          res.json(RESPONSE);
        } catch (error) {
          RESPONSE.error = true;
          RESPONSE.msg = error.toString();
          res.status(500).json(RESPONSE);
        }
      },
      createPermit: async function (req, res) {
        let RESPONSE = {
          error: false,
          msg: "",
          data: null,
          token: null
        };
        const { name, moduleId } = req.body;
        try {
          const permitData = await db.Permit.create({name, moduleId});
          RESPONSE.error = false;
          RESPONSE.msg = `Registro de permiso ${permitData.name} Exitoso`;
          RESPONSE.data = permitData;
          res.json(RESPONSE);
        } catch (error) {
          RESPONSE.error = true;
          RESPONSE.msg = error.toString();
          res.status(500).json(RESPONSE);
        }
      },
      updatePermit: async function (req, res) {
        let RESPONSE = {
          error: false,
          msg: "",
          data: null,
          token: null
        };
        const {
          name,
          module
        } = req.body;
        const { id: permitId } = req.params;
        try {
          const permitData = await db.Permit.findOne({ where: { id } });
          if (permitData) {
            permitData.name = name;
            permitData.module = module;
            await permitData.save();
            RESPONSE.error = false;
            RESPONSE.msg = `Permiso ${permitData.id} fue actualizado`;
            RESPONSE.data = permitData;
            res.json(RESPONSE);
          }
        } catch (error) {
          RESPONSE.error = true;
          RESPONSE.msg = error.toString();
          res.status(500).json(RESPONSE);
        }
      },
      deletePermit: async function (req, res) {
        let RESPONSE = {
          erro: false,
          msg: "",
          data: null,
          token: null
        };
        try {
          const permit = await db.Permit.findOne({ where: { id: req.params.permitId } });
          const deletedPermit = await permit.destroy();
          RESPONSE.error = false;
          RESPONSE.msg = `Permiso ${permit.name} fue eliminado exitosamente`
          res.json(RESPONSE);
        } catch (error) {
          RESPONSE.error = true,
            RESPONSE.msg = error.toString();
          res.status(500).json(RESPONSE);
        }
      },
}

