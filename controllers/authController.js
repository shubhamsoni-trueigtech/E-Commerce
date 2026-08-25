const {User} = require("../models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const register = async(req,res) => {

    try {
        
        const {name, email, password, role} = req.body

        const userExist = await User.findOne({
            where : {email}
        })

        if(userExist){
            return res.status(400).json({
                success : false,
                message : "User Already Exist's"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            name,
            email,
            password : hashedPassword,
            role
        })

        res.status(201).json({
            success : true,
            message : "User Registered succesfully",
            data : {
                id : user.id,
                name : user.name,
                email : user.email,
                role : user.role
            }
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success : false,
            message : error
        })
    }

}


const login = async(req,res) => {
console.log("run")
    try {
        
    const {email, password} = req.body

    const userExist = await User.findOne({
        where : {email}
    })

    if(!userExist){
        return res.status(401).json({
            success : false,
            message : "User Doesn't Exist's"
        })
    }

    const isPasswordCorrect = await bcrypt.compare(password , userExist.password)

    if(!isPasswordCorrect){
        return res.status(401).json({
            success : false,
            message : "Password is incorrect"
        })
    }

    const token = jwt.sign(
        {
            id : userExist.id,
            role : userExist.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn : "1d"
        }
    )
 
    // localStorage.setItem("token", token)

    res.status(200).json({
        success : true,
        message : "Login Successfull",
        token : token,
        user : userExist
    })

    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }

}





module.exports = {
    register,
    login
}