import React, { useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';
import getConfig from '../utils/getConfig';

const Sidebar=({show,handleClose})=>{
  const [favorites, setFavorites]=useState([])
  

  useEffect(()=>{
axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/cart`, getConfig())
.then((resp)=>setFavorites(resp.data))
.catch((error)=>console.error(error))
  },[show])

  const checkoutCart=()=>{
    axios.post(`https://e-commerce-api-v2.academlo.tech/api/v1/purchases`,
    {
      "street": "Green St. 1456",
      "colony": "Southwest",
      "zipCode": 12345,
      "city": "USA",
      "references": "Some references"
  },getConfig()
    )
    .then((resp)=>setFavorites([]))
    .catch((error)=>console.error(error))
  }
  console.log(favorites)
  return(

    <>
     
      <Offcanvas show={show} onHide={handleClose} placement={"end"}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito de Compras</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

         {
         favorites.length !==0 
         ?
         favorites?.map((products)=>(
          <h3 key={products.product?.brand}> {products?.product?.brand}</h3>
         ))
        :
        <h3>No hay producto selecionado</h3>
        }
       
         
           <Button onClick={checkoutCart}
           disabled ={favorites.length==0}
           >Checkout</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}



export default Sidebar