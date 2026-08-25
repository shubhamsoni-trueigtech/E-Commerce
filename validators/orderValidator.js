const Ajv = require("ajv")


const ajv = new Ajv({
    allErrors : true
})


const orderSchema = {
    type : "object",

    properties : {

        shippingAddress : {
            type : "string",
            minLength : 5
        }

    },

    required : ["shippingAddress"],

    additionalProperties : false

}



const validateOrder = ajv.compile(orderSchema)


module.exports = {validateOrder}
