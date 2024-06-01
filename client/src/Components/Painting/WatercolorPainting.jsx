import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Components.css';

const WatercolorPainting = () => {
    const [watercolorPaintings, setWatercolorPaintings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWatercolorPaintings = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/read');
                console.log(response.data);

                // Filter out entities that belong to the "WatercolorPainting" subcategory
                const watercolorPaintingsData = response.data.products.filter(item => item.subcategory === 'WatercolorPainting');

                setWatercolorPaintings(watercolorPaintingsData);
                setLoading(false);
            } catch (error) {
                setError('Error fetching Watercolor Painting products');
                setLoading(false);
            }
        };

        fetchWatercolorPaintings();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    console.log(watercolorPaintings);

    return (
        <div className="container">
            <h1>Watercolor Paintings</h1>
            <div className="list">
                {watercolorPaintings.map((product) => (
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

export default WatercolorPainting;
