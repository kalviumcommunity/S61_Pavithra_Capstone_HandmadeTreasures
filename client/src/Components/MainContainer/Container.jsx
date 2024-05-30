import React from 'react';
import { Link } from 'react-router-dom';
import './MainContainer.css';
import potteryImage from '../../assets/potts.png'; 
import handicraftsImage from '../../assets/Handicrafts.png';
import paintingImage from '../../assets/Painting.png';
import jewelleryImage from '../../assets/Jewellery1.png';
import candlesImage from '../../assets/Candle.png';
import braceletImage from '../../assets/Bracelet.png';

const MainContainer = () => {
    return (
        <div className="main-container">
            <h1 className="main-title">HANDYCRAFT WORLD COLLECTIONS</h1>
            <h2>FEATURED CATEGORIES</h2>
            <p className="main-subtitle">Visit our shop to see amazing authentic collections.</p>
            <div className="featured-categories">
                <div className="categories-list">
                    <div className="category-item">
                        <Link to="/pottery/bowl">
                            <img src={potteryImage} alt="Pottery" />
                            <p>Pottery</p>
                        </Link>
                    </div>
                    <div className="category-item">
                        <Link to="/crafts/papercrafts">
                            <img src={handicraftsImage} alt="Handicrafts" />
                            <p>Handicrafts</p>
                        </Link>
                    </div>
                    <div className="category-item">
                        <Link to="/painting/canvaspainting">
                            <img src={paintingImage} alt="Painting" />
                            <p>Painting</p>
                        </Link>
                    </div>
                </div>
                <div className="categories-list">
                    <div className="category-item">
                        <Link to="/jewellery/necklace">
                            <img src={jewelleryImage} alt="Jewellery" />
                            <p>Jewellery</p>
                        </Link>
                    </div>
                    <div className="category-item">
                        <Link to="/crafts/candles">
                            <img src={candlesImage} alt="Candles" />
                            <p>Candles</p>
                        </Link>
                    </div>
                    <div className="category-item">
                        <Link to="/jewellery/bracelet">
                            <img src={braceletImage} alt="Bracelet" />
                            <p>Bracelet</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainContainer;
