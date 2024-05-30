import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Bangles = () => {
    const [bangles, setBangles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBangles = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/read');
                console.log(response.data);

                // Filter out entities that belong to the "Bangles" subcategory
                const banglesData = response.data.products.filter(item => item.subcategory === 'Bangles');

                setBangles(banglesData);
                setLoading(false);
            } catch (error) {
                setError('Error fetching Bangles products');
                setLoading(false);
            }
        };

        fetchBangles();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    console.log(bangles);

    return (
        <div className="container">
            <h1>Bangles Products</h1>
            <div className="list">
                {bangles.map((product) => (
                    <div key={product._id} className="item">
                        <div className="image-container">
                            <img src={product.image} alt={product.name} />
                            <span className="heart-icon">♡</span>
                        </div>
                        <h2>{product.name}</h2>
                        {/* <p>{product.description}</p> */}
                        <p>Price: ₹ {product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Bangles;
