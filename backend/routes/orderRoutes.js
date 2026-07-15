import express from 'express'

import {checkout,viewOrders} from '../controllers/checkoutController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/checkout',protect,checkout)
router.get('/vieworder',protect,viewOrders)

export default router