import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import image1 from '../assets/Butterfly.png';
import image2 from '../assets/Handmade logo.png';
import loginIcon from '../assets/login.png';
import cartIcon from '../assets/Cart.png';
import searchIcon from '../assets/Search.png';

const Navbar = () => {
    const [openDropdown, setOpenDropdown] = useState(null);

    const handleDropdownToggle = (category) => {
        setOpenDropdown(openDropdown === category ? null : category);
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="logo">
                        <Link to="/">
                            <img src={image1} alt="Logo 1" />
                            <img src={image2} alt="Logo 2" />
                        </Link>
                    </div>
                    <div className="search-bar">
                        <input type="text" placeholder="Search for products..." />
                        <button type="submit">
                            <img src={searchIcon} alt="Search" />
                        </button>
                    </div>
                    <div className="icons">
                        <Link to="/login" className="login-icon">
                            <img src={loginIcon} alt="Login" />
                        </Link>
                        <Link to="/cart" className="cart-icon">
                            <img src={cartIcon} alt="Cart" />
                        </Link>
                    </div>
                </div>
                <hr />
                <div className="nav-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <div className="nav-link dropdown" onClick={() => handleDropdownToggle('crafts')}>
                        Crafts
                        {openDropdown === 'crafts' && (
                            <div className="dropdown-content-wrapper">
                                <div className="dropdown-content">
                                    <Link to="/crafts/candles" className="dropdown-item">Candles</Link>
                                    <Link to="/crafts/soap" className="dropdown-item">Soap</Link>
                                    <Link to="/crafts/papercrafts" className="dropdown-item">PaperCrafts</Link>
                                    <Link to="/crafts/woodenitems" className="dropdown-item">WoodenItems</Link>
                                    <Link to="/crafts/weaving" className="dropdown-item">Weaving</Link>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="nav-link dropdown" onClick={() => handleDropdownToggle('jewellery')}>
                        Jewellery
                        {openDropdown === 'jewellery' && (
                            <div className="dropdown-content-wrapper">
                                <div className="dropdown-content">
                                    <Link to="/jewellery/necklace" className="dropdown-item">Necklace</Link>
                                    <Link to="/jewellery/earring" className="dropdown-item">Earring</Link>
                                    <Link to="/jewellery/bangles" className="dropdown-item">Bangles</Link>
                                    <Link to="/jewellery/bracelet" className="dropdown-item">Bracelet</Link>
                                    <Link to="/jewellery/jewelleryset" className="dropdown-item">JewellerySet</Link>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="nav-link dropdown" onClick={() => handleDropdownToggle('pottery')}>
                        Pottery
                        {openDropdown === 'pottery' && (
                            <div className="dropdown-content-wrapper">
                                <div className="dropdown-content">
                                    <Link to="/pottery/mug" className="dropdown-item">Mug</Link>
                                    <Link to="/pottery/bowl" className="dropdown-item">Bowl</Link>
                                    <Link to="/pottery/planter" className="dropdown-item">Planter</Link>
                                    <Link to="/pottery/vase" className="dropdown-item">Vase</Link>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="nav-link dropdown" onClick={() => handleDropdownToggle('painting')}>
                        Painting
                        {openDropdown === 'painting' && (
                            <div className="dropdown-content-wrapper">
                                <div className="dropdown-content">
                                    <Link to="/painting/canvaspainting" className="dropdown-item">CanvasPainting</Link>
                                    <Link to="/painting/paperpainting" className="dropdown-item">PaperPainting</Link>
                                    <Link to="/painting/oilpainting" className="dropdown-item">OilPainting</Link>
                                    <Link to="/painting/watercolorpainting" className="dropdown-item">WatercolorPainting</Link>
                                </div>
                            </div>
                        )}
                    </div>
                    <Link to="/favorites" className="nav-link favorites-icon">♡</Link>
                </div>
            </nav>
        </>
    );
};

export default Navbar;

