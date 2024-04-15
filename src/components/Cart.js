import React from 'react';

const Cart = ({ cartItems }) => {
  return (
    <div>
      <h3>Your Cart Items</h3>
      <ul>
        {cartItems.map((item) => (
          <li key={item.productId}>
            <p>{item.productId.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Subtotal: ${item.subtotal}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
