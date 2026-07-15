import { useState, useEffect } from "react";
import api from "../services/api";
import "./Products.css";
import Navbar from "../components/Navbar";
function Products() {
    const [products, setProducts] = useState([]);

    const getProduct = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await api.get("/products/getproductsuser", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setProducts(res.data.allproducts);
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    const addTocart = async (id) => {
        try {
            const token = localStorage.getItem("token");

            await api.post(
                "/cart/addtocart",
                {
                    productId: id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Added to Cart");
        } catch (error) {
            alert(error.response?.data?.message);
        }
    };

    return (
        <div className="products-page">
            <Navbar/>
            <h1>Our Products</h1>

            <div className="product-container">
                {products.map((product) => (
                    <div className="product-card" key={product._id}>
                        <img
                            src={product.image}
                            alt={product.name}
                            className="product-image"
                        />

                        <h2>{product.name}</h2>

                        <p className="price">₹{product.price}</p>

                        <p className="description">
                            {product.description}
                        </p>

                        <button
                            onClick={() => addTocart(product._id)}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;