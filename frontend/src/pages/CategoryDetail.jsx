import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar';

const CategoryDetail = () => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/store/products/`);
                const productsData = response.data;
                const filteredProducts = productsData.filter(product => product.category_name === categoryName);
                setProducts(filteredProducts); 
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to fetch products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProductsByCategory();
    }, [categoryName]);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p className="text-danger">{error}</p>;
    return (
       <div>
         <NavBar/>
        <div className="container mt-4">
            <h3>{categoryName} Products</h3>
            <div className="row">
                {products.length > 0 ? (
                    products.map(product => (
                        <div key={product.id} className="col-md-4 mb-4">
                            <div className="card">
                                <img src={product.image_url} className="card-img-top" alt={product.product_name} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.product_name}</h5>
                                    <p className="card-text">MRP: ${product.mrp}</p>
                                    <p className="card-text">Discounted Price: ${product.discounted_price}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products found in this category.</p>
                )}
            </div>
        </div>
       </div>
    );
};

export default CategoryDetail;
