import React from 'react'
import {useState,useEfect} from 'react'
import api from '../services/api'

import { useNavigate, useLocation } from 'react-router-dom'

function EditProduct() {

    const { state } = useLocation()

    const navigate = useNavigate()

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const updateProduct =  async (e)=>{
        e.preventDefault()
        try{
            const token = localStorage.getItem("token");

            await api.put(`/products/updateproduct/${state._id}`,
                {
                    name,
                    price,
                    image,
                    category,
                    description

                },
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
              
            )
              alert('Product Updated')
                navigate('/showproducts')
        }
        catch(error){
            alert(error.response.data.message)
        }
    }

    return (
        <div>
            <h1>Edit Product</h1>
            
            <form onSubmit={updateProduct}>
 <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br /><br />

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <br /><br />

                <input
                    type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <br /><br />

                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <br /><br />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <br /><br />

                <button type="submit">Add Product</button>

            </form>
        </div>
    )
}

export default EditProduct
