const express = require("express")
const authMiddleware = require("../middlewares/authMiddleware")
const { createCartItem, getCartItem, updateCartItem, deleteCartItem } = require("../controllers/cartItemController")


const router = express.Router()



router.post("/", authMiddleware ,createCartItem)
router.get("/:id", authMiddleware ,getCartItem)
router.put("/:id", authMiddleware ,updateCartItem)
router.delete("/:id", authMiddleware ,deleteCartItem)


module.exports = router