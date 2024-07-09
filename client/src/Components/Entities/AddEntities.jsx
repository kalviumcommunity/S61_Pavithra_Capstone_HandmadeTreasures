import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddEntities.css';

export default function AddEntitiesPage() {
    const navigate = useNavigate();
    const [popupMsg, setPopupMsg] = useState('');

    const [formData, setFormData] = useState({
        image: '',
        name: '',
        category: '',
        subcategory: '',
        description: '',
        price: '',
        admin: ''
    });

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Check if the user is an admin
        const adminStatus = localStorage.getItem('IsAdmin') === 'true';
        setIsAdmin(adminStatus);

        if (!adminStatus) {
            toast.error('User does not have access to add post');
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAdmin) {
            toast.error('User does not have access to add post');
            return;
        }
        
        const adminId = localStorage.getItem('adminId'); // Ensure this is set correctly
        const payload = {
            ...formData,
            admin: adminId
        };
    
        console.log('Submitting form data:', payload);
    
        try {
            const response = await axios.post('http://localhost:3000/api/create', payload);
            console.log('Product added successfully:', response.data);
            setPopupMsg('Product added successfully!');
            toast.success('Product added successfully!');
        } catch (error) {
            console.error('Error adding product:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
                toast.error('Error adding product. Please try again.');
            }
        }
    };

    return (
        <div className='pro'>
            <div className="Container">
                {popupMsg && <p className="success-message">{popupMsg}</p>}
                <h2 className="text-center">Add New Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Image:</label>
                        <input type="text" className="form-control" name="image" onChange={handleChange} required />
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
                    <button type="submit" className="btn">Add Product</button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}
