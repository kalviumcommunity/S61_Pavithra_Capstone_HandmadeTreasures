import React, { useState } from 'react';
import './ImageSlider.css';
import PotteryImage from '../assets/Pottery.png';
import CandlesImage from '../assets/Candles.png';
import JewelleryImage from '../assets/Jewellery.png';

const Home = () => {
    const images = [
        {
            src: PotteryImage,
            alt: 'Image 1',
            text: (
                <>
                    <span className="small-text">The Art of </span>
                    <h3 className="large-text">Pottery</h3>
                    <span className="small-text">“Expectations were like fine pottery. The</span><br/>
                    <span className="small-text">harder you held them, the more likely they</span><br/>
                    <span className="small-text">were to crack”</span>
                </>
            ),
        },
        {
            src: CandlesImage,
            alt: 'Image 2',
            text: (
                <>
                    <span className="small-text">The Art of </span>
                    <h3 className="large-text">Candles</h3>
                    <span className="small-text">“In the right light, at the right time,</span><br/>
                    <span className="small-text">everything is extraordinary.”</span>
                </>
            ),
        },
        {
            src: JewelleryImage,
            alt: 'Image 3',
            text: (
                <>
                    <span className="small-text">The Art of </span>
                    <h3 className="large-text">Jewellery</h3>
                    <span className="small-text">"Handmade jewelry is a bit like crafting with </span><br/>
                    <span className="small-text">candy. Light touch, sweet results. Let each</span><br/>
                    <span className="small-text">piece unfold naturally, like a small, </span><br/>
                    <span className="small-text">delightful treat."</span>
                </>
            ),
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    return (
        <div className="image-slider">
            <button className="left-arrow" onClick={handlePrev}>
                &lt;
            </button>
            <div className="image-holder">
                <img src={images[currentIndex].src} alt={images[currentIndex].alt} className="slider-image" />
                <div className="image-text">{images[currentIndex].text}</div>
            </div>
            <button className="right-arrow" onClick={handleNext}>
                &gt;
            </button>
        </div>
    );
};

export default Home;

