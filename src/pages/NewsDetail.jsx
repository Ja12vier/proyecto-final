import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../store/slices/isLoading.slice";
import { Button, Col, Row,  Card } from "react-bootstrap";
import { filterCategoriesThunk } from "../store/slices/news.slice";
import Carousel from 'react-bootstrap/Carousel';
import { createFavoritesThunk } from "../store/slices/favorite.slice";
import { Link } from "react-router-dom";

const NewsDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const dispatch = useDispatch();
  const newsRelated = useSelector((state) => state.news);
  const [rete, setRate]=useState(1)
  const navigate=useNavigate()


  useEffect(() => {
    dispatch(setIsLoading(true));

    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
      .then((resp) => {
        setDetail(resp.data)
        dispatch(filterCategoriesThunk(resp.data?.categoryId));
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setTimeout(() => {
          dispatch(setIsLoading(false));
        }, 250);
      });
  }, [id]);

  
const addToFavorite=()=>{


  const token= localStorage.getItem('token')

  if(token){
    const news={
      productId: detail.id,
      quantity:rete
    }
    dispatch(createFavoritesThunk(news))
  }else{
navigate("/login")
  }

}

  return (
    <div>

        <div>
        <h5><span>MARCA:  </span>{detail?.brand}</h5>
        </div>


<div className="container3">
  
<div className="cover-row">
   <Row >
        <Col>
     
        <Carousel>

      <Carousel.Item style={{padding:'5rem'}}
       
      >
        <div className='cover'>
        <img
          className="img"
          src={detail?.images?.[0]?.url}
          alt="First slide"
        />
        </div>
     
      </Carousel.Item >

      <Carousel.Item style={{padding:'5rem'}} 
     
      >
        <div className='cover'>
        <img
          className="img"
          src={detail?.images?.[1]?.url}
          alt="Second slide"
        />

        </div>

      </Carousel.Item>
      <Carousel.Item style={{padding:'5rem'}} 
    
      >
      <div className="cover">
      <img
          className="img"
          src={detail?.images?.[2]?.url}
          alt="Third slide"
        />
      </div>

    
      </Carousel.Item>
    </Carousel>
     
        </Col>
      </Row>
   </div>
     
     <div className="cover-container">

     <div>
      <h1>{detail?.title}</h1>
      <p>{detail?.description}</p>
      </div>
      <div>
        <h5>PRICE</h5>
        <h5>{detail.price}</h5>
      </div>

     <div>
      <Button onClick={addToFavorite}>AGREGAR A FAVORITO</Button>
      <Button onClick={()=>setRate(rete-1)}>-</Button>
      {rete}
      <Button onClick={()=>setRate(rete+1)}>+</Button>
     </div>

     </div>
</div>
      
    
    <div>
      <div className="h3">
      <h3>Related Products</h3>
      </div>

      
     <Row xs={1} md={2} lg={3}>
        
        {newsRelated?.map((newsItem) => (
          <Col key={newsItem.id}>
            <Card>
            <div className="cover1">
              <Card.Img
                variant="top"
                src={newsItem?.images?.[0]?.url}
                
                className="cover-img"
              />
              </div>
              <Card.Body>
                <Card.Title>{newsItem.title}</Card.Title>
                <h4>Price</h4>
                <Card.Text>{newsItem.price}</Card.Text>
                <Button variant="primary" as={Link} to={`/product/${newsItem.id}`}>
                  Ver detalle
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>

    </div>
  );
};

export default NewsDetail;
