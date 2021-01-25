import { Router } from "express";
import { Methods } from "../methods";
import auth from "../middleware/auth";


const router = Router();

//---AUTH routes
router.post("/auth/register", auth, Methods.register);
router.post("/auth/login", Methods.login);
//---Assistance routes
router.get("/sign/:identification",auth, Methods.sign);
router.get("/assistances-of-date/:date/:employeeId", Methods.getAssistancesOfDay);

//--- Permit
router.post("/permit", Methods.createPermit);
router.get("/permit", Methods.permit);
router.get("/permit/:permitId", Methods.permitId);
router.put("/permit/:permitId", Methods.updatePermit);
router.delete("/permit/:permitId", Methods.deletePermit);

//--- Module
router.post("/module", Methods.createModule);
router.get("/module", Methods.modules);
router.get("/module/:moduleId", Methods.moduleId);
router.put("/module/:moduleId", Methods.updateModule);
router.delete("/module/:moduleId", Methods.deleteModule);

//--- RolePermit
router.post("/rolePermit", Methods.createRolePermit);
router.get("/rolePermit", Methods.rolePermit);
router.get("/rolePermit/:rolePermitId", Methods.rolePermitId);
router.put("/rolePermit/: rolePermitId", Methods.updateRolePermit);
router.delete("/rolePermit/:rolePermitId", Methods.deleteRolePermit);

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
router.get("/employee", auth, Methods.employee);  

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
router.get("/roles", Methods.roles);

router.get("/roles/:roleId", Methods.roleId);

router.put("/roles/:roleId", Methods.updateRole);

router.post("/roles", Methods.createRole);

router.delete("/roles/:roleId", Methods.deleteRole);

module.exports = router;
