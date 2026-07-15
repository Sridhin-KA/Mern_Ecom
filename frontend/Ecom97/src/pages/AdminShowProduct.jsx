import React from 'react'
import {useState,useEffect} from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom';

function AdminShowProduct() {

    const navigate = useNavigate()
    const [allproduct,setAllproduct] = useState([])

    const getProducts = async ()=>{
        try{
            const token = localStorage.getItem("token");

            const res = await api.get('/products/getproducts',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setAllproduct(res.data.allproducts)
        } catch (error) {
            console.error("Error fetching products:", error);
        }
        

    }
    console.log(allproduct);
    
        useEffect(()=>{
        getProducts()
    },[])

    const deleteProduct = async(id)=>{
        try{
            const token = localStorage.getItem('token')

            await api.delete(`/products/deleteproduct/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            alert('Product deleted')
             getProducts()
        }catch(error){
            console.log(error);
            
            alert(error.response?.data?.message)
        }

    }
    return (
        <div>
            <h1>All Products</h1>
            <ul>
                {allproduct.map((product) => (
                    <li key={product._id}>
                        <h3>{product.name}</h3>
                        <p>Price: ₹{product.price}</p>
                        <p>{product.description}</p>
                        <button onClick={()=>deleteProduct(product._id)} >Delete</button>
                   
                        <button onClick={()=>navigate('/edit-product',{
                            state:product
                        })} >Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AdminShowProduct
