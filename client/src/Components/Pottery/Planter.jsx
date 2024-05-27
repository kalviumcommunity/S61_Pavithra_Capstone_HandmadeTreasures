import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        <div className="planters-container">
            <h1>Planters</h1>
            <div className="planters-list">
                {planters.map((product) => (
                    <div key={product._id} className="planter-item">
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

export default Planter;
