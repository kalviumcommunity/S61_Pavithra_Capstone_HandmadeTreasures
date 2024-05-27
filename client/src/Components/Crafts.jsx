import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Crafts = () => {
    const [crafts, setCrafts] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCrafts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/read');
                console.log(response.data); 
                
                // Filter out entities that belong to the "crafts" category
                const craftsData = response.data.products.filter(craft => craft.category === 'crafts');
                
                setCrafts(craftsData); 
                setLoading(false);
            } catch (error) {
                setError('Error fetching crafts');
                setLoading(false);
            }
        };
    
        fetchCrafts();
    }, []);
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    console.log(crafts); 

    return (
        <div className="crafts-container">
            <h1>Crafts</h1>
            <div className="crafts-list">
                {crafts.map((craft) => (
                    <div key={craft._id} className="craft-item">
                        <img src={craft.image} alt={craft.name} />
                        <h2>{craft.name}</h2>
                        <p>{craft.description}</p>
                        <p>Price: ${craft.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Crafts;