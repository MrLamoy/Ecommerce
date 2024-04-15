import React, { useEffect, useState } from 'react';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch all orders from the backend
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/my-orders`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          // If the response status is not OK, throw an error
          throw new Error(`Failed to fetch orders. Status: ${response.status}, Message: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Fetched Orders:', data);

        if (data && Array.isArray(data)) {
          // Assuming orders are directly inside 'data' as an array
          setOrders(data);
        } else {
          console.error('Invalid response format. Orders data is missing or not an array:', data);
          setError('Failed to fetch orders. Unexpected response format.');
        }
      } catch (error) {
        console.error('Error during fetchOrders:', error.message || 'Unknown error');
        setError('Failed to fetch orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    // Call the fetchOrders function
    fetchOrders();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <h2>All Orders</h2>
      {loading && <p>Loading orders...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <div>
          {orders.map((order) => (
            <div key={order._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
              <p>Order ID: {order._id}</p>
              <p>User ID: {order.userId}</p>
              <p>Total Price: Php {order.totalPrice}</p>
              <p>Status: {order.status}</p>
              <p>Ordered On: {new Date(order.OrderedOn).toLocaleString()}</p>
              {/* Additional details based on your Order model */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;