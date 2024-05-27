import React from "react";
import { Link } from "react-router-dom";
import image1 from "../../assets/Butterfly.png";
import image2 from "../../assets/Handmade logo.png";
import facebookIcon from "../../assets/fb.png";
import whatsappIcon from "../../assets/wa.png";
import instagramIcon from "../../assets/insta.png";
import './footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <div className="footer-logos">
                        <img src={image1} alt="Logo 1" />
                        <img src={image2} alt="Logo 2" />
                    </div>
                    <p>
                        Promote Art. Support Artists.
                    <br/>
                        Welcome to Handycraft World, a platform where you can find valuable online handicrafts from four corners of the earth at your doorstep. Art is an expression diversified by creativity, conception, and inspiration of artists. The potential of what can be created with crafts is seemingly endless.
                    </p>
                </div>
                <div className="footer-section">
                    <h3>USEFUL LINKS</h3>
                    <ul>
                        <li><Link to="/wishlist">Wishlist</Link></li>
                        <li><Link to="/account">My Account</Link></li>
                        <li><Link to="/q&a">Questions & Answers</Link></li>
                        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                        <li><Link to="/terms-and-conditions">Terms and Conditions</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>INFORMATION</h3>
                    <ul>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to="/about">About Handycraft World</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </div>
            </div>
            <div className="footer-follow">
                <p>Follow us:</p>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <img src={facebookIcon} alt="Facebook" />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <img src={instagramIcon} alt="Instagram" />
                </a>
                <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
                    <img src={whatsappIcon} alt="Twitter" />
                </a>
                
            </div>
        </footer>
    );
};

export default Footer;
