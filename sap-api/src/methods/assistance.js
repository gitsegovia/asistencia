import db from "../models";
import moment from "moment";

export const AssistanceMethods = {
  sign: async function (req, res) {
    try {
      const employee = await db.Employee.findOne({
        where: { identification: req.params.identification },
        include: ["schedule"],
        attributes: { exclude: ["firm"] },
      });

      const todayAssistances = await checkSchedule(employee);

      res.json({ todayAssistances });
    } catch (error) {
      res.json({ error: error.toString() });
    }
  },
};

async function updateAssistance(employee) {}

// Verifica si el empleado ha asistido el dia de hoy, al menos 1 vez
async function checkSchedule(employee) {
  const schedules = [employee.schedule];
  const closestSchedule = schedules
    .map((schedule) => {
      const departureTime = schedule.departureTime;
      const diff = moment(departureTime, "hh:mm:ss").unix() - moment().unix();
      return { ...schedule.dataValues, passed: diff > 0, diff };
    })
    .filter((schedule) => schedule.passed)
    .sort((a, b) => a.diff - b.diff);
  return closestSchedule.length > 0 ? closestSchedule[0] : [];
  const todayAssistance = await db.Assists.findAll({
    where: { date: moment(), employeeId: employee.id },
  });
  return todayAssistance;
}
