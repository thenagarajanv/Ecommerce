import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import NavBar from '../pages/NavBar';
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination'; // Import Pagination component

const Category = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/store/products/');
        console.log('API Response:', response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item 
        key={number} 
        active={number === currentPage} 
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <div>
      <NavBar />
      <Container>
        <Row>
          {currentProducts.length > 0 ? (
            currentProducts.map(product => (
              <Col key={product.id}> 
                <Card style={{ width: '18rem', margin: "20px" }}>
                  <Card.Img variant="top" src={product.image_url} />
                  <Card.Body>
                    <Card.Title>{product.product_name}</Card.Title>
                    <Card.Text style={{ textAlign: "center" }}>
                      <p><b>Discount Price : Rs.{product.discounted_price}</b></p>
                      <p><b>Price : Rs.{product.discounted_price}</b></p>
                      <p>{product.category_name}</p>
                    </Card.Text>
                    <Button variant="primary" onClick={handleShow}>Show More</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <p>No products available.</p>
            </Col>
          )}
        </Row>
      </Container>
      {/* Pagination Section */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Pagination>{paginationItems}</Pagination>
      </div>
    </div>
  );
};

export default Category;
