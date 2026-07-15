import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>MyShop</h2>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/products">Products</Link>
        </li>

        <li>
          <Link to="/cart">Cart</Link>
        </li>

        <li>
          <Link to="/orders">Orders</Link>
        </li>

        <li>
          <Link to="/checkout">Checkout</Link>
        </li>

        <li>
          <Link to="/admin">Admin</Link>
        </li>

        <li>
          <Link to="/">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;