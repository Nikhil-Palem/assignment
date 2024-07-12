import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css';

function Products() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError(error.message); 
            }
        };

        fetchProducts();
    }, []);

    if (error) {
        return <div className="products-container">Error fetching products: {error}</div>;
    }

    return (
        <div className="products-container">
            <h1>Products</h1>
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.title} />
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                        <p>Rating: {product.rating.rate}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;
