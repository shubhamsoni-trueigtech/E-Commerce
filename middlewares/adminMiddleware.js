 const adminMiddleware = (req,res,next) => {

    const userRole = req.user.role 

    if(userRole !== "admin"){
      
      return res.status(403).json({
         success : false,
         message : "Only Admin can access this route"
      })

      
    }
    
    next()
 }

 module.exports = adminMiddleware