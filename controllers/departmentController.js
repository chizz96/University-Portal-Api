const departmentModel = require('../models/department')


exports.createDepartment = async(req, res)=>{
    try{

        const{ name, faculty } = req.body;

        const department = await departmentModel.findOne({name});
    

     if (department){
        return res.status(400).json({
            message: 'Department already exists'
        })
     }

     const newDepartment = await departmentModel.create({
        name,
        faculty
     })

     return res.status(201).json({
        message:'Department created successfully',
        data: newDepartment
     })


    }catch(error){
        return res.status(500).json({
            error:error.message
          })
    }
}


exports.getAllDepartments = async (req, res) => {
     try{
        const department = await departmentModel.find().populate({path:'courses', select:'courseCode title creditUnits'})
        return res.status(200).json({
            message: `The Total number of the Department is: ${department.length}`,
            data:department
        })
     
     } catch (error) {
       return res.status(500).json({
            error:error.message
        })
    }

}

exports.getOneDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await departmentModel.findById(id).populate({path:'courses', select:'courseCode title creditUnits'}) 

        if (!department){
            return res.status(400).json({
                message: "Department not found"
            })
        } 
        return res.status(200).json({
            message: 'Department found',
            data: department
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

}


exports.updateDepartment = async(req, res)=>{
    try{
        const { id } = req.params
        const { name, faculty } = req.body
        const department = await departmentModel.findById(id)

        if (!department){
            return res.status(400).json({
                message: "Department not found"
            })
        }

        const data = {
            name,
            faculty
        }

        const updateDepartment =  await departmentModel.findByIdAndUpdate(id, data, {new:true})

        res.status(200).json({message: "Department successfully updated", data:updateDepartment})


    }catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

exports.deleteDepartment = async (req, res)=> {
    try {
        const { id } = req.params;

        const department = await departmentModel.findById(id)

        if (!department){
            return res.status(400).json({
                message: "Department not found"
            })
        }

        await departmentModel.findByIdAndDelete(id)

     
     return res.status(200).json({
        message:"Department deleted successfully"
     })
    } catch (error) {
       return res.status(400).json({
            message:error.message
        })
    }
}




