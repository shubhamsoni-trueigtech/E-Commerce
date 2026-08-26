const {Cart, CartItem ,Order, OrderItem, ProductVariant} = require("../models")


const createOrder = async(req,res,next) => {

    const transaction = await Order.sequelize.transaction()

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

            const variant = await ProductVariant.findByPk(item.variantId)

            if(!variant){
                return res.status(400).json({
                    success : false,
                    message : "Product Variant Not Found"
                })
            }

            if(variant.stock < item.quantity){
                return res.status(400).json({
                    success : false,
                    message : `Only ${variant.stock} item is available`
                })
            }
            
            totalAmount = totalAmount + Number(item.price) * item.quantity
        }

  
        const order = await Order.create({
            userId : req.user.id,
            totalAmount : totalAmount,
            status : "pending",
            shippingAddress : shippingAddress
        },{
            transaction
        })
 
        for(const item of cart.cartItems){
            console.log("CART ITEM:", item.toJSON());
            await OrderItem.create({
                orderId : order.id,
                productId : item.productId,
                variantId : item.variantId,
                quantity : item.quantity,
                price : item.price
            },{
                transaction
            })

            const variant = await ProductVariant.findByPk(item.variantId)

            await variant.update({
                stock : variant.stock - item.quantity
            },{
                transaction
            })

        } 

        await CartItem.destroy({
            where : {
                cartId : cart.id 
            },
            transaction
        })
 
        await transaction.commit()

        res.status(200).json({
            success : true,
            message : "Order Created Succesfully",
            data : order
        })

    } catch (error) {
        await transaction.rollback() 
        res.status(400).json({
            success : false,
            message : error.message
        })
    }

}


const getOrder = async(re,res,next) => {



}


 
module.exports = {
    createOrder
}