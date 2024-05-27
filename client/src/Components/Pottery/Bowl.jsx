import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Bowl = () => {
    const [bowls, setBowls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBowls = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/read');
                console.log(response.data);

                // Filter out entities that belong to the "Bowl" subcategory
                const bowlsData = response.data.products.filter(item => item.subcategory === 'Bowl');

                setBowls(bowlsData);
                setLoading(false);
            } catch (error) {
                setError('Error fetching Bowl products');
                setLoading(false);
            }
        };

        fetchBowls();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    console.log(bowls);

    return (
        <div className="bowls-container">
            <h1>Bowls</h1>
            <div className="bowls-list">
                {bowls.map((product) => (
                    <div key={product._id} className="bowl-item">
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

export default Bowl;