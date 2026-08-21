const express = require("express")
const { register, login } = require("../controllers/authController")

const router = express.Router()


router.post("/register", register)
router.get("/login", login)
// router.post("/register", register)



module.exports = router