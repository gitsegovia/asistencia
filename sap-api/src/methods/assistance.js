import db from "../models";
import moment from "moment";
import {Op} from 'sequelize';

export const AssistanceMethods = {
  sign: async function (req, res) {
    try {
      const employee = await db.Employee.findOne({
        where: { identification: req.params.identification },
        include: ["schedule"],
        attributes: { exclude: ["firm"] },
      });
      if(!employee) res.json({message: "Empleado no encontrado", code: 404})
      const closestSchedule = await checkSchedule(employee);
      if(!closestSchedule) {
        res.json({message: "No tiene entrada disponible"})
      }
      const currentAssistance = await checkAssistance(closestSchedule);
      
      const assitance = await updateAssistance(employee, currentAssistance, closestSchedule.schedule);

      res.json({ assitance });
    } catch (error) {
      res.json({ error: error.toString() });
    }
  },
};

async function updateAssistance(employee, currentAssistance, schedule) {
  if(!currentAssistance){
    const assist = await db.Assists.create({
      employeeId: employee.id,
      entryTime: moment().format("HH:mm:ss"),
      date: moment(),
      timeDiff: schedule.departureDiff,
      startTime: schedule.entryTime,
      endTime: schedule.departureTime 
    });
    return assist;
  } else {
    const assist = await db.Assists.findOne({where: {id: currentAssistance.id}});
    if(assist.departureTime !== null) return {message: "Ya ha marcado su horario el dia de hoy"};
    assist.departureTime = moment().format("HH:mm:ss");
    await assist.save();
    return assist;
  }
}

async function checkAssistance({employee, schedule}) {
  const todayAssistance = await db.Assists.findOne({
    where: { date: moment().toDate(),
       employeeId: employee.id,
       startTime: schedule.entryTime,
       entryTime: {[Op.not] : null} },
  });
  return todayAssistance;
}

// Devuelve el horario mas proximo del empleado ingresado
async function checkSchedule(employee) {
  const schedules = [employee.schedule];
  const closestSchedule = schedules
    .map((schedule) => {
      const departureTime = schedule.departureTime;
      const diff = moment(departureTime, "hh:mm:ss").unix() - moment().unix();
      return { ...schedule.dataValues, passed: diff > 0, departureDiff: moment.utc(diff*1000).format("HH:mm")  };
    })
    .filter((schedule) => schedule.passed)
    .sort((a, b) => a.diff - b.diff);
  if (closestSchedule.length < 1) return [];
  return {schedule: closestSchedule[0], employee};
}
