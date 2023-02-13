import { useSelector, useDispatch } from "react-redux";
import {
  getNewsThunk,
  filterCategoriesThunk,
  filterByTermThunk
} from "../store/slices/news.slice";
import { useEffect, useState } from "react";
import { Row, Col, Button, Card ,InputGroup,Form} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaSistrix } from "react-icons/fa";
import {FaFileAlt} from "react-icons/fa";


const Product = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news);
  const [categories, setCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(getNewsThunk());

    axios
      .get("https://e-commerce-api-v2.academlo.tech/api/v1/categories")
      .then((resp) => setCategories(resp.data))
      .catch((error) => console.error(error));
  }, []);

  const filterByTerm = () => {
    dispatch(filterByTermThunk(searchValue));
  };

  return (
    <div>

    <Row>
    <Col>
      <InputGroup className="my-3">
        <Form.Control
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <InputGroup.Text
          id="basic-addon1"
          as={Button}
          onClick={filterByTerm}
        >
          <FaSistrix/>

        </InputGroup.Text>
      </InputGroup>
    </Col>
  </Row>

      <h2>Filter by: </h2>
      {categories.map((category) => (
        <Button
          key={category.id}

          onClick={() => dispatch(filterCategoriesThunk(category.id))}
          className='buttonFilter'
        >
          {category.name}
        </Button>
      ))}
      <Button variant="dark" onClick={() => dispatch(getNewsThunk())} className='buttonDetail'>
        Ver todos
      </Button>
      <Row xs={1} md={2} lg={3}>
        
        {news?.map((newsItem) => (
          <Col key={newsItem.id}>
            <Card>
              <div className="cover1">
              <Card.Img
                variant="top"
                src={newsItem?.images?.[1]?.url}
                
                className="cover-img img-wrapper"
                
              />
                <img src={newsItem?.images?.[0]?.url } alt="" 
                   className="img1-wrapper"
                  />
                
              </div>
            
              <Card.Body>
                <Card.Title>{newsItem.title}</Card.Title>
                <h4>Price</h4>
                <Card.Text>{newsItem.price}</Card.Text>
                <Button variant="primary" as={Link} to={`/product/${newsItem.id}`} className='buttonDetail'>
                   Detail <FaFileAlt/>
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
