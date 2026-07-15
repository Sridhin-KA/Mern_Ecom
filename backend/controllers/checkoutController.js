import Order from '../models/Order.js'
import Cart from '../models/Cart.js'



export const checkout = async (req,res) =>{
    try{

        const cart = await Cart.find({
            userId:req.user.id
        }).populate("productId")
        if (cart.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }
        let total = 0;

const products = cart.map((item) => {

    total += item.quantity * item.productId.price;

    return {
        productId: item.productId._id,
        quantity: item.quantity
    };

});

        const order = await Order.create({
            userId:req.user.id,
            products,
            total,
    
        })
    await Cart.deleteMany({
            userId:req.user.id
    })    
    res.json({
        message:"Order Placed Successfully",
        order
    })

    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

export const viewOrders = async (req, res) => {

    try {

        const orders = await Order.find({
            userId: req.user.id
        }).populate("products.productId");

        res.status(200).json({
            message: "Orders fetched successfully",
            orders
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};