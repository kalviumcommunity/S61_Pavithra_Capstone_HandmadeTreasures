import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerCloseButton, ChakraProvider } from "@chakra-ui/react";
import { CartContext } from '../CartContext';
import '../CSS/Components.css';

const JewellerySet = () => {
    const [jewellerySets, setJewellerySets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { addToCart } = useContext(CartContext);

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

    console.log(jewellerySets);

    return (
        <div className="container">
            <h1>Jewellery Sets</h1>
            <div className="list">
                {jewellerySets.map((product) => (
                    <div key={product._id} className="item">
                        <div className="image-container" onClick={() => handleDrawerOpen(product)}>
                            <img src={product.image} alt={product.name} />
                            <span className="heart-icon">♡</span>
                        </div>
                        <h2>{product.name}</h2>
                        <p>Price: ₹ {product.price}</p>
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

export default JewellerySet;
