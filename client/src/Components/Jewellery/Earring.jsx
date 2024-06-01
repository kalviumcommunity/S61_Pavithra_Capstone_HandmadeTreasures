import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerCloseButton, ChakraProvider } from "@chakra-ui/react";
import { CartContext } from '../CartContext';
import '../CSS/Components.css';

const Earring = () => {
    const [earrings, setEarrings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { addToCart } = useContext(CartContext);

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

    const handleDrawerOpen = (product) => {
        setSelectedProduct(product);
        setIsOpen(true);
    };

    const handleDrawerClose = () => {
        setIsOpen(false);
    };

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
                        <div className="image-container" onClick={() => handleDrawerOpen(product)}>
                            <img src={product.image} alt={product.name} />
                            <span className="heart-icon">♡</span>
                        </div>
                        <h2>{product.name}</h2>
                        {/* <p>{product.description}</p> */}
                        <p>Price: ₹{product.price}</p>
                    </div>
                ))}
            </div>
            {selectedProduct && (
                <ChakraProvider>
                    <Drawer placement="right" onClose={handleDrawerClose} isOpen={isOpen} size="lg">
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader className="drawer-header">{selectedProduct.name}</DrawerHeader>
                            <DrawerBody>
                                <div className="drawer-image-container">
                                    <img src={selectedProduct.image} alt={selectedProduct.name} className="drawer-image" />
                                </div>
                                <p className="drawer-details"><strong>Price:</strong> ₹ {selectedProduct.price}</p>
                                <p className="drawer-details"><strong>Product details:</strong> {selectedProduct.description}</p>
                                <div className="drawer-buttons">
                                    {/* <button>Add To Cart</button> */}
                                    <button onClick={() => addToCart(selectedProduct)}>Add To Cart</button>
                                    <button>Buy Now</button>
                                </div>
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                </ChakraProvider>
            )}
        </div>
    );
};

export default Earring;
