import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProductsPage.css';

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [filteredCategory, setFilteredCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/api/read') // Corrected endpoint
            .then(response => {
                console.log(response.data);
                setProducts(response.data.products); // Adjusted to access products array correctly
                const uniqueCategories = response.data.products.reduce((acc, product) => {
                    if (!acc.includes(product.category)) {
                        acc.push(product.category);
                    }
                    return acc;
                }, []);
                setCategories(uniqueCategories);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/api/delete/${id}`)
            .then(response => {
                setProducts(products.filter(product => product._id !== id));
                console.log('Product deleted successfully:', response.data);
            })
            .catch(error => {
                console.error('Error deleting product:', error);
            });
    };

    const handleUpdate = (product) => {
        navigate(`/update/${product._id}`, { state: { product } });
    };

    const handleFilterChange = (e) => {
        setFilteredCategory(e.target.value);
    };

    const filteredProducts = filteredCategory
        ? products.filter(product => product.category === filteredCategory)
        : products;

    return (
        <div className='pro'>
        <div className="product-list-container">
            <h1 className="product-list-title">All Products</h1>
            <div className="filter-area">
                <select
                    id="categoryFilter"
                    value={filteredCategory}
                    onChange={handleFilterChange}
                >
                    <option value="">All</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {products.length === 0 ? (
                <p>No products to display</p>
            ) : (
                <ul className="product-list">
                    {filteredProducts.map(product => (
                        <li key={product._id} className="product-item">
                            <div className="product-details">
                                <div className="product-detail">
                                    <img src={product.image} alt="product" className="product-image" />
                                </div>
                                <div className="product-detail">
                                    <p><strong>Name:</strong> {product.name}</p>
                                    <p><strong>Category:</strong> {product.category}</p>
                                    <p><strong>Subcategory:</strong> {product.subcategory}</p>
                                    <p><strong>Description:</strong> {product.description}</p>
                                    <p><strong>Price:</strong> {product.price}</p>
                                </div>
                                <div className="product-actions">
                                    <button className="update-link" onClick={() => handleUpdate(product)}>Edit</button>
                                    <button className="delete-button" onClick={() => handleDelete(product._id)}>Delete</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

            )}
        </div>
        </div>
    );
}

export default ProductsPage;

