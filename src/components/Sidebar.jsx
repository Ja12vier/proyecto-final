import React, { useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';
import getConfig from '../utils/getConfig';

const Sidebar=({show,handleClose})=>{
  const [favorites, setFavorites]=useState([])
  

  useEffect(()=>{
axios.get(`https://api-tecnologia-backend.onrender.com/api/v1/carts`, getConfig())
.then((resp)=>setFavorites(resp.data))
.catch((error)=>console.error(error))
  },[show])

  const checkoutCart=()=>{
    axios.post(`https://api-tecnologia-backend.onrender.com/api/v1/purchases`,
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
          <Offcanvas.Title>Shopping cart</Offcanvas.Title>

        </Offcanvas.Header>
        <Offcanvas.Body>

         {
         favorites.length !==0 
         ?
         favorites?.map((products)=>(
       <div key={products?.product} className='sidebar' style={{display:'flex'}}>
        <img src={products?.product?.images?.[0]?.url }  className='sidebar-img'alt="" style={{width:' 70px', margin:'5px 5px'}} />
             <h3 style={{fontSize:' 10px',margin:'5px 5px'}} > {products?.product?.title}</h3>
          <h3 style={{fontSize:'10px', margin:'0 5px'}} ><span>{products?.quantity}</span> </h3>
       </div>
         ))
        :
        <h3>there are no selected products</h3>
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