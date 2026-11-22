const Joi = require('joi');



const createDepartmentValidation = (req,res, next) =>{
    const createDepartmentSchema = Joi.object({
        name: Joi.string().required(),

        faculty: Joi.string().required()
    })


    const { error } = createDepartmentSchema.validate(req.body);

            
        if (error) {
            return res.status(400).json({message: error.details[0].message})
        }


        next()

}


const updateDepartmentValidation = (req,res,next) =>{
    const updateDepartmentSchema = Joi.object({
        name: Joi.string().optional(),

        faculty: Joi.string().optional()
    })


    const { error } = updateDepartmentSchema.validate(req.body);

            
        if (error) {
            return res.status(400).json({message: error.details[0].message})
        }


        next()



}


module.exports = {
    createDepartmentValidation,
    updateDepartmentValidation
}