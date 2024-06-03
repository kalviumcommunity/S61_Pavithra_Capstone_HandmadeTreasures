import React, { useState } from 'react';
import './Logout.css';

const Logout = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleCreateAccount = (e) => {
        e.preventDefault();
        // Add your account creation logic here
        console.log('First Name:', firstName, 'Last Name:', lastName, 'Email:', email, 'Password:', password);
    };

    return (
        <div className="logout-page">
            <div className="logout-container">
                <div className="logout-form">
                    <h2>Create an Account</h2>
                    <form onSubmit={handleCreateAccount}>
                        <div className="form-group">
                            <label>First Name</label>
                            <input 
                                type="text" 
                                value={firstName}
                                placeholder="First Name" 
                                onChange={(e) => setFirstName(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input 
                                type="text" 
                                value={lastName}
                                placeholder="Last Name" 
                                onChange={(e) => setLastName(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input 
                                type="email" 
                                value={email} 
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input 
                                type="password" 
                                value={password} 
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        <button type="submit" className="signup-button">Sigin</button>
                        {/* <button type="submit" className="logout-button">Sigin</button> */}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Logout;
