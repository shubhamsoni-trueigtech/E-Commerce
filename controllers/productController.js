const { Op, where } = require("sequelize")
const fs = require("fs")
const {Product ,ProductImage, Category} = require("../models")


const createProduct = async(req, res) => {

    const transaction = await Product.sequelize.transaction()
 
    try {
        console.log("BODY",req.body)
        console.log("FILE", req.files)

        const product = await Product.create({
             name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            sku: req.body.sku,
            status: req.body.status,
            categoryId: req.body.categoryId
        }, {
            transaction
        })


        for(const file of req.files){
             await ProductImage.create({
            productId : product.id ,
            imageUrl : file.path
        }, {
             transaction
        })
        }
        
 
        await transaction.commit()

        res.status(201).json({
            succes : true,
            message : "Product Created Successfully",
            data : product
        })

    } catch (error) {

        await transaction.rollback()

        res.status(400).json({
            succes : false,
            message : error.message
        })
    }

}

  
const getProducts = async(req,res) => {
    try {
        
       const {categoryId,minPrice,maxPrice,search,
        sortBy = 'createdAt',
        order = 'desc',
        page = 1,
        limit = 10
       } = req.query

       const where = {}

       if(categoryId){
            where.categoryId = categoryId
       }

       if(minPrice || maxPrice){
            where.price = {}

            if(minPrice){
                where.price[Op.gte] = minPrice
            }

            if(maxPrice){
                where.price[Op.lte] = maxPrice
            }
       }

       if(search){
            where.name = {
                [Op.iLike] : `%${search}%`
            }
       }

       const pageNumber = Number(page)
       const pageLimit = Number(limit)
       const offset = (pageNumber - 1) * pageLimit

       const products = await Product.findAndCountAll({
        distinct: true,
        where,
        include : [
            {
                model : Category,
                attributes : ['id','name']
            },
            {
                model : ProductImage,
                attributes : ["id", "imageUrl"]
            }
        ],

        order : [
            [sortBy, order.toUpperCase()]
        ],

        limit : pageLimit,
        offset
       })


       res.status(200).json({
            succes : true,
            data : products.rows,
            pagination : {
                page : pageNumber,
                limit : pageLimit,
                total : products.count,
                totalPages : Math.ceil(products.count/pageLimit)
            }
       })


    } catch (error) {
        console.log(error)

        res.status(400).json({
            succes : false,
            message : error.message
        })
    }

}


const getProduct = async(req, res) => {

    try {
        
        const product = await Product.findByPk(req.params.id, {
            include : [
                {
                model : Category,
                attributes : ['id','name']
            },
            {
                model : ProductImage,
                attributes : ["id", "imageUrl"]
            }
            ]
        })

        if(!product){
            return res.status(404).json({
                succes : false,
                message : "Product is Not Found"
            })
        }

        res.status(200).json({
            succes : true,
            message : "Prodcut Fetched Successfully",
            data : product
        })

    } catch (error) {
        res.status(400).json({
            succes : false,
            message : error.message
        })
    }

}


const updateProduct = async (req, res) => {

    const transaction = await Product.sequelize.transaction();

    try {

        const { id } = req.params;

        const product = await Product.findByPk(id);

        if (!product) {
            await transaction.rollback();

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

 
        await product.update(req.body, {
            transaction
        });


        if (req.files && req.files.length > 0) {

             await ProductImage.destroy({
                where: {
                    productId: id
                },
                transaction
            });


            for (const file of req.files) {

                const imageUrl = file.path.replace(/\\/g, "/");

                await ProductImage.create({
                    productId: id,
                    imageUrl: imageUrl
                }, {
                    transaction
                });

            }

        }

        await transaction.commit();

        const updatedProduct = await Product.findByPk(id, {
            include: [
                {
                    model: Category,
                    attributes: ["id", "name"]
                },
                {
                    model: ProductImage,
                    attributes: ["id", "imageUrl"]
                }
            ]
        });


        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct
        });


    } catch (error) {

        await transaction.rollback();

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};


const deleteProduct = async(req,res) => {

    const transaction = await Product.sequelize.transaction()

    try {
        
        const {id} = req.params

        const product = await Product.findByPk(id, {
            include : [
                {
                    model : ProductImage
                }
            ]
        })

        if(!product){
            await transaction.rollback()

            return res.status(404).json({
                succes : false,
                message : "Product Not Found"
            })
        }

        for(const image of product.ProductImages){

            if(fs.existsSync(image.imageUrl)){
                fs.unlinkSync(image.imageUrl)
            }

        }

        await ProductImage.destroy({
            where: {
                productId : id
            },
            transaction
        })


        await Product.destroy({
            where : {
                id : id
            },
            transaction
        })

        transaction.commit()

        res.status(200).json({
            success : true,
            message : "Product deleted Successfully"
        })



    } catch (error) {
        
        await transaction.rollback()

        console.log(error)

        res.status(400).json({
            succes : false,
            message : error.message
        })

    }

}



module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}