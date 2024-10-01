// import React, { useState } from 'react';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import axios from 'axios';
// import { auth } from '../components/firebase'
// import { Button } from 'bootstrap';

// function NavBar({user, setUser}) {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const [status, setStatus] = useState("Guest");

//   const handleLogout = async() =>{
//     try{
//       await auth.signOut();
//       setUser("Guest");
//     }catch(error){
//         console.log(error);
//     } 
//   }

//   const handleSearch = async (e) => {
//     e.preventDefault();  // Prevent page refresh
//     if (query) {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/search/?q=${query}`);
//         setResults(response.data.products);  // Store search results
//       } catch (error) {
//         console.error('Error searching for products:', error);
//       }
//     }
//   };

//   return (
//     <Navbar expand="lg" className="bg-body-tertiary">
//       <Container>
//         <Navbar.Brand href="">Finest Ecommerce {user}</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto"></Nav>
//           <nav className="navbar navbar-light bg-light">
//             <form className="form-inline" onSubmit={handleSearch}>
//               <div style={{ display: "flex", padding: "20px", justifyContent: "left", justifyItems: "center", alignContent: "center" }}>
//                 <input
//                   className="form-control mr-sm-2"
//                   type="search"
//                   placeholder="Search"
//                   aria-label="Search"
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}  // Update query state
//                 />
//                 <button style={{ padding: "10px", margin: "20px" }} className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
//                 if(status!){
//                   <button onClick={handleLogout}>Logout</button>
//                 }else{
//                   <Link to=""><Button>Login In</Button></Link>
//                 }
//               </div>
//             </form>
//           </nav>
//         </Navbar.Collapse>
//       </Container>

//       {/* Display search results */}
//       {results.length > 0 && (
//         <div style={{ padding: '20px' }}>
//           <h5>Search Results:</h5>
//           <ul>
//             {results.map((product) => (
//               <li key={product.product_name}>
//                 <img src={product.image_url} alt={product.product_name} style={{ width: '50px' }} />
//                 {product.product_name} - {product.category_name} - ${product.mrp}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </Navbar>
//   );
// }

// export default NavBar;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for routing
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import { auth } from '../components/firebase'; // Firebase setup
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar({ user, setUser }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate(); // Used to navigate programmatically

  const handleLogout = async ({user, setUser}) => {
    try {
      await auth.signOut();
      setUser("Guest"); // Update user state to guest
      navigate('/login'); // Navigate to login page
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent page refresh
    if (query) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/search/?q=${query}`);
        setResults(response.data.products); // Store search results
      } catch (error) {
        console.error('Error searching for products:', error);
      }
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
              <form className="form-inline" onSubmit={handleSearch}>
                <div style={{ display: "flex", padding: "20px", alignItems: "center" }}>
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} // Update query state
                  />
                  <button
                    style={{ padding: "10px", margin: "20px" }}
                    className="btn btn-outline-success my-2 my-sm-0"
                    type="submit"
                  >
                    Search
                  </button>
                  {user === "Guest" ? (
                    // Show "Login" button if user is a guest
                    <Link to="/auth/login">
                      <button className="btn btn-outline-primary">Login</button>
                    </Link>
                  ) : (
                    // Show "Logout" button if user is logged in
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

      {/* Display search results */}
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
