import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { auth } from '../components/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar({ user, setUser }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleLogout = async ({user, setUser}) => {
    try {
      await auth.signOut();
      setUser("Guest"); 
      // navigate('/login'); 
      navigate('/auth/login');
      logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Finest Ecommerce {user}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav>
            <nav className="navbar navbar-light bg-light">
              <form className="form-inline">
                <div style={{ display: "flex", padding: "20px", alignItems: "center" }}>
                  {user === "Guest" ? (
                    <Link to="/auth/login">
                      <button className="btn btn-outline-primary">Login</button>
                    </Link>
                  ) : (
                    <button onClick={handleLogout} className="btn btn-outline-danger">
                      Logout
                    </button>
                  )}
                </div>
              </form>
            </nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {results.length > 0 && (
        <div style={{ padding: '20px' }}>
          <h5>Search Results:</h5>
          <ul>
            {results.map((product) => (
              <li key={product.product_name}>
                <img
                  src={product.image_url}
                  alt={product.product_name}
                  style={{ width: '50px', marginRight: '10px' }}
                />
                {product.product_name} - {product.category_name} - ${product.mrp}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default NavBar;
