const {Cart,CartItem,Product,ProductVariant, User} = require('../models');


const createCart = async(req, res) => {
console.log(req.user)
    try {
        
        const userId = req.user.id

        const cartExist = await Cart.findOne({
            where : {userId}
        })

        if(cartExist){
            return res.status(200).json({
                success : true,
                message : "Cart Already Exist",
                // data : cartExist
            })
        }

        const cart = await Cart.create({userId})

        res.status(200).json({
            success : true,
            message : "Cart Created Successfull",
            data : cart
        })

    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }

}

 
const getCart = async(req,res) => {
// console.log( re)
    try {
        
        const cart = await Cart.findOne({
            where : {
                userId : req.user.id
            },

 
            include : [
                {
                    model : User,
                    attributes : ["id", "name", "email"]
                },
                {
                    model : CartItem,
                    as : "cartItems",
                    include : [
                        {
                            model : ProductVariant,
                            as : "variant",
                            attributes : ["id","color","size","price","stock","sku"],

                            include : [

                                {
                                    model : Product,
                                    attributes : ["id", "name"]
                                }

                            ]

                        }
                    ]
                }
            ]
        })
        

        if(!cart){
            return res.status(404).json({
                success : false,
                message : "Cart Not Found"
            })
        }

        res.status(200).json({
            success : true,
            message : "Cart fetched successfully",
            data : cart
        })

    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }

}


module.exports = {
    createCart,
    getCart
}