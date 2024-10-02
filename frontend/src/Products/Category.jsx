// import React, { useEffect, useState } from 'react';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import axios from 'axios';
// import Modal from 'react-bootstrap/Modal';
// import Pagination from 'react-bootstrap/Pagination';
// import Searcher from '../Products/Searcher';
// import NavBar from '../pages/NavBar';

// const Category = () => {
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 12;
//   const [show, setShow] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   const handleClose = () => setShow(false);
//   const handleShow = (product) => {
//     setSelectedProduct(product);
//     setShow(true);
//   };

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/store/products/');
//       setProducts(response.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleSearch = async () => {
//     if (!searchTerm) {
//       setSearchResults([]);
//       return;
//     }

//     try {
//       const response = await axios.get('http://localhost:9200/products/_search', {
//         query: {
//           match_phrase_prefix: {
//             product_name: searchTerm
//           }
//         }
//       });
//       setSearchResults(response.data.hits.hits.map(hit => hit._source));
//     } catch (error) {
//       console.error("Error fetching suggestions:", error);
//     }
//   };

//   const indexOfLastProduct = currentPage * itemsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
//   const currentProducts = searchResults.length > 0 ? searchResults : products.slice(indexOfFirstProduct, indexOfLastProduct);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const totalPages = Math.ceil((searchResults.length > 0 ? searchResults.length : products.length) / itemsPerPage);
//   const paginationItems = [];

//   // Generate pagination with ellipsis
//   const range = 2;  // Show 2 pages before/after current page

//   if (currentPage > 1) {
//     paginationItems.push(
//       <Pagination.Item key="prev" onClick={() => handlePageChange(currentPage - 1)}>
//         Previous
//       </Pagination.Item>
//     );
//   }

//   for (let number = 1; number <= totalPages; number++) {
//     if (
//       number === 1 || 
//       number === totalPages || 
//       (number >= currentPage - range && number <= currentPage + range)
//     ) {
//       paginationItems.push(
//         <Pagination.Item
//           key={number}
//           active={number === currentPage}
//           onClick={() => handlePageChange(number)}
//         >
//           {number}
//         </Pagination.Item>
//       );
//     } else if (
//       number === currentPage - range - 1 || 
//       number === currentPage + range + 1
//     ) {
//       paginationItems.push(<Pagination.Ellipsis key={`ellipsis-${number}`} />);
//     }
//   }

//   if (currentPage < totalPages) {
//     paginationItems.push(
//       <Pagination.Item key="next" onClick={() => handlePageChange(currentPage + 1)}>
//         Next
//       </Pagination.Item>
//     );
//   }

