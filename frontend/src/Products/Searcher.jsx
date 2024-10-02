import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductSearch = () => {
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [debouncedQuery, setDebouncedQuery] = useState(query);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500); 

        return () => clearTimeout(timer); 
    }, [query]);

    useEffect(() => {
        if (debouncedQuery) {
            handleSearch();
        } else {
            setProducts([]);
            setError(null);
        }
    }, [debouncedQuery]);

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        setProducts([]);

        try {
            const response = await axios.post(`/api/products/_search`, {
                query: {
                    bool: {
                        should: [
                            { regexp: { product_name: `.*${debouncedQuery}.*` } },
                            { regexp: { description: `.*${debouncedQuery}.*` } },
                            { regexp: { tags: `.*${debouncedQuery}.*` } }
                        ]
                    }
                }
            });

            if (response.data.hits && response.data.hits.hits) {
                const fetchedProducts = response.data.hits.hits.map(hit => hit._source);
                setProducts(fetchedProducts);
            } else {
                setError('No products found.');
            }
        } catch (err) {
            console.error('Error fetching products:', err.response ? err.response.data : err.message);
            setError('Failed to fetch products. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6 col-sm-8 col-10">
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control form-control-sm" 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for products..."
                            style={{ textAlign: 'center' }}
                        />
                    </div>
                    {/* <button className="btn btn-primary btn-sm mb-3" onClick={handleSearch}>Search</button> */}
                </div>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}

            {products.length > 0 ? (
                <Table striped bordered hover size="sm">
                    <tbody>
                        {products.map(product => (
                            <tr key={product.product_id}>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{product.product_name}</td> {/* Center horizontally and vertically */}
                                <td>
                                    <img 
                                        src={product.image_url} 
                                        alt={product.product_name} 
                                        style={{ width: '100px' }} 
                                        className="mb-2" 
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                !loading && debouncedQuery && <p>No products found.</p>
            )}

            {!debouncedQuery && !loading && (
                <p>Start typing to search for products...</p>
            )}
        </div>
    );
};

export default ProductSearch;
