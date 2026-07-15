import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Cart.css";
import Navbar from "../components/Navbar";
function Cart() {
    const [cart, setCart] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getCart();
    }, []);

    const getCart = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await api.get("/cart/viewcart", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setCart(res.data.cart);
        } catch (error) {
            alert(error.response?.data?.message);
        }
    };

    const removeCart = async (id) => {
        try {
            const token = localStorage.getItem("token");

            await api.delete(`/cart/removecart/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("Removed Successfully");
            getCart();
        } catch (error) {
            alert(error.response?.data?.message);
        }
    };

    return (
        <div className="cart-page">
            <Navbar/>
            <h1>My Cart</h1>

            {cart.length === 0 ? (
                <h2>Your Cart is Empty</h2>
            ) : (
                <>
                    {cart.map((item) => (
                        <div className="cart-card" key={item._id}>
                            <img
                                src={item.productId.image}
                                alt={item.productId.name}
                                className="cart-image"
                            />

                            <div className="cart-details">
                                <h2>{item.productId.name}</h2>

                                <h3>₹{item.productId.price}</h3>

                                <p>Quantity : {item.quantity}</p>

                                <button
                                    className="remove-btn"
                                    onClick={() => removeCart(item._id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    <button
                        className="checkout-btn"
                        onClick={() => navigate("/checkout")}
                    >
                        Proceed to Checkout
                    </button>
                </>
            )}
        </div>
    );
}

export default Cart;