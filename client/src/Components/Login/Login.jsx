import React, { useState } from 'react';
import './Login.css';
import {
    doSignInWithEmailAndPassword,
    doSignInWithGoogle,
    doSignOut,
} from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext/index";
import { useNavigate, Navigate } from 'react-router-dom';
// import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const Login = () => {
    const { userLoggedIn, setUserLogIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     if (!isSigningIn) {
    //         setIsSigningIn(true);
    //         try {
    //             console.log("Attempting to sign in with email and password...");
    //             console.log("Email:", email);
    //             console.log("Password:", password);
    //             await doSignInWithEmailAndPassword(email, password);
    //             console.log("Signed in successfully, sending login request to server...");
    //             const response = await axios.post('http://localhost:3000/admin/login', {
    //                 email,
    //                 password
    //             });
    //             console.log("Server response:", response.data);

    //             // Check if token is present in the response data
    //             if (response.data.token) {
    //                 // Set cookies on successful login
    //                 Cookies.set('email', email);
    //                 Cookies.set('token', response.data.token); // Set the token cookie
    //                 console.log('Token set in cookies:', response.data.token);
    //             } else {
    //                 console.error('Token not found in server response');
    //             }

    //             setErrorMessage(''); // Clear the error message on successful login
    //             setSuccessMessage('Login successful!');
    //             setUserLogIn(true);
    //             toast.success('Login successful!');

    //             // navigate('/'); 
    //         } catch (error) {
    //             console.error('Error logging in:', error);
    //             console.log('Error response:', error.response);
    //             setErrorMessage(error.response?.data?.message || 'Error logging in');
    //             setSuccessMessage('');
    //             toast.error('Error logging in: ' + (error.response?.data?.message || 'Error logging in'));
    //         } finally {
    //             setIsSigningIn(false);
    //         }
    //     }
    // };


    const handleLogin = async (event) => {
        event.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            console.log("Email:", email);
            console.log("Password:", password);

            try {
                // await doSignInWithEmailAndPassword(email, password);
                console.log("Firebase sign-in successful");

                // Fetch admin details from the database
                const response = await fetch("http://localhost:3000/api/admin/profile");
                console.log("response", response);
                if (!response.ok) {
                    if (response.status === 404) {
                        console.log('User not found in admin profile. User is not an admin.');
                    } else {
                        throw new Error('Failed to fetch admin details');
                    }
                } else {
                    const adminDetails = await response.json();
                    console.log("adminDetails", adminDetails);

                    if (Array.isArray(adminDetails.data)) {
                        const matchedAdmin = adminDetails.data.find(
                            (admin) => email === admin.email 
                            && password === admin.password
                        );

                        if (matchedAdmin) {
                            console.log("The data matches.");
                            localStorage.setItem("adminId", matchedAdmin._id);
                            localStorage.setItem("adminEmail", matchedAdmin.email);
                            localStorage.setItem("adminPassword", matchedAdmin.password);
                            localStorage.setItem("IsAdmin", matchedAdmin.isAdmin);

                            toast.success("Successfully logged in as Admin!");
                            console.log("Successfully logged in as Admin");
                            return;
                        } else {
                            console.log("No matching admin found.");
                        }
                    } else {
                        console.log("adminDetails is not an array or does not have 'data' array:", adminDetails);
                    }
                }

                // If the input details don't match admin, try user login
                const userResponse = await fetch("http://localhost:3000/admin/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    localStorage.setItem("token", userData.token);
                    setUserLogIn(true);

                    if (userData.isAdmin) {
                        localStorage.setItem('IsAdmin', userData.isAdmin);
                        console.log('He is an admin');
                    } else {
                        localStorage.setItem('IsAdmin', false);
                        console.log('He is not an admin');
                    }

                    toast.success(userData.message || "Logged in successfully!");
                } else {
                    const errorData = await userResponse.json();
                    throw new Error(errorData.message || "Failed to log in");
                }
            } catch (error) {
                console.error("Error:", error);
                toast.error(error.message || "An error occurred");
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

        // Remove cookies on logout
        Cookies.remove('email', { path: '/' });
        Cookies.remove('token', { path: '/' });

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

                // Set cookies on successful Google login
                Cookies.set('email', email);
                // Cookies.set('token', response.data.token); // Assuming you handle Google sign-in token

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
                        <div className="form-group">
                            <label>Profile Picture</label>
                            <input
                                type="file"
                                onChange={handleFileChange}
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

