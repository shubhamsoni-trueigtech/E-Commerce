const express = require("express")
const { createCategory } = require("../controllers/categorycontroller")
const authMiddleware = require("../middlewares/authMiddleware")
const adminMiddleware = require("../middlewares/AdminMiddleware")
const sellerMiddleware = require("../middlewares/sellerMiddlewrae")



const router = express.Router()


router.post("/create",authMiddleware, sellerMiddleware,createCategory)
// router.GET(/api/categories)
// router.GET(/api/categories/:id)
// router.PUT(/api/categories/:id)
// router.DELETE(/api/categories/:id)

module.exports = router
