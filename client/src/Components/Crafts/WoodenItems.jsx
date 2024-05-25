import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WoodenItems = () => {
    const [woodenItems, setWoodenItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWoodenItems = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/read');
                console.log(response.data);

                // Filter out entities that belong to the "WoodenItems" subcategory
                const woodenItemsData = response.data.products.filter(item => item.subcategory === 'WoodenItems');

                setWoodenItems(woodenItemsData);
                setLoading(false);
            } catch (error) {
                setError('Error fetching WoodenItems');
                setLoading(false);
            }
        };

        fetchWoodenItems();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    console.log(woodenItems);

    return (
        <div className="wooden-items-container">
            <h1>Wooden Items</h1>
            <div className="wooden-items-list">
                {woodenItems.map((item) => (
                    <div key={item._id} className="wooden-item">
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

export default WoodenItems;
