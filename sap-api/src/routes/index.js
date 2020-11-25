import { Router } from 'express';
import { json } from 'body-parser';
import { Methods } from '../methods';

const router = Router()

//---Users routes
router.get('/user', Methods.users)

router.get('/user/:userId', Methods.userId);

router.put('/user/:userId', Methods.updateUser)

router.post('/user', Methods.createUser)


router.delete('/user', (req, res) => {
    return res.json({ resp: 'Delete users' })
})

router.delete('/user/:userId', Methods.deleteUser)

//---Employees routes
router.get('/employee', Methods.employee);

router.get('/employee/:employeeId', Methods.employeeId);

router.put('/employee/:employeeId', Methods.updateEmployee);

router.post('/employee', Methods.createEmployee);

router.delete('/employee/:employeeId', Methods.deleteEmployee);

router.delete('/employee', (req, res) => {
    return res.json({ resp: 'Delete employee' })
})

//--- Bussiness routes
router.get('/bussiness', Methods.bussiness)

router.get('/bussiness/:bussinessId', Methods.bussinessId);

router.put('/bussiness/:bussinessId', Methods.updateBussiness)

router.post('/bussiness', Methods.createBussiness)


router.delete('/bussiness', (req, res) => {
    return res.json({ resp: 'Delete bussiness' })
})
router.delete('/bussiness/:bussinessId', Methods.deleteBussiness);

//---Schedule routes
router.get('/schedule', Methods.schedule);

router.get('/schedule/:scheduleId', Methods.scheduleId);

router.put('/schedule/:scheduleId', Methods.updateSchedule);

router.post('/schedule', Methods.createSchedule);

router.delete('/schedule', (req, res) => {
    return res.json({ resp: 'Delete shedule' })
})
router.delete('/schedule/:scheduleId', Methods.deleteSchedule);

//---Assists routes
router.get('/assists', Methods.assists);

router.get('/assists/:assistsId', Methods.assistsId);

router.put('/assists/:assistsId', Methods.updateAssists);

router.post('/assists', Methods.createAssists);

router.delete('/assists', (req, res) => {
    return res.json({ resp: 'Delete assists' })
})
router.delete('/assists/:assistsId', Methods.deleteAssist);

//---Position routes
router.get('/position', Methods.position);

router.get('/position/:positionId', Methods.positionId);

router.put('/position/:positionId', Methods.updatePosition);

router.post('/position', Methods.createPosition);

router.delete('/position', (req, res) => {
    return res.json({ resp: 'Delete position' })
})
router.delete('/position/:positionId', Methods.deletePosition);

//---Roles routes
router.get('/roles', Methods.roles);

router.get('/roles/:roleId', Methods.roleId);

router.put('/roles/:roleId', Methods.updateRole);

router.post('/roles', Methods.createRole);

router.delete('/roles/:roleId', Methods.deleteRole);

module.exports = router