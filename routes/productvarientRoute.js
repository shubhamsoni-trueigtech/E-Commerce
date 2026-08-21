const express = require("express");

const { createVarient } = require("../controllers/productVarientController");
const authMiddleware = require("../middlewares/authMiddleware");
const sellerMiddleware = require("../middlewares/sellerMiddlewrae");

const router = express.Router();


router.post("/:productId/variants", authMiddleware,sellerMiddleware ,createVarient);


module.exports = router;