import React, { useState, useEffect} from 'react';
import axios from 'axios';
// import '../CSS/Components.css';

const Earring = () => {
    const [earrings, setEarrings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEarrings = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/read');
                console.log(response.data);

                // Filter out entities that belong to the "Earring" subcategory
                const earringData = response.data.products.filter(item => item.subcategory === 'Earring');

                setEarrings(earringData);
                setLoading(false);
            } catch (error) {
                setError('Error fetching Earring products');
                setLoading(false);
            }
        };

        fetchEarrings();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    console.log(earrings);

    return (
        <div className="container">
            <h1>Earring Products</h1>
            <div className="list">
                {earrings.map((product) => (
                    <div key={product._id} className="item">
                        <div className="image-container">
                            <img src={product.image} alt={product.name} />
                            <span className="heart-icon">♡</span>
                        </div>
                        <h2>{product.name}</h2>
                        <p>Price: ₹ {product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Earring;
