import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerCloseButton, ChakraProvider } from "@chakra-ui/react";
import { CartContext } from '../CartContext';
import '../CSS/Components.css';

const Mug = () => {
    const [mugs, setMugs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { addToCart } = useContext(CartContext);

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

    console.log(mugs);

    return (
        <div className="container">
            <h1>Mugs</h1>
            <div className="list">
                {mugs.map((product) => (
                    <div key={product._id} className="item">
                        <div className="image-container" onClick={() => handleDrawerOpen(product)}>
                            <img src={product.image} alt={product.name} />
                            <span className="heart-icon">♡</span>
                        </div>
                        <h2>{product.name}</h2>
                        <p>Price: ${product.price}</p>
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

export default Mug;
