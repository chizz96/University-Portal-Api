const express = require('express');
const router = express.Router();

const {createCourse,    getAllCourse, getOneCourse, updateCourse, deleteCourse} = require ('../controllers/courseController.js')

const {createCourseValidation, updateCourseValidation } = require('../Middleware/courseValidation.js')

router.post('/courses/:departmentId', createCourseValidation, createCourse);
router.get('/courses/',    getAllCourse)
router.get('/oneCourse/:id', getOneCourse)
router.patch('/updateCourse/:id', updateCourseValidation, updateCourse,)
router.delete('/deleteCourse/:id', deleteCourse)

module.exports = router