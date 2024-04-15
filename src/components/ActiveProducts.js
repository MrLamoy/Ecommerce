import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const ActiveProducts = () => {
    const [activeProducts, setActiveProducts] = useState([]);

    useEffect(() => {
        // Fetch active products from your API endpoint
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/active`) // Replace with your actual API endpoint
            .then(response => response.json())
            .then(data => {
                if (data.product) {
                    setActiveProducts(data.product);
                }
            })
            .catch(error =>
                console.error('Error fetching active products:', error)
            );
    }, []);

    return (
        <div>
            <h2>All Active Products</h2>
            {activeProducts.length > 0 ? (
                <ul>
                    {activeProducts.map((product, index) => (
                        <ProductCard key={index} productProp={product} />
                        // Render ProductCard for each product
                    ))}
                </ul>
            ) : (
                <p>No active products at the moment.</p>
            )}
        </div>
    );
};

export default ActiveProducts;