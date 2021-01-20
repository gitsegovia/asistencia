import db from "../models";
import {Op} from 'sequelize'
import moment from 'moment'

export const AssistanceMethods = {
  sign: async function (req, res) {
    try {
      const employee = await db.Employee.findOne({
        where: { identification: req.params.identification },
        attributes: { exclude: ["firm"] },
      });
      if(!employee) res.status(404).json({message: "Empleado no encontrado", code: 404})
      const assitance = await updateAssistance(employee);
      res.json({ assitance });
    } catch (error) {
      res.json({ error: error.toString() });
    }
  },
  getAssistancesOfDay: async function(req, res) {
    try {
      const { date, employeeId } = req.params;

      const assistances = await db.Assists.findAll({
        where: {createdAt: {
          [Op.gt]: moment(date).utc().startOf('day'),
          [Op.lt]: moment(date).utc().endOf('day')
        }
        , employeeId:employeeId }
      });
      res.json({assistances});
    } catch (error) {
      res.status(500).json({error: error.toString()})
    }
  }
};

async function updateAssistance(employee) {
    const assist = await db.Assists.create({
      employeeId: employee.id,
    });
    return assist;
  }