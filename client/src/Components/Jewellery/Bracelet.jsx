// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../CSS/Components/css';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../CSS/Components.css'

// const Bracelet = () => {
//     const [bracelets, setBracelets] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchBracelets = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3000/api/read');
//                 console.log(response.data);

//                 // Filter out entities that belong to the "Bracelet" subcategory
//                 const braceletsData = response.data.products.filter(item => item.subcategory === 'Bracelet');

//                 setBracelets(braceletsData);
//                 setLoading(false);
//             } catch (error) {
//                 setError('Error fetching Bracelet products');
//                 setLoading(false);
//             }
//         };

//         fetchBracelets();
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }

//     console.log(bracelets);

//     return (
//         <div className="container">
//             <h1>Bracelet Products</h1>
//             <div className="list">
//                 {bracelets.map((product) => (
//                     <div key={product._id} className="item">
//                         <div className="image-container">
//                             <img src={product.image} alt={product.name} />
//                             <span className="heart-icon">♡</span>
//                         </div>
//                         <h2>{product.name}</h2>
//                         {/* <p>{product.description}</p> */}
//                         <p>Price: ₹{product.price}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

    // return (
    //     <div className="container">
    //         <h1>Bracelet Products</h1>
    //         <div className="list">
    //             {bracelets.map((product) => (
    //                 <div key={product._id} className="item">
    //                     <img src={product.image} alt={product.name} />
    //                     <h2>{product.name}</h2>
    //                     <p>{product.description}</p>
    //                     <p>Price: ${product.price}</p>
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    // );


// export default Bracelet;
