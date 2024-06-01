import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Components.css'

const Soap = () => {
    const [soaps, setSoaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSoaps = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/read');
                console.log(response.data);

                // Filter out entities that belong to the "Soap" subcategory
                const soapsData = response.data.products.filter(soap => soap.subcategory === 'Soap');

                setSoaps(soapsData);
                setLoading(false);
            } catch (error) {
                setError('Error fetching soap');
                setLoading(false);
            }
        };

        fetchSoaps();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    console.log(soaps);

    return (
        <div className="container">
            <h1>Soap</h1>
            <div className="list">
                {soaps.map((soap) => (
                    <div key={soap._id} className="item">
                        <img src={soap.image} alt={soap.name} />
                        <h2>{soap.name}</h2>
                        <p>{soap.description}</p>
                        <p>Price: ${soap.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Soap;
