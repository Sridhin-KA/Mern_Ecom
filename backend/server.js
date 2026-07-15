import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
dotenv.config()



const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/users',userRoutes)
app.use('/api/products',productRoutes)
app.use('/api/cart/',cartRoutes)
app.use('/api/order/',orderRoutes)

app.listen(5000,()=>{
    console.log('Server Started');
    
})
