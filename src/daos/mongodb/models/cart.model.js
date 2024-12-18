import { Schema, model } from "mongoose";
// import mongoosePaginate from "mongoose-paginate-v2"

export const cartCollection = "cart";

const cartSchema = new Schema({
    userName: {
        type: String,
        required: [true, "User name for Cart is required"]
    },
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "product",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ]
});


cartSchema.pre('find', function() {
    this.populate({
        path: 'products.productId', 
        select: 'name price description' 
    });
});

cartSchema.pre('findOne', function() {
    this.populate({
        path: 'products.productId',
        select: 'name price description'
    });
});


export const CartModel = model(cartCollection, cartSchema);

