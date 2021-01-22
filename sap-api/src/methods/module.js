import db from "../models";


export const Module = {
    modules: async function (req, res) {
        let RESPONSE = {
          error: false,
          msg: "",
          data: null,
          token: null
        };
        try {
          let module = await db.Module.findAll({include: ["permits"]});
          RESPONSE.error = false;
          RESPONSE.msg = "Busqueda de Modulos Exitosa";
          RESPONSE.data = module;
          res.json(RESPONSE);
        } catch (error) {
          RESPONSE.error = true;
          RESPONSE.msg = error.toString();
          res.status(500).json(RESPONSE);
        }
      },
      moduleId: async function (req, res) {
        let RESPONSE = {
          error: false,
          msg: "",
          data: null,
          token: null
        };
        try {
          let moduleId = await db.Module.findAll({ where: { id: req.params.moduleId } });
          RESPONSE.error = false;
          RESPONSE.msg = "Busqueda Exitosa";
          RESPONSE.data = moduleId;
          res.json(RESPONSE);
        } catch (error) {
          RESPONSE.error = true;
          RESPONSE.msg = error.toString();
          res.status(500).json(RESPONSE);
        }
      },
      createModule: async function (req, res) {
        let RESPONSE = {
          error: false,
          msg: "",
          data: null,
          token: null
        };
        const { name } = req.body;
        try {
          const moduleData = await db.Module.create({name});
          RESPONSE.error = false;
          RESPONSE.msg = `Registro de modulo ${moduleData.name} Exitoso`;
          RESPONSE.data = moduleData;
          res.json(RESPONSE);
        } catch (error) {
          RESPONSE.error = true;
          RESPONSE.msg = error.toString();
          res.status(500).json(RESPONSE);
        }
      },
      updateModule: async function (req, res) {
        let RESPONSE = {
          error: false,
          msg: "",
          data: null,
          token: null
        };
        const {
          name,
        } = req.body;
        const { id: moduleId } = req.params;
        try {
          const moduleData = await db.Module.findOne({ where: { id } });
          if (moduleData) {
            moduleData.name = name;
            await moduleData.save();
            RESPONSE.error = false;
            RESPONSE.msg = `Modulo ${moduleData.id} fue actualizado`;
            RESPONSE.data = moduleData;
            res.json(RESPONSE);
          }
        } catch (error) {
          RESPONSE.error = true;
          RESPONSE.msg = error.toString();
          res.status(500).json(RESPONSE);
        }
      },
      deleteModule: async function (req, res) {
        let RESPONSE = {
          erro: false,
          msg: "",
          data: null,
          token: null
        };
        try {
          const module = await db.Module.findOne({ where: { id: req.params.moduleId } });
          const deletedModule = await module.destroy();
          RESPONSE.error = false;
          RESPONSE.msg = `Module ${module.name} fue eliminado exitosamente`
          res.json(RESPONSE);
        } catch (error) {
          RESPONSE.error = true,
            RESPONSE.msg = error.toString();
          res.status(500).json(RESPONSE);
        }
      },
}

