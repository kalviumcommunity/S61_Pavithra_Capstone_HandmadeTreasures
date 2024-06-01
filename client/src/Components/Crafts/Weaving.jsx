import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Components.css'

const Weaving = () => {
    const [weavingProducts, setWeavingProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeavingProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/read');
                console.log(response.data);

                // Filter out entities that belong to the "Weaving" subcategory
                const weavingData = response.data.products.filter(item => item.subcategory === 'Weaving');

                setWeavingProducts(weavingData);
                setLoading(false);
            } catch (error) {
                setError('Error fetching Weaving products');
                setLoading(false);
            }
        };

        fetchWeavingProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    console.log(weavingProducts);

    return (
        <div className="container">
            <h1>Weaving Products</h1>
            <div className="list">
                {weavingProducts.map((product) => (
                    <div key={product._id} className="item">
                        <img src={product.image} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Weaving;
