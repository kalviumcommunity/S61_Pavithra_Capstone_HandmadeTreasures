// import React, { useState } from 'react';
// import './Login.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:3000/admin/login', {
//                 email,
//                 password
//             });
//             console.log(response.data); 
//         } catch (error) {
//             console.error('Error logging in:', error.response.data.message);
//         }
//     };

//     const handleCreateAccount = () => {
//         navigate('/Signup');
//     };

//     return (
//         <div className="login-page">
//             <div className="login-container">
//                 <div className="login-form">
//                     <h2>Login</h2>
//                     <h4>If you have an account with us, please log in.</h4>
//                     <form onSubmit={handleLogin}>
//                         <div className="form-group">
//                             <label>Email</label>
//                             <input 
//                                 type="email" 
//                                 value={email}
//                                 placeholder="Email" 
//                                 onChange={(e) => setEmail(e.target.value)} 
//                                 required 
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label>Password</label>
//                             <input 
//                                 type="password" 
//                                 value={password}
//                                 placeholder="Password" 
//                                 onChange={(e) => setPassword(e.target.value)} 
//                                 required 
//                             />
//                         </div>
//                         <button type="submit" className="login-button">Login</button>
                        
//                         <button type="button" className="login-button" onClick={handleCreateAccount}>or create an account</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;



import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/admin/login', {
                email,
                password
            });
            console.log(response.data); 
            setErrorMessage(''); // Clear the error message on successful login
            setSuccessMessage('Login successful!');
        } catch (error) {
            setErrorMessage(error.response.data.message); // Set the error message
            setSuccessMessage('');
            console.error('Error logging in:', error.response.data.message);
        }
    };

    const handleCreateAccount = () => {
        navigate('/Signup');
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-form">
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                    <h2>Login</h2>
                    <h4>If you have an account with us, please log in.</h4>
                    <form onSubmit={handleLogin}>
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
                        <button type="submit" className="login-button">Login</button>
                        
                        <button type="button" className="login-button" onClick={handleCreateAccount}>or create an account</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
