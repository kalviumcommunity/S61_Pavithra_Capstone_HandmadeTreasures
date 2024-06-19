import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
// import './EditProductPage.css';

export default function EditProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        image: '',
        name: '',
        category: '',
        subcategory: '',
        description: '',
        price: ''
    });

    useEffect(() => {
        if (location.state && location.state.product) {
            setFormData(location.state.product);
        } else {
            axios.get(`http://localhost:3000/api/read/${id}`)
                .then(response => {
                    setFormData(response.data.product);
                })
                .catch(error => {
                    console.error('Error fetching product:', error);
                });
        }
    }, [id, location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         setFormData(prevState => ({
    //             ...prevState,
    //             image: reader.result
    //         }));
    //     };
    //     if (file) {
    //         reader.readAsDataURL(file);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/api/update/${id}`, formData);
            console.log('Product updated successfully:', response.data);
            navigate('/productsPage'); 
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="container">
            <h2 className="text-center">Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Image:</label>
                    <input type="text" className="form-control" name="image" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label className="form-label">Name:</label>
                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label className="form-label">Category:</label>
                    <select className="form-control" name="category" value={formData.category} onChange={handleChange} required>
                        <option value="">Select Category</option>
                        <option value="crafts">Crafts</option>
                        <option value="jewellery">Jewellery</option>
                        <option value="pottery">Pottery</option>
                        <option value="painting">Painting</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">Subcategory:</label>
                    <select className="form-control" name="subcategory" value={formData.subcategory} onChange={handleChange}>
                        <option value="">Select Subcategory</option>
                        <option value="Candles">Candles</option>
                        <option value="Soap">Soap</option>
                        <option value="PaperCrafts">Paper Crafts</option>
                        <option value="WoodenItems">Wooden Items</option>
                        <option value="Necklace">Necklace</option>
                        <option value="Earring">Earring</option>
                        <option value="Bangles">Bangles</option>
                        <option value="JewellerySet">Jewellery Set</option>
                        <option value="CanvasPainting">Canvas Painting</option>
                        <option value="PaperPainting">Paper Painting</option>
                        <option value="OilPainting">Oil Painting</option>
                        <option value="WatercolorPainting">Watercolor Painting</option>
                        <option value="Mug">Mug</option>
                        <option value="Bowl">Bowl</option>
                        <option value="Planter">Planter</option>
                        <option value="Vase">Vase</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">Description:</label>
                    <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} required></textarea>
                </div>
                <div className="form-group">
                    <label className="form-label">Price:</label>
                    <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn">Update Product</button>
            </form>
        </div>
    );
}
