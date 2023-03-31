import axios from 'axios';
import { useState,useEffect } from 'react';
import getConfig from '../utils/getConfig';
import ListGroup from 'react-bootstrap/ListGroup';
import {Row,Card,Col} from 'react-bootstrap'

const Favorites = () => {


  const [purchases,setPurchases]=useState([])

  useEffect(()=>{
    axios
    .get(`https://api-tecnologia-backend.onrender.com/api/v1/purchases`,getConfig())
    .then((resp)=>setPurchases(resp.data))
  }, [])


  return (
      <div>
          <h1>My Purchases</h1>

          
          
          {
            purchases?.map(item =>{
              return    <div className="list">
              <div className='lispurchases'><img src={item?.product?.images?.[0]?.url} className='list-img' alt="" /></div>
              <div className='lispurchases'>{item?.product?.title}</div>
              <div className='lispurchases'>{item?.quantity}</div>
              <div className='lispurchases'>{item?.product?.price}</div>
      </div>

            } )
       
         }

         
          

      
      </div>
  );
}

export default Favorites;
