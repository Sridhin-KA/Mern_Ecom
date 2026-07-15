import Product from '../models/Product.js'


export const addProduct = async (req,res)=>{
    try{
         const {name,price,image,category,description} = req.body

         if(!name || !price || !image || !category || !description){
            return res.status(400).json({
                message:'All Fields Are Required'
            })
         }
         const product = await Product.create({
            name,
            price,
            image,
            category,
            description
         })
         res.status(201).json({
            message:'Product Added',
            product
         })
    }
        
    
    catch(err){
        console.log('error from add product controller',err);
        res.status(500).json({
            message:err.message

        })
    }
  
}


export const getProducts = async (req,res)=>{
    try{
        const allproducts = await Product.find()
        res.status(200).json({
            msg:'All Products',
            allproducts
        })
    }
    catch (err){
        res.status(500).json({
            msg:"error from get products"
        })
    }
}

export const getProductsUser = async (req,res)=>{
    try{
        const allproducts = await Product.find()
        res.status(200).json({
            msg:'All Products',
            allproducts
        })
    }
    catch (err){
        res.status(500).json({
            msg:"error from get products"
        })
    }
}

export const updateProduct = async( req,res)=>{
    try{
        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )


        if(!updated){
            return res.status(404).json({
                msg:"Product not found"
            })
        }
        res.status(200).json({
            msg:"Product Updated",
            updated
        })
    }catch (err){
        res.status(500).json({
            msg:"error from update product"
        })
    }
}


export const deleteProduct = async(req,res)=>{
    try{
        const deleted = await Product.findByIdAndDelete(
            req.params.id
        )

        if (!deleted){
            return res.status(404).json({
                message:"Product not found"
            })
        }
        res.status(200).json({
            message:"Product deleted"
        })

    }catch (err){
        res.status(500).json({
            message:"error from delete products"
        })
    }
}