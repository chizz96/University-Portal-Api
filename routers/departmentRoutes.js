const express = require('express');
const router = express.Router();

const {createDepartment, getOneDepartment, getAllDepartments, updateDepartment, deleteDepartment} = require('../controllers/departmentController.js')


const { createDepartmentValidation, updateDepartmentValidation } = require('../Middleware/departmentValidation.js')

router.post('/departments', createDepartmentValidation,createDepartment);
router.get('/departments', getAllDepartments)
router.get('/onedepartment/:id', getOneDepartment)
router.patch('/updatedepartment/:id', updateDepartmentValidation, updateDepartment)
router.delete('/deletedepartment/:id', deleteDepartment)


module.exports = router