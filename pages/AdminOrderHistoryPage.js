// import React, { useEffect, useState, useContext } from 'react';
// import UserContext from '../UserContext';

// const AdminOrderHistoryPage = () => {
//   const { user } = useContext(UserContext);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem('token'); // Assuming you store the token in localStorage

//         if (!token) {
//           console.error('No token available.');
//           setError('Authentication failed. No token.');
//           setLoading(false);
//           return;
//         }

//         const response = await fetch('http://localhost:4002/b2/orders/all-orders', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           console.log('Data from the server:', data);
//           setOrders(data.orders || []); // Set orders to an empty array if missing or undefined
//         } else {
//           const data = await response.json();
//           console.error('Error from the server:', data);
//           setError(data.message);
//         }
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <div>
//       <h2>Admin Order History</h2>
//       {orders.length > 0 ? (
//         <div>
//           {orders.map((order) => (
//             <div key={order._id}>
//               {/* Render your order details here */}
//               <p>Order ID: {order._id}</p>
//               {/* Add more order details rendering as needed */}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No orders available.</p>
//       )}
//     </div>
//   );
// };

// export default AdminOrderHistoryPage;
