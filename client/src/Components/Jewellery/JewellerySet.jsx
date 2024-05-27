import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JewellerySet = () => {
    const [jewellerySets, setJewellerySets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJewellerySets = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/read');
                console.log(response.data);

                // Filter out entities that belong to the "JewellerySet" subcategory
                const jewellerySetsData = response.data.products.filter(item => item.subcategory === 'JewellerySet');

                setJewellerySets(jewellerySetsData);
                setLoading(false);
            } catch (error) {
                setError('Error fetching Jewellery Set products');
                setLoading(false);
            }
        };

        fetchJewellerySets();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    console.log(jewellerySets);

    return (
        <div className="jewellery-sets-container">
            <h1>Jewellery Sets</h1>
            <div className="jewellery-sets-list">
                {jewellerySets.map((product) => (
                    <div key={product._id} className="jewellery-sets-item">
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

export default JewellerySet;