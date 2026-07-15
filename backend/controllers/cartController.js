import Cart from '../models/Cart.js'


export const addToCart = async (req,res) =>{
    try{

        const { productId } = req.body;

        const existing = await Cart.findOne({
            userId:req.user.id,
            productId
        })
        if (existing){
            existing.quantity++;
            await existing.save()
            return res.json(existing)
        }
        const cart = await Cart.create({
            userId:req.user.id,
            productId,
            quantity:1
        })
        res.status(200).json(cart)


    }catch(err){
        res.status(500).json({
            msg:"error from add to cart"
        })
    }
}

export const viewCart = async (req,res) => {
    try{

        const cart = await Cart.find({
            userId:req.user.id
        }).populate('productId')
        res.status(200).json({
            message:"View cart",
            cart
        })

    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}

export const removeCart = async (req,res) => {
    try{

        await Cart.findByIdAndDelete(req.params.id)
        res.json({
            message:"Item Removed from Cart"
        })
    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}