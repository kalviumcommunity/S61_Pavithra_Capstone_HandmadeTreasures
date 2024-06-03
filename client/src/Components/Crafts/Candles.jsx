import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerCloseButton, ChakraProvider } from "@chakra-ui/react";
import { CartContext } from '../CartContext';
import '../CSS/Components.css';

const Candles = () => {
    const [candles, setCandles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchCandles = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/read');
                // console.log(response.data);
                // Filter out entities that belong to the "Candles" subcategory
                const candlesData = response.data.products.filter(candle => candle.subcategory === 'Candles');

                setCandles(candlesData);
                setLoading(false);
            } catch (error) {
                setError('Error fetching candles');
                setLoading(false);
            }
        };

        fetchCandles();
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

    return (
        <div className="container">
            <h1>Candles</h1>
            <div className="list">
                {candles.map((candle) => (
                    <div key={candle._id} className="item">
                        <div className="image-container" onClick={() => handleDrawerOpen(product)}>
                            <img src={candle.image} alt={candle.name} />
                            <span className="heart-icon">♡</span>
                        </div>
                        <h2>{candle.name}</h2>
                        <p>Price: ${candle.price}</p>
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

export default Candles;
