// import React, { useState } from 'react';
// import './Signup.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Signup = () => {
//     const [userName, setuserName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errorMessage, setErrorMessage] = useState(''); 
//     const [successMessage, setSuccessMessage] = useState('');
//     const navigate = useNavigate();

//     // const handleCreateAccount = async(e) => {
//     //     e.preventDefault();
//     //     // Add your account creation logic here
//     //     console.log('User Name:', userName, 'Email:', email, 'Password:', password);
//     //     try {
//     //         const response = await axios.post('http://localhost:3000/admin/Signup', {
//     //             userName,
//     //             email,
//     //             password
//     //         });
//     //         console.log(response.data);
//     //         setErrorMessage(''); // Clear the error message on successful login
//     //         setSuccessMessage('Signup successful!');
//     //         // navigate('/login');
//     //     } catch (error) {
//     //         console.error('Error signing up:', error.response.data.message);
//     //         setErrorMessage(error.response.data.message); // Set the error message
//     //         setSuccessMessage('');
//     //         }
//     // };
//     const handleSignup = async (e) => {
//         e.preventDefault();
//         try {
//             // Create user in Firebase Authentication
//             const userCredential = await doCreateUserWithEmailAndPassword(email, password);
//             const firebaseUser = userCredential.user;

//             // Create user in your backend
//             const response = await axios.post('http://localhost:3000/admin/signup', {
//                 userName,
//                 email,
//                 password
//             });

//             console.log("Backend response:", response.data);
//             setErrorMessage('');
//             setSuccessMessage('User created successfully!');
//             toast.success('User created successfully!');
//             navigate('/login');
//         } catch (error) {
//             console.error('Error signing up:', error);
//             setErrorMessage(error.response?.data?.message || 'Error signing up');
//             setSuccessMessage('');
//             toast.error('Error signing up: ' + (error.response?.data?.message || 'Error signing up'));
//         }
//     };

//     return (
//         <div className="Signup-page">
//             <div className="Signup-container">
//                 <div className="Signup-form">
//                 {errorMessage && <p className="error-message">{errorMessage}</p>}
//                 {successMessage && <p className="success-message">{successMessage}</p>}
//                     <h2>Create an Account</h2>
//                     <form onSubmit={handleSignup}>
//                         <div className="form-group">
//                             <label>User Name</label>
//                             <input 
//                                 type="text" 
//                                 value={userName}
//                                 placeholder="userName" 
//                                 onChange={(e) => setuserName(e.target.value)} 
//                                 required 
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label>Email</label>
//                             <input 
//                                 type="email" 
//                                 value={email} 
//                                 placeholder="email"
//                                 onChange={(e) => setEmail(e.target.value)} 
//                                 required 
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label>Password</label>
//                             <input 
//                                 type="password" 
//                                 value={password} 
//                                 placeholder="password"
//                                 onChange={(e) => setPassword(e.target.value)} 
//                                 required 
//                             />
//                         </div>
//                         <button type="submit" className="signup-button">Signup</button>
//                         {/* <button type="submit" className="logout-button">Sigin</button> */}
//                     </form>
//                 </div>
//             </div>
//             <ToastContainer />
//         </div>
//     );
// };

// export default Signup;


import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [userName, setuserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState(''); 
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            // Create user in Firebase Authentication
            const userCredential = await doCreateUserWithEmailAndPassword(email, password);
            const firebaseUser = userCredential.user;

            // Create user in your backend
            const formData = new FormData();
            formData.append('userName', userName);
            formData.append('email', email);
            formData.append('password', password);
            if (selectedFile) {
                formData.append('profilePicture', selectedFile);
            }

            const response = await axios.post('http://localhost:3000/admin/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("Backend response:", response.data);
            setErrorMessage('');
            setSuccessMessage('User created successfully!');
            toast.success('User created successfully!');
            // navigate('/login');
        } catch (error) {
            console.error('Error signing up:', error);
            setErrorMessage(error.response?.data?.message || 'Error signing up');
            setSuccessMessage('');
            toast.error('Error signing up: ' + (error.response?.data?.message || 'Error signing up'));
        }
    };

    return (
        <div className="Signup-page">
            <div className="Signup-container">
                <div className="Signup-form">
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                    <h2>Create an Account</h2>
                    <form onSubmit={handleSignup}>
                        <div className="form-group">
                            <label>User Name</label>
                            <input 
                                type="text" 
                                value={userName}
                                placeholder="User Name" 
                                onChange={(e) => setuserName(e.target.value)} 
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
                        <div className="form-group">
                            <label>Profile Picture</label>
                            <input 
                                type="file" 
                                onChange={handleFileChange} 
                            />
                        </div>
                        <button type="submit" className="signup-button">Signup</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Signup;
Signup.jsx