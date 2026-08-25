const validate = (validator) => {

    return (req, res ,next) => {

        const valid = validator(req.body)

        if(!valid){
            
            return res.status(400).json({
                success : false,
                message : "Validation failed",
                errors : validator.errors
            })

        }

        next()

    }

}


module.exports = validate
