import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Products from './pages/Products'
import Admin from './pages/Admin'
import Addproduct from './pages/Addproduct'
import AdminShowProduct from './pages/AdminShowProduct'
import EditProduct from './pages/EditProduct'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'


function App(){
  return (
    <BrowserRouter>

        <Routes>

          <Route path='/' element={<Login/>}/>

          <Route path='/admin' element={<Admin/>}/>

          <Route path='/addproduct' element={<Addproduct/>}/>

          <Route path='/showproducts' element={<AdminShowProduct/>}/>

        <Route path='/checkout' element={<Checkout/>}/>
        
        <Route path='/orders' element={<Orders/>}/>

          <Route path="/edit-product/" element={<EditProduct />} />

           <Route path='/register' element={<Register/>}/>

            <Route path='/products' element={<Products/>}/>
            
             <Route path='/cart' element={<Cart/>}/>


        </Routes>
    
    
    
    
    </BrowserRouter>
  )
}

export default App