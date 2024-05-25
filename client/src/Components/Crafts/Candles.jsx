import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Candles = () => {
    const [candles, setCandles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCandles = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/read');
                console.log(response.data);

                // Filter out entities that belong to the "Candles" subcategory
                const candlesData = response.data.products.filter(candle => candle.subcategory === 'Candles');

                setCandles(candlesData);
                setLoading(false);
            } catch (error) {
                setError('Error fetching candles');
                setLoading(false);
            }
        };

        fetchCandles();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    console.log(candles);

    return (
            <div className="candles-container">
                <h1>Candles</h1>
                <div className="candles-list">
                    {candles.map((candle) => (
                        <div key={candle._id} className="candle-item">
                            <img src={candle.image} alt={candle.name} />
                            <h2>{candle.name}</h2>
                            <p>{candle.description}</p>
                            <p>Price: ${candle.price}</p>
                        </div>
                    ))}
                </div>
            </div>
    );
};

export default Candles;
