const {Cart, CartItem ,Order, OrderItem} = require("../models")


const createOrder = async(req,res,next) => {

    try {
        
        const { shippingAddress } = req.body

        const cart = await Cart.findOne({
            where : {
                userId : req.user.id
            },

            include : [
                {
                    model : CartItem,
                    as : "cartItems"
                }
            ]
        })

        if(!cart){
            return res.status(404).json({
                success : false,
                message : "Cart Not Found"
            })
        }

        if(cart?.cartItems?.length === 0){
            return res.status(400).json({
                success : false,
                message : "Cart is Empty"
            })
        }

        let totalAmount = 0

        for(const item of cart.cartItems){
            totalAmount = totalAmount + Number(item.price) * item.quantity
        }

 
        const order = await Order.create({
            userId : req.user.id,
            totalAmount : totalAmount,
            status : "pending",
            shippingAddress : shippingAddress
        })

        for(const item of cart.cartItems){
            
            await OrderItem.create({
                orderId : order.id,
                variantId : item.variantId,
                quantity : item.quantity,
                price : item.price
            })

        } 


        res.status(200).json({
            success : true,
            message : "Order Created Succesfully",
            data : order
        })

    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }

}


 
module.exports = {
    createOrder
}