import "./Checkout.css";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
function Checkout() {
    const navigate = useNavigate();

    const placeOrder = async () => {
        try {
            const token = localStorage.getItem("token");

            await api.post(
                "/order/checkout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Order Placed Successfully");
            navigate("/orders");
        } catch (error) {
            alert(error.response?.data?.message);
        }
    };

    return (
        <div className="checkout-container">
            <Navbar/>
            <div className="checkout-card">
                <h1>Checkout</h1>

                <p className="subtitle">
                    Review your order and place it.
                </p>

                <div className="payment-box">
                    <h3>Payment Method</h3>
                    <p>💵 Cash on Delivery (Demo)</p>
                </div>

                <button className="place-order-btn" onClick={placeOrder}>
                    Place Order
                </button>
            </div>
        </div>
    );
}

export default Checkout;