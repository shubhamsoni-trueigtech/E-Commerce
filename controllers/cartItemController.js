const {CartItem , Cart} = require("../models")


const createCartItem = async(req,res) => {
console.log(req.body)
    try {
         
        const {productId,quantity,variantId , price} = req.body

        const userId = req.user.id 

        const cartExit = await Cart.findOne({
            where : {userId}
        })

        if(!cartExit){
            return res.status(404).json({
                success : false,
                message : "Cart Not Found"
            })
        }
 
        const cartItem = await CartItem.create({
            cartId : cartExit.id,
            productId,
            variantId,
            quantity,
            price
        })

        res.status(201).json({
            success : true,
            message : "Cart Item Created",
            data : cartItem
        })

    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }

}


const getCartItem = async(req,res) => {

    try {
           const cartId = req.params.id

    const cartItem = await CartItem.findOne({
        where : {
            cartId
        }
    }) 

    if(!cartItem){
        return res.status(404).json({
            success : false,
            message : "Cart Item Not Found"
        })
    }

    res.status(200).json({
        success : true,
        message : "Cart Item Fetched",
        data : cartItem
    })

    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }

 
}


const updateCartItem = async (req, res) => {

    try {
        const { quantity } = req.body;

        const cart = await Cart.findOne({
            where: {
                userId: req.user.id
            }
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        const cartItem = await CartItem.findOne({
            where: {
                id: req.params.id,
                cartId: cart.id
            }
        });

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: 'Cart item not found'
            });
        }

        await cartItem.update({
            quantity
        });

        res.status(200).json({
            success: true,
            message: 'Cart item updated successfully',
            data: cartItem
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }

};


const deleteCartItem = async (req, res) => {

    try {
        const cart = await Cart.findOne({
            where: {
                userId: req.user.id
            }
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        const cartItem = await CartItem.findOne({
            where: {
                id: req.params.id,
                cartId: cart.id
            }
        });

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: 'Cart item not found'
            });
        }

        await cartItem.destroy();

        res.status(200).json({
            success: true,
            message: 'Cart item deleted successfully'
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }

};




module.exports = {
    createCartItem,
    getCartItem,
    updateCartItem,
    deleteCartItem
}
