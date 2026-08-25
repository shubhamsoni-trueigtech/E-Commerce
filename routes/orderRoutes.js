const express = require("express")
const validate = require("../middlewares/validate")
const {validateOrder} = require("../validators/orderValidator")
const { createOrder } = require("../controllers/orderControllers")
const authMiddleware = require("../middlewares/authMiddleware")


const router = express.Router()


router.post("/checkout", authMiddleware ,validate(validateOrder), createOrder)



 

module.exports = router
