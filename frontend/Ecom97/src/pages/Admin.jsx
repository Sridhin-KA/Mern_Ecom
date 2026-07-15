import {Link,Navigate} from "react-router-dom"

function Admin() {
      const isAdmin = localStorage.getItem('isAdmin')
      

      if (isAdmin !=='true'){
        alert('You are not authorized to access this page')
        return <Navigate to='/'/>
      }
    return (

      
        <div>
            <h1>Admin Page</h1>
            <Link to="/addproduct">Add Product</Link>
             <Link to="/showproducts">Show Products</Link>
        </div>
    )
}

export default Admin
