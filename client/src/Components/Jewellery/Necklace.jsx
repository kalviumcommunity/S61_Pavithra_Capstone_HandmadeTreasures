import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Necklace = () => {
    const [necklaces, setNecklaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNecklaces = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/read');
                console.log(response.data);

                // Filter out entities that belong to the "Necklace" subcategory
                const necklaceData = response.data.products.filter(item => item.subcategory === 'Necklace');

                setNecklaces(necklaceData);
                setLoading(false);
            } catch (error) {
                setError('Error fetching Necklace products');
                setLoading(false);
            }
        };

        fetchNecklaces();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    console.log(necklaces);

    return (
        <div className="necklace-container">
            <h1>Necklace Products</h1>
            <div className="necklace-list">
                {necklaces.map((product) => (
                    <div key={product._id} className="necklace-item">
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

export default Necklace;
