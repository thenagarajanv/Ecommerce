import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/store/products/');
                const productsData = response.data; 
                const categoryData = productsData.reduce((acc, product) => {
                    if (!acc[product.category_name]) {
                        acc[product.category_name] = product.image_url;
                    }
                    return acc;
                }, {});
                setCategories(categoryData);
            } catch (err) {
                console.error('Error fetching categories:', err);
                setError('Failed to fetch categories. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = (category) => {
        navigate(`/category/${category}`);
    };

    const handleShowAllProducts = () => {
        navigate('/DisplayProducts'); 
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div className="container mt-4">
            <h3>Categories</h3>
            <div className="text-end mb-3"> 
                <Link to='/DisplayProducts'>
                    <button className="btn btn-primary" onClick={handleShowAllProducts}>
                        Display All Products
                    </button>
                </Link>
            </div>
            <div className="row">
                {Object.keys(categories).map(category => (
                    <div key={category} className="col-md-4 mb-4">
                        <div 
                            className="card text-center" 
                            onClick={() => handleCategoryClick(category)} 
                            style={{ cursor: 'pointer' }}
                        >
                            <img 
                                src={categories[category]} 
                                className="card-img-top" 
                                alt={`${category} image`} 
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{category}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;
