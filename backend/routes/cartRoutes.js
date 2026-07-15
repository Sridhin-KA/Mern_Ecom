import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { addToCart,viewCart,removeCart } from '../controllers/cartController.js'




const router = express.Router()

router.post('/addtocart',protect,addToCart)
router.get('/viewcart',protect,viewCart)
router.delete('/removecart/:id',protect,removeCart)

export default router