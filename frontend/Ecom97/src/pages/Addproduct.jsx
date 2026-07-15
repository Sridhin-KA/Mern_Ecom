import { useState } from "react";
import api from "../services/api";
import { useNavigate ,Navigate} from "react-router-dom";

function AddProduct() {
    const navigate = useNavigate();
   
   
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
      const isAdmin = localStorage.getItem('isAdmin')
      

    if (isAdmin !=='true'){
    alert('You are not authorized to access this page')
    return <Navigate to='/'/>
    }
    const handleAddProduct = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            await api.post("/products/addproduct",{
                name,
                price,
                image,
                category,
                description,
            },
        {
                headers:{
                    Authorization:`Bearer ${token}`
                }

            });

            alert("Product Added Successfully");
            navigate("/admin");
        } catch (error) {
            alert(error.response.data.message );
        }
    };

    return (
        <div>
            <h1>Add Product</h1>

            <form onSubmit={handleAddProduct}>
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
    );
}

export default AddProduct;