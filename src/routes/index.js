import {Router} from 'express';
import { json } from 'body-parser';

const router = Router()

router.get("/hola", (req, res) => {
    return res.json({respo: 'hola'})
})

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
    let value= req.params.bussinessId;
    res.json('Delete bussiness Id:'+value);
})

//---Schedule routes
router.get('/shedule', (req, res) => {
    return res.json({resp: 'GET shedule'})
})
router.get('/shedule/:sheduleId', (req, res) => {
    req.params;
    res.json(req.params);
})
router.put('/shedule', (req, res) => {
    return res.json({resp: 'GET shedule'})
})
router.put('/shedule/:sheduleId', (req, res) => {
    req.params;
    res.json(req.params);
})
router.post('/shedule', (req, res) => {
    return res.json({resp: 'POST shedule'})
})
router.post('/shedule/:sheduleId', (req, res) => {
    let value = req.params.sheduleId;
    res.json('Post shodule ID:' +value);
})
router.delete('/shedule', (req, res) => {
    return res.json({resp: 'POST shedule'})
})
router.delete('/shedule/:sheduleId', (req, res) => {
    let value = req.params.sheduleId;
    res.json('Post shodule ID:' +value);
})

module.exports = router