const courseModel = require('../models/courses')

const departmentModel = require('../models/department')


exports.createCourse = async(req, res)=> {
    try{
        const { departmentId } = req.params
        const { courseCode, title, creditUnits } = req.body;

        const department = await departmentModel.findById(departmentId)

        if(!department){
            return res.status(404).json({message:"Department not found"})
        }

        const course = await courseModel.findOne({courseCode})

        if (course){
            return res.status(400).json({message: "Course already exist"})

        }

        const data = {
            courseCode, 
            title, 
            creditUnits,
            departmentId
        }

        const newCourse = new courseModel(data)

        department.courses.push(newCourse._id)

        await newCourse.save()
        await department.save()


       return res.status(201).json({messsage:"Course successfully created", data:newCourse})

    }catch(error){
        return res.status(500).json({
            error:error.message
        })
    }
}

exports.getAllCourse = async(req, res)=>{
    try{
        const allCourse = await courseModel.find().populate({path: 'departmentId', select: 'name faculty'})
        return res.status(200).json({message:`The total number of all course are ${allCourse.length}`, data: allCourse
        })
    }catch(error){
        return res.status(500).json({
            error:error.message
        })

    }
}


exports.getOneCourse = async(req,res) => {
    try {
        const { id } = req.params;
        const oneCourse = await courseModel.findById(id).populate({path: 'departmentId', select: 'name faculty'})

        if(!oneCourse){
                return res.status(404).json({message: "Course not found"})
            }

        return res.status(200).json({
            message: "Course found successfully", data:oneCourse
        })

    } catch (error) {
        return res.status(500).json({
            error:error.message
        })
    }
}


exports.updateCourse = async (req, res)=>{
    try {
        const { id } = req.params
        const { courseCode, title, creditUnits } = req.body

        const course = await courseModel.findById(id)

        if(!course){
            return res.status(404).json({message:"Course not found"
            })
        }

        const data = {
            courseCode, 
            title, 
            creditUnits
        }

        const updateCourse = await courseModel.findByIdAndUpdate(id, data, {new:true})
        res.status(200).json({messsage:"Course successfully updated", data:updateCourse})

    } catch (error) {
        return res.status(500).json({
            error:error.message
        })
    }
}


exports.deleteCourse = async (req, res) => {
    try{
        const { id } = req.params
        const course = await courseModel.findById(id)

        if (!course){
           return res.status(404).json({message: "Course not found"})
        }

        await courseModel.findByIdAndDelete(id)
        return res.status(200).json({message : "Course successfully deleted"}) 
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

