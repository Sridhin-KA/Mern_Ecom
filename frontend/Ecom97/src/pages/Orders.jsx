import { useState, useEffect } from "react";
import api from "../services/api";
import "./Orders.css";
import Navbar from "../components/Navbar";
function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await api.get("/order/vieworder", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setOrders(res.data.orders);
        } catch (error) {
            alert(error.response?.data?.message);
        }
    };

    return (
        <div className="orders-container">
            <Navbar/>
            <h1>My Orders</h1>

            {orders.length === 0 ? (
                <h2>No Orders Found</h2>
            ) : (
                orders.map((order) => (
                    <div className="order-card" key={order._id}>
                        <div className="order-header">
                            <h3>Order ID</h3>
                            <p>{order._id}</p>

                            <h3>Total Amount</h3>
                            <p className="total">₹{order.total}</p>
                        </div>

                        <div className="products-list">
                            {order.products.map((item) => (
                                <div
                                    className="product-item"
                                    key={item.productId._id}
                                >
                                    <img
                                        src={item.productId.image}
                                        alt={item.productId.name}
                                    />

                                    <div>
                                        <h2>{item.productId.name}</h2>

                                        <p>Price : ₹{item.productId.price}</p>

                                        <p>Quantity : {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Orders;