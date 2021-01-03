import { Router } from "express";
import { Methods } from "../methods";
import auth from "../middleware/auth";

const router = Router();

//---AUTH routes
router.post("/auth/register", auth, Methods.register);
router.post("/auth/login", Methods.login);
//---Users routes
router.get("/sign/:identification", Methods.sign);

//---Users routes
router.get("/user", auth, Methods.users);

router.get("/user/:userId", auth, Methods.userId);

router.put("/user/:userId", auth, Methods.updateUser);

router.post("/user", auth, Methods.createUser);

router.delete("/user", (req, res) => {
  return res.json({ resp: "Delete users" });
});

router.delete("/user/:userId", auth, Methods.deleteUser);

//---Employees routes
router.get("/employee", auth, auth, Methods.employee);

router.get("/employee/:employeeId", auth, Methods.employeeId);

router.put("/employee/:employeeId", auth, Methods.updateEmployee);

router.post("/employee", auth, Methods.createEmployee);

router.delete("/employee/:employeeId", auth, Methods.deleteEmployee);

router.delete("/employee", (req, res) => {
  return res.json({ resp: "Delete employee" });
});

//--- Bussiness routes
router.get("/bussiness", auth, Methods.bussiness);

router.get("/bussiness/:bussinessId", auth, Methods.bussinessId);

router.put("/bussiness/:bussinessId", auth, Methods.updateBussiness);

router.post("/bussiness", auth, Methods.createBussiness);

router.delete("/bussiness", (req, res) => {
  return res.json({ resp: "Delete bussiness" });
});
router.delete("/bussiness/:bussinessId", auth, Methods.deleteBussiness);

//---Schedule routes
router.get("/schedule", auth, Methods.schedule);

router.get("/schedule/:scheduleId", auth, Methods.scheduleId);

router.put("/schedule/:scheduleId", auth, Methods.updateSchedule);

router.post("/schedule", auth, Methods.createSchedule);

router.delete("/schedule", (req, res) => {
  return res.json({ resp: "Delete shedule" });
});
router.delete("/schedule/:scheduleId", auth, Methods.deleteSchedule);

//---Day Of Week
router.get(
  "/employeeSchedule/by-employee/:employeeId",
  auth,
  Methods.getSchedulesByEmployee
);

router.get(
  "/employeeSchedule/:employeeScheduleId",
  auth,
  Methods.employeeScheduleId
);

router.post("/employeeSchedule", auth, Methods.createEmployeeSchedule);

router.put(
  "/employeeSchedule/:employeeScheduleId",
  auth,
  Methods.updateEmployeeSchedule
);

router.delete(
  "/employeeSchedule/:scheduleId",
  auth,
  Methods.deleteEmployeeSchedule
);

//---Assists routes
router.get("/assists", auth, Methods.assists);

router.get("/assists/:assistsId", auth, Methods.assistsId);

router.put("/assists/:assistsId", auth, Methods.updateAssists);

router.post("/assists", auth, Methods.createAssists);

router.delete("/assists", (req, res) => {
  return res.json({ resp: "Delete assists" });
});
router.delete("/assists/:assistsId", auth, Methods.deleteAssist);

//---Position routes
router.get("/position", auth, Methods.position);

router.get("/position/:positionId", auth, Methods.positionId);

router.put("/position/:positionId", auth, Methods.updatePosition);

router.post("/position", auth, Methods.createPosition);

router.delete("/position", (req, res) => {
  return res.json({ resp: "Delete position" });
});
router.delete("/position/:positionId", auth, Methods.deletePosition);

//---Roles routes
router.get("/roles", auth, Methods.roles);

router.get("/roles/:roleId", auth, Methods.roleId);

router.put("/roles/:roleId", auth, Methods.updateRole);

router.post("/roles", auth, Methods.createRole);

router.delete("/roles/:roleId", auth, Methods.deleteRole);

module.exports = router;
