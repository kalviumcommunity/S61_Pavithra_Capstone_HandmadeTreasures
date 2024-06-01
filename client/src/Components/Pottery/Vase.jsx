import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Components.css'

const Vase = () => {
    const [vases, setVases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVases = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/read');
                console.log(response.data);

                // Filter out entities that belong to the "Vase" subcategory
                const vasesData = response.data.products.filter(item => item.subcategory === 'Vase');

                setVases(vasesData);
                setLoading(false);
            } catch (error) {
                setError('Error fetching Vase products');
                setLoading(false);
            }
        };

        fetchVases();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    console.log(vases);

    return (
        <div className="container">
            <h1>Vases</h1>
            <div className="list">
                {vases.map((product) => (
                    <div key={product._id} className="item">
<<<<<<< HEAD
                        <div className="image-container">
                            <img src={product.image} alt={product.name} />
                            <span className="heart-icon">♡</span>
                        </div>
=======
                        <img src={product.image} alt={product.name} />
>>>>>>> 2e9ef55f3539fed066c886712bfb3010d64c3e22
                        <h2>{product.name}</h2>
                        {/* <p>{product.description}</p> */}
                        <p>Price: ${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Vase;
