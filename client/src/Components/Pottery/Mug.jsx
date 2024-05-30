import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Components.css'

const Mug = () => {
    const [mugs, setMugs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMugs = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/read');
                console.log(response.data);

                // Filter out entities that belong to the "Mug" subcategory
                const mugsData = response.data.products.filter(item => item.subcategory === 'Mug');

                setMugs(mugsData);
                setLoading(false);
            } catch (error) {
                setError('Error fetching Mug products');
                setLoading(false);
            }
        };

        fetchMugs();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    console.log(mugs);

    return (
        <div className="container">
            <h1>Mugs</h1>
            <div className="list">
                {mugs.map((product) => (
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

export default Mug;
