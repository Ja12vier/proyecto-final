import { useSelector, useDispatch } from "react-redux";
import {
  getNewsThunk,
  filterCategoriesThunk
} from "../store/slices/news.slice";
import { useEffect, useState } from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(getNewsThunk());

    axios
      .get("https://e-commerce-api-v2.academlo.tech/api/v1/categories")
      .then((resp) => setCategories(resp.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Product</h1>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant="primary"
          onClick={() => dispatch(filterCategoriesThunk(category.id))}
        >
          {category.name}
        </Button>
      ))}
      <Button variant="dark" onClick={() => dispatch(getNewsThunk())}>
        Ver todos
      </Button>
      <Row xs={1} md={2} lg={3}>
        
        {news?.map((newsItem) => (
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
  );
};

export default Product;
