import {Router} from 'express';
import { json } from 'body-parser';

const router = Router()

//---Users routes
router.get('/user', (req, res) => {
    return res.json({resp: 'users'})
})
router.get('/user/:userId', (req, res) => {
    req.params;
    res.json(req.params);
})
router.put('/user', (req, res) => {
    return res.json({resp: 'Update users'})
})
router.put('/user/:userId', (req, res) => {
    req.params;
    res.json(req.params);
})
router.post('/user', (req, res) =>{
    return res.json({mensaje: req.body})
})
router.post('/user/:userId', (req, res) => {
    req.params;
    res.json(req.params);
})
router.delete('/user', (req, res) => {
    return res.json({resp: 'Delete users'})
})
router.delete('/user/:userId', (req, res) => {
    req.params;
    res.json(req.params);    
})

//---Emploees routes
router.get('/employee', (req, res) => {
    return res.json({resp: 'Employee GET'})
})
router.get('/employee/:employeeId', (req, res) => {
    req.params;
    res.json(req.params);
})
router.put('/employee', (req, res) => {
    return res.json({resp: 'Update employee'})
})
router.put('/employee/:employeeId', (req, res) => {
    let value= req.params.employeeId;
    res.json('llego el id '+value);
})
router.post('/employee', (req, res) =>{
    return res.json({mensaje: req.body.message})
})
router.post('/employee/:employeeId', (req, res) => {
    req.params;
    res.json(req.params);
})
router.delete('/employee', (req, res) => {
    return res.json({resp: 'Delete employee'})
})
router.delete('/employee/:employeeId', (req, res) => {
    req.params;
    res.json(req.params);    
})

//--- Bussiness routes
router.get('/bussiness', (req, res) => {
    return res.json({resp: 'GET bussiness'})
})
router.get('/bussiness/:bussinessId', (req, res) => {
    req.params;
    res.json(req.params);
})
router.put('/bussiness', (req, res) => {
    return res.json({resp: 'Update bussiness'})
})
router.put('/bussiness/:bussinessId', (req, res) => {
    req.params;
    res.json(req.params);
})
router.post('/bussiness', (req, res) => {
    return res.json({resp: 'Post bussiness'})
})
router.post('/bussiness/:bussinessId', (req, res) => {
    let value= req.params.bussinessId;
    res.json('Post bussiness Id:'+value);
})
router.delete('/bussiness', (req, res) => {
    return res.json({resp: 'Delete bussiness'})
})
router.delete('/bussiness/:bussinessId', (req, res) => {
    req.params;
    res.json(req.params);
})

//---Schedule routes
router.get('/schedule', (req, res) => {
    return res.json({resp: 'GET shedule'})
})
router.get('/schedule/:scheduleId', (req, res) => {
    req.params;
    res.json(req.params);
})
router.put('/schedule', (req, res) => {
    return res.json({resp: 'GET schedule'})
})
router.put('/schedule/:scheduleId', (req, res) => {
    req.params;
    res.json(req.params);
})
router.post('/schedule', (req, res) => {
    return res.json({resp: 'POST schedule'})
})
router.post('/schedule/:scheduleId', (req, res) => {
    let value = req.params.scheduleId;
    res.json('Post shodule ID:' +value);
})
router.delete('/schedule', (req, res) => {
    return res.json({resp: 'Delete shedule'})
})
router.delete('/schedule/:scheduleId', (req, res) => {
    let value = req.params.scheduleId;
    res.json('Delete schodule ID:' +value);
})

//--- Status rouetes
router.get('/status', (req, res) => {
    return res.json({resp: 'GET Status'})
})
router.get('/status/:statusId', (req, res) => {
    let value = req.params.statusId;
    res.json('Get status ID:' + value);
})
router.put('/status', (req, res) => {
    return res.json({resp: 'Update Status'})
})
router.put('/status/:statusId', (req, res) => {
    let value = req.params.statusId;
    res.json('Update status ID:' + value);
})
router.post('/status', (req, res) => {
    return res.json({resp: 'Post Status'})
})
router.post('/status/:statusId', (req, res) => {
    let value = req.params.statusId;
    res.json('Post status ID:' + value);
})
router.delete('/status', (req, res) => {
    return res.json({resp: 'DELETE Status'})
})
router.delete('/status/:statusId', (req, res) => {
    let value = req.params.statusId;
    res.json('Delete status ID:' + value);
})

//---Assists routes
router.get('/assists', (req, res) => {
    return res.json({resp: 'GET assists'})
})
router.get('/assists/:assistsId', (req, res) => {
    let value = req.params.assistsId;
    res.json('Get assists ID:' + value);
})
router.put('/assists', (req, res) => {
    return res.json({resp: 'Update assists'})
})
router.put('/assists/:assistsId', (req, res) => {
    let value = req.params.assistsId;
    res.json('Update assists ID:' + value);
})
router.post('/assists', (req, res) => {
    return res.json({resp: 'Post assists', message: req.body || 'No Body'})
})
router.post('/assists/:assistsId', (req, res) => {
    let value = req.params.assistsId;
    res.json('Post assists ID:' + value);
})
router.delete('/assists', (req, res) => {
    return res.json({resp: 'Delete assists'})
})
router.delete('/assists/:assistsId', (req, res) => {
    let value = req.params.assistsId;
    res.json('Delete assists ID:' + value);
})

//---Position routes
router.get('/position', (req, res) => {
    return res.json({ resp: 'Get position'})
})
router.get('/position/:positionId', (req, res) => {
    let value = req.params.positionId;
    res.json('Get position ID:' + value);
})
router.put('/position', (req, res) => {
    return res.json({ resp: 'Update position'})
})
router.put('/position/:positionId', (req, res) => {
    let value = req.params.positionId;
    res.json('Update position ID:' + value);
})
router.post('/position', (req, res) => {
    return res.json({ resp: 'Post position', message: req.body.message || 'No body'})
})
router.post('/position/:positionId', (req, res) => {
    let value = req.params.positionId;
    res.json('Post position ID:' + value);
})
router.delete('/position', (req, res) => {
    return res.json({ resp: 'Delete position'})
})
router.delete('/position/:positionId', (req, res) => {
    let value = req.params.positionId;
    res.json('Delete position ID:' + value);
})

//---Roles routes
router.get('/roles', (req, res) => {
    return res.json({resp: 'Get roles'})
})
router.get('/roles/:rolesId', (req, res) => {
    let value = req.params.rolesId;
    res.json('Get roles ID:'+ value);
})
router.put('/roles', (req, res) => {
    return res.json({resp: 'Update roles'})
})
router.put('/roles/:rolesId', (req, res) => {
    let value = req.params.rolesId;
    res.json('Update roles ID:'+ value);
})
router.post('/roles', (req, res) => {
    return res.json({resp: 'Post roles', message: req.body.message || 'No body'})
})
router.post('/roles/:rolesId', (req, res) => {
    let value = req.params.rolesId;
    res.json('Post roles ID:'+ value);
})
router.delete('/roles', (req, res) => {
    return res.json({resp: 'Delete roles'})
})
router.delete('/roles/:rolesId', (req, res) => {
    let value = req.params.rolesId;
    res.json('Delete roles ID:'+ value);
})

module.exports = router