//   return (
//     <div>
//       <NavBar />
//       <Searcher />
//       <h4>All Products</h4>
//       <Container>
//         <Row>
//           {currentProducts.length > 0 ? (
//             currentProducts.map(product => (
//               <Col key={product.id}>
//                 <Card style={{ width: '18rem', margin: "20px" }}>
//                   <Card.Img variant="top" src={product.image_url} />
//                   <Card.Body>
//                     <Card.Title>{product.product_name}</Card.Title>
//                     <Card.Text style={{ textAlign: "center" }}>
//                       <p><b>Discount Price: </b> Rs.{product.discounted_price}</p>
//                       <p>{product.category_name}</p>
//                     </Card.Text>
//                     <Button variant="primary" onClick={() => handleShow(product)}>Show More</Button>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))
//           ) : (
//             <Col>
//               <p>No products available.</p>
//             </Col>
//           )}
//         </Row>
//       </Container>
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>{selectedProduct ? selectedProduct.product_name : ''}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedProduct ? (
//             <>
//               <img src={selectedProduct.image_url} alt={selectedProduct.product_name} style={{ width: '100%' }} />
//               <p><b>Discount Price:</b> Rs.{selectedProduct.discounted_price}</p>
//               <p><b>Product Price:</b> Rs.<strike>{selectedProduct.mrp}</strike></p>
//               <p><b>Description:</b> {selectedProduct.description}</p>
//               <p><b>Category:</b> {selectedProduct.category_name}</p>
//               <p><b>Product Count:</b> {parseInt(selectedProduct.product_count)}</p>
//             </>
//           ) : (
//             <p>No product details available.</p>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
//         <Pagination>{paginationItems}</Pagination>
//       </div>
//     </div>
//   );
// };

// export default Category;


import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Pagination from 'react-bootstrap/Pagination';
import Dropdown from 'react-bootstrap/Dropdown';
import NavBar from '../pages/NavBar';
import Searcher from '../Products/Searcher';

const Category = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState(''); // for sorting by price

  const categories = ["Electronics", "Pet Supplies", "Clothing", "Groceries", "Fruits & Vegetables", "Home"];

  const handleClose = () => setShow(false);
  const handleShow = (product) => {
    setSelectedProduct(product);
    setShow(true);
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/store/products/');
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const filtered = category ? products.filter(product => product.category_name === category) : products;
    setFilteredProducts(filtered);
    setCurrentPage(1); 
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    const sorted = [...filteredProducts].sort((a, b) => {
      return order === 'low-to-high'
        ? a.discounted_price - b.discounted_price
        : b.discounted_price - a.discounted_price;
    });
    setFilteredProducts(sorted);
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = searchResults.length > 0 ? searchResults : filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil((searchResults.length > 0 ? searchResults.length : filteredProducts.length) / itemsPerPage);

  const paginationItems = [];
  if (currentPage > 1) {
    paginationItems.push(
      <Pagination.Item key="prev" onClick={() => handlePageChange(currentPage - 1)}>
        Previous
      </Pagination.Item>
    );
  }
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  if (currentPage < totalPages) {
    paginationItems.push(
      <Pagination.Item key="next" onClick={() => handlePageChange(currentPage + 1)}>
        Next
      </Pagination.Item>
    );
  }

  return (
    <div>
      <NavBar />
      <Searcher />
      <h4>All Products</h4>
      <Container>
        <Row>
          <Col>
            <Dropdown onSelect={handleCategoryChange}>
              <Dropdown.Toggle variant="warning">Filter by Category</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="">All Categories</Dropdown.Item>
                {categories.map(category => (
                  <Dropdown.Item key={category} eventKey={category}>
                    {category}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            <Dropdown onSelect={handleSortChange}>
              <Dropdown.Toggle variant="success">Sort by Price</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="low-to-high">Low to High</Dropdown.Item>
                <Dropdown.Item eventKey="high-to-low">High to Low</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        <Row>
          {currentProducts.length > 0 ? (
            currentProducts.map(product => (
              <Col key={product.id}>
                <Card style={{ width: '18rem', margin: "20px" }}>
                  <Card.Img variant="top" src={product.image_url} />
                  <Card.Body>
                    <Card.Title>{product.product_name}</Card.Title>
                    <Card.Text style={{ textAlign: "center" }}>
                      <p><b>Discount Price: </b> Rs.{product.discounted_price}</p>
                      <p>{product.category_name}</p>
                    </Card.Text>
                    <Button variant="primary" onClick={() => handleShow(product)}>Show More</Button>
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct ? selectedProduct.product_name : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct ? (
            <>
              <img src={selectedProduct.image_url} alt={selectedProduct.product_name} style={{ width: '100%' }} />
              <p><b>Discount Price:</b> Rs.{selectedProduct.discounted_price}</p>
              <p><b>Product Price:</b> Rs.<strike>{selectedProduct.mrp}</strike></p>
              <p><b>Description:</b> {selectedProduct.description}</p>
              <p><b>Category:</b> {selectedProduct.category_name}</p>
              <p><b>Product Count:</b> {parseInt(selectedProduct.product_count)}</p>
            </>
          ) : (
            <p>No product details available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Pagination>{paginationItems}</Pagination>
      </div>
    </div>
  );
};

export default Category;
