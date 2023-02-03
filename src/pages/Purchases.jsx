import axios from 'axios';
import { useState,useEffect } from 'react';
import getConfig from '../utils/getConfig';

const Favorites = () => {


  const [purchases,setPurchases]=useState([])
  useEffect(()=>{
    axios
    .get(`https://e-commerce-api-v2.academlo.tech/api/v1/purchases`,getConfig())
    .then((resp)=>setPurchases(resp.data))
  })

  return (
      <div>
          <h1>Favoritos  Purchases</h1>
          {
            purchases.map(item =>{
              return <li>
                <h1>{item?.product?.title}     </h1>
              </li>
            } )
       
         }
      </div>
  );
}

export default Favorites;
