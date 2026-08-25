const express = require("express")
const upload = require("../middlewares/uploads")
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require("../controllers/productController")
const sellerMiddleware = require("../middlewares/sellerMiddlewrae")
const authMiddleware = require("../middlewares/authMiddleware")

const router = express.Router()


router.post("/create",authMiddleware, sellerMiddleware , upload.array("image", 5) ,createProduct)
router.get("/", getProducts)
router.get("/:id", getProduct)
router.put("/:id", authMiddleware,sellerMiddleware ,upload.array("image", 5) , updateProduct)
router.delete("/:id", authMiddleware,sellerMiddleware ,deleteProduct)


 

module.exports = router 