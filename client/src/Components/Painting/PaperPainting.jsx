import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Components.css'

const PaperPainting = () => {
    const [paperPaintings, setPaperPaintings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPaperPaintings = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/read');
                console.log(response.data);

                // Filter out entities that belong to the "PaperPainting" subcategory
                const paperPaintingsData = response.data.products.filter(item => item.subcategory === 'PaperPainting');

                setPaperPaintings(paperPaintingsData);
                setLoading(false);
            } catch (error) {
                setError('Error fetching Paper Painting products');
                setLoading(false);
            }
        };

        fetchPaperPaintings();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    console.log(paperPaintings);

    return (
        <div className="container">
            <h1>Paper Paintings</h1>
            <div className="list">
                {paperPaintings.map((product) => (
                    <div key={product._id} className="item">
                        {/* <img src={product.image} alt={product.name} /> */}
                        <div className="image-container">
                            <img src={product.image} alt={product.name} />
                            <span className="heart-icon">♡</span>
                        </div>
                        <img src={product.image} alt={product.name} />
                        <h2>{product.name}</h2>
                        {/* <p>{product.description}</p> */}
                        <p>Price: ${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PaperPainting;
