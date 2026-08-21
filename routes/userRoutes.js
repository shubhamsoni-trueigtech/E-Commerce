const express = require("express")
const { createUser, getUsers, updateUser, deleteUser, getUser } = require("../controllers/userController")
const authMiddleware = require("../middlewares/authMiddleware")
const adminMiddleware = require("../middlewares/AdminMiddleware")
const sellerMiddleware = require("../middlewares/sellerMiddlewrae")

const router = express.Router()


router.post("/", authMiddleware, createUser)
router.get("/",authMiddleware, adminMiddleware ,getUsers)
router.get("/:id", authMiddleware  ,getUser)
router.put("/:id", authMiddleware  , updateUser)
router.delete("/:id", authMiddleware ,adminMiddleware , deleteUser)



module.exports = router 