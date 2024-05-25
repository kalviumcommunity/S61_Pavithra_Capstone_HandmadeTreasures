import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaperCrafts = () => {
    const [paperCrafts, setPaperCrafts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPaperCrafts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/read');
                console.log(response.data);

                // Filter out entities that belong to the "PaperCrafts" subcategory
                const paperCraftsData = response.data.products.filter(item => item.subcategory === 'PaperCrafts');

                setPaperCrafts(paperCraftsData);
                setLoading(false);
            } catch (error) {
                setError('Error fetching PaperCrafts');
                setLoading(false);
            }
        };

        fetchPaperCrafts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    console.log(paperCrafts);

    return (
        <div className="paper-crafts-container">
            <h1>Paper Crafts</h1>
            <div className="paper-crafts-list">
                {paperCrafts.map((item) => (
                    <div key={item._id} className="paper-craft-item">
                        <img src={item.image} alt={item.name} />
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <p>Price: ${item.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PaperCrafts;
