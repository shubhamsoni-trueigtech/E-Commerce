require("dotenv").config()
const express = require("express")
const db = require("./models")
const colors = require("colors")
const userRoutes = require("./routes/userRoutes")
const authRoutes = require("./routes/authRoutes")
const productRoutes = require("./routes/productRoutes")
const categoryRoutes = require("./routes/categoryRoute")
const cartRoutes = require("./routes/cartRoutes")
const cartItemRoutes = require("./routes/cartItemRoutes")
const productVariantRoutes = require("./routes/productvarientRoute")
const orderRoutes = require("./routes/orderRoutes")


const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({
    extended : true
}))
app.use("/uploads", express.static("uploads"))


app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/product", productRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/cartItem", cartItemRoutes)
app.use("/api/ProductVariant", productVariantRoutes)
app.use("/api/orders", orderRoutes)
 

const serverStart = async() => {
    try {
        
        await db.sequelize.authenticate().then(() => {
            console.log(`DATABASE CONNECTED `.bgGreen.bold)
        })

        app.listen(PORT, () => {
            console.log(`Server is running on PORT : ${PORT} `.bgYellow.bold)
        })

    } catch (error) {
        console.log(`Database connection failed`.bgRed, error)       
    }

}


serverStart()