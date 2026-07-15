import express from 'express'

import { addProduct,getProducts,updateProduct,deleteProduct,getProductsUser} from '../controllers/productController.js'

import { protect,adminOnly } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/addproduct',protect,adminOnly,addProduct)
router.get('/getproducts',protect,adminOnly,getProducts)
router.get('/getproductsuser',protect,getProductsUser)
router.put('/updateproduct/:id',protect,adminOnly,updateProduct)
router.delete('/deleteproduct/:id',protect,adminOnly,deleteProduct)

export default router