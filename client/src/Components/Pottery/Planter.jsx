import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Components.css';

const Planter = () => {
    const [planters, setPlanters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlanters = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/read');
                console.log(response.data);

                // Filter out entities that belong to the "Planter" subcategory
                const plantersData = response.data.products.filter(item => item.subcategory === 'Planter');

                setPlanters(plantersData);
                setLoading(false);
            } catch (error) {
                setError('Error fetching Planter products');
                setLoading(false);
            }
        };

        fetchPlanters();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    console.log(planters);

    return (
        <div className="container">
            <h1>Planters</h1>
            <div className="list">
                {planters.map((product) => (
                    <div key={product._id} className="item">
                        <div className="image-container">
                            <img src={product.image} alt={product.name} />
                            <span className="heart-icon">♡</span>
                        </div>
                        <h2>{product.name}</h2>
                        <p>Price: ${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Planter;
