import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CanvasPainting = () => {
    const [canvasPaintings, setCanvasPaintings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCanvasPaintings = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/read');
                console.log(response.data);

                // Filter out entities that belong to the "CanvasPainting" subcategory
                const canvasPaintingsData = response.data.products.filter(item => item.subcategory === 'CanvasPainting');

                setCanvasPaintings(canvasPaintingsData);
                setLoading(false);
            } catch (error) {
                setError('Error fetching Canvas Painting products');
                setLoading(false);
            }
        };

        fetchCanvasPaintings();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    console.log(canvasPaintings);

    return (
        <div className="canvas-paintings-container">
            <h1>Canvas Paintings</h1>
            <div className="canvas-paintings-list">
                {canvasPaintings.map((product) => (
                    <div key={product._id} className="canvas-painting-item">
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

export default CanvasPainting;
