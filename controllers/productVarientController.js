const {ProductVariant , Product} = require("../models")



const createVarient = async(req,res) => {

    try {

        const {productId} = req.params

         const {color,size,sku,price,stock,status} = req.body;

        const product = await Product.findByPk(productId)

        if(!product){
            return res.status(400).json({
                success : false,
                message : "Product Not Found"
            })
        }
        
        const varient = await ProductVariant.create({
            productId: productId,
            color: color,
            size: size,
            sku: sku,
            price: price,
            stock: stock,
            status: status|| "active"
     })

        res.status(201).json({
            success : true,
            message : "Varient Created Successfully",
            data : varient
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success : false,
            message : error.message
        })
    }

}

 
module.exports = {
    createVarient
}
