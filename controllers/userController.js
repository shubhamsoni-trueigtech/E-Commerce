const {User} = require("../models")


const createUser = async(req,res) => {
 console.log("run")
    try {
        
        const user = await User.create(req.body)

        res.status(201).json({
            success : true,
            data : user
        })
 
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }

}

const getUsers = async(req,res) => {

    try {      
        const users = await User.findAll()

        res.status(200).json({
            success : true,
            data : users
        })

    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }

}

const getUser = async(req,res) => {

    try {      
        const id = req.params.id
        const user = await User.findByPk(id)

        res.status(200).json({
            success : true,
            data : user
        })

    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }

}

const updateUser = async(req,res) => {

    try {      
        const id = req.params.id
        const user = await User.findByPk(id)

        if(!user){
            return res.status(404).json({
                success : false,
                message : "User Not Found"
            })
        }

        await user.update(req.body)

        res.status(200).json({
            success : true,
            data : user
        })

    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }

}

const deleteUser = async(req,res) => {

    try {      
        const id = req.params.id
        const user = await User.findByPk(id)

        if(!user){
            return res.status(404).json({
                success : false,
                message : "User Not Found"
            })
        }

        await user.destroy()

        res.status(200).json({
            success : true,
            data : user
        })

    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }

}


module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}