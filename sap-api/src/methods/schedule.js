import db from "../models";

export const ScheduleMethods = {
  getSchedulesByEmployee: async function (req, res) {
      try {
        const schedules = await db.EmployeeSchedule.findAll({
            where: { employeeId: req.params.employeeId },
            include: ["schedules"],
          });
          res.json({ schedules });
      } catch (error) {
        res.status(500).json({error: error.toString()});          
      }
  },
};
