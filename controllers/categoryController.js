const {Category} = require("../models")


const createCategory = async(req,res) => {

    try {
        
        const category = await Category.create(req.body)

        res.status(201).json({
            success : true,
            message : "Category Created Succesfull",
            data : category
        })

    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })   
    }

}


module.exports = {
    createCategory
}