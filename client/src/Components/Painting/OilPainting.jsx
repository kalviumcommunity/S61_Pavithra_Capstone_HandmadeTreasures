import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Components.css'

const OilPainting = () => {
    const [oilPaintings, setOilPaintings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOilPaintings = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/read');
                console.log(response.data);

                // Filter out entities that belong to the "OilPainting" subcategory
                const oilPaintingsData = response.data.products.filter(item => item.subcategory === 'OilPainting');

                setOilPaintings(oilPaintingsData);
                setLoading(false);
            } catch (error) {
                setError('Error fetching Oil Painting products');
                setLoading(false);
            }
        };

        fetchOilPaintings();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    console.log(oilPaintings);

    return (
        <div className="container">
            <h1>Oil Paintings</h1>
            <div className="list">
                {oilPaintings.map((product) => (
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

export default OilPainting;
