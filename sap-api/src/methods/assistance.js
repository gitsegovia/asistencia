import db from "../models";

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
};

async function updateAssistance(employee) {
    const assist = await db.Assists.create({
      employeeId: employee.id,
    });
    return assist;
  }