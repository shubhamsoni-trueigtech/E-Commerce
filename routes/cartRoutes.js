const express = require("express")
const {createCart, getCart} = require("../controllers/cartController")
const authMiddleware = require("../middlewares/authMiddleware")

const router = express.Router()


router.post("/", authMiddleware,createCart)
router.get("/", authMiddleware,getCart)




 

module.exports = router