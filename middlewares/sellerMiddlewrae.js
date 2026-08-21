const sellerMiddleware = (req,res,next) => {

    const userRole = req.user.role

    if(userRole !== "seller" && userRole !== "admin"){

        return res.status(403).json({
            success : false,
            message : "Only Seller and Admin can Access this route"
        })

    }

    next()

}


module.exports = sellerMiddleware