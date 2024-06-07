import React, { useState } from 'react';
import './Login.css';
import {
    doSignInWithEmailAndPassword,
    doSignInWithGoogle,
    doSignOut,
} from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext/index";
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const Login = () => {
    const { userLoggedIn, setUserLogIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                console.log("Attempting to sign in with email and password...");
                console.log("Email:", email);
                console.log("Password:", password);
                await doSignInWithEmailAndPassword(email, password);
                console.log("Signed in successfully, sending login request to server...");
                const response = await axios.post('http://localhost:3000/admin/login', {
                    email,
                    password
                });
                console.log("Server response:", response.data);
                setErrorMessage(''); // Clear the error message on successful login
                setSuccessMessage('Login successful!');
                setUserLogIn(true);
                toast.success('Login successful!');
                // navigate('/'); 
            } catch (error) {
                console.error('Error logging in:', error);
                console.log('Error response:', error.response);
                setErrorMessage(error.response?.data?.message || 'Error logging in');
                setSuccessMessage('');
                toast.error('Error logging in: ' + (error.response?.data?.message || 'Error logging in'));
            } finally {
                setIsSigningIn(false);
            }
        }
    };

    const handleCreateAccount = () => {
        navigate('/Signup');
    };

    const handleLogout = async () => {
        await doSignOut();
        localStorage.removeItem("token");
        setUserLogIn(false);
        toast.success('Logged out successfully!');
    };

    const onGoogleSignIn = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                console.log("Attempting to sign in with Google...");
                await doSignInWithGoogle();
                console.log("Signed in with Google successfully!");
                setUserLogIn(true);
                toast.success('Signed in with Google successfully!');
                // navigate('/'); 
            } catch (error) {
                setErrorMessage('Error logging in with Google');
                console.error('Error logging in with Google:', error);
                toast.error('Error logging in with Google');
            } finally {
                setIsSigningIn(false);
            }
        }
    };

    return (
        <div className="login-page">
            {userLoggedIn && <Navigate to={"/"} replace={true} />}
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
                        {userLoggedIn ? (
                            <button type="button" className="logout-button" onClick={handleLogout}>
                                Logout
                            </button>
                        ) : (
                            <>
                                <button type="submit" className="login-button">Login</button>
                                <button type="button" className="login-button" onClick={handleCreateAccount}>or create an account</button>
                                <button type="button" className="login-button" onClick={onGoogleSignIn}>Login with Google</button>
                            </>
                        )}
                    </form>
                </div>
            </div>
            <ToastContainer /> 
        </div>
    );
};

export default Login;