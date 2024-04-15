import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../UserContext'; 
import Swal from 'sweetalert2';

const CartPage = () => {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userID = user ? user.id : '';

        if (!userID) {
          setLoading(false);
          return;
        }

        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/carts/${userID}`);
        const data = await response.json();

        if (response.ok) {
          setCartItems(data.cartItems);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [user]);

  useEffect(() => {
    // Clear cartItems when user changes
    setCartItems([]);
  }, [user]);


  const handleIncreaseQuantity = (item) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.productId._id === item.productId._id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });
    setCartItems(updatedCartItems);
  };

  const handleDecreaseQuantity = (item) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.productId._id === item.productId._id && cartItem.quantity > 1) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      return cartItem;
    });
    setCartItems(updatedCartItems);
  };

  const calculateSubtotal = (item) => {
    return item.productId.price * item.quantity;
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + calculateSubtotal(item), 0);
  };

  const handleCheckout = async () => {
    try {
      console.log('Cart Items:', cartItems);

      if (cartItems.length === 0) {
        console.log('Cart is empty. Add items before checkout.');
        return;
      }

      const cartItemsPayload = cartItems.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        subtotal: item.subtotal * item.quantity,
      }));

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          cartItems: cartItemsPayload,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Checkout successful:', data);

        // Show a success SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Checkout Successful',
          text: 'All items have been successfully checked out.',
        });

        // Clear the cart in the local state
        setCartItems([]);
      } else {
        console.error('Checkout failed:', data.message);

        // Show an error SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Checkout Failed',
          text: `Failed to checkout items: ${data.message}`,
        });
      }
    } catch (error) {
      console.error('Error during checkout:', error.message);

      // Show an error SweetAlert for unexpected errors
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `An unexpected error occurred: ${error.message}`,
      });
    }
  };

  const handleCheckoutOneItem = async (item) => {
    try {
      console.log('Checkout Item:', item);

      if (!item) {
        console.log('No item selected for checkout.');
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          cartItems: [
            {
              productId: item.productId._id,
              quantity: item.quantity,
              subtotal: item.subtotal * item.quantity,
            },
          ],
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Checkout successful:', data);
        Swal.fire({
                icon: 'success',
                title: 'Checkout Successful',
                text: 'Your item has been successfully checked out.',
              });

        const updatedCartItems = cartItems.filter((cartItem) => cartItem.productId._id !== item.productId._id);
        setCartItems(updatedCartItems);
      } else {
        console.error('Checkout failed:', data.message);
        Swal.fire({
                icon: 'error',
                title: 'Checkout Failed',
                text: `Failed to checkout item: ${data.message}`,
              });
      }
    } catch (error) {
      console.error('Error during checkout:', error.message);
      Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `An unexpected error occurred: ${error.message}`,
          });
    }
  };



  const handleRemoveItem = async (item) => {
  try {
    console.log('Remove Item:', item);

    if (!item) {
      console.log('No item selected for removal.');
      return;
    }

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/carts/${item.productId._id}/removeFromCart`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.id,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Item removal successful:', data);

      // Show a success SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Removal Successful',
        text: 'The item has been successfully removed from your cart.',
      });

      const updatedCartItems = cartItems.filter((cartItem) => cartItem.productId._id !== item.productId._id);
      setCartItems(updatedCartItems);
    } else {
      console.error('Removal failed:', data.message);

      // Show an error SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Removal Failed',
        text: `Failed to remove item: ${data.message}`,
      });
    }
  } catch (error) {
    console.error('Error during removal:', error.message);

    // Show an error SweetAlert for unexpected errors
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `An unexpected error occurred: ${error.message}`,
    });
  }
};

   return (
     <div className="text-center">
       <h2>Your Cart</h2>
       {loading && <p>Loading cart items...</p>}
       {error && <p className="text-danger">Error: {error}</p>}
       {!loading && !error && (
         <div className="table-responsive mx-auto">
           <table className="table table-dark text-light">
             <thead>
               <tr>
                 <th>Name</th>
                 <th>Description</th>
                 <th>Price</th>
                 <th>Quantity</th>
                 <th>Subtotal</th>
                 <th>Remove</th>
               </tr>
             </thead>
             <tbody className="text-dark table-secondary">
               {cartItems.map((item, index) => (
                 <tr key={item.productId._id} className={index % 2 === 0 ? 'bg-dark' : 'bg-gray'}>
                   <td>{item.productId.name}</td>
                   <td>{item.productId.description}</td>
                   <td>Php {item.productId.price}</td>
                   <td>
                     <button className="btn btn-secondary" onClick={() => handleDecreaseQuantity(item)}>
                       -
                     </button>
                     {item.quantity}
                     <button className="btn btn-secondary" onClick={() => handleIncreaseQuantity(item)}>
                       +
                     </button>
                   </td>
                   <td>Php {calculateSubtotal(item)}</td>
                   <td>
                     <button className="btn btn-danger" onClick={() => handleRemoveItem(item)}>
                       Remove
                     </button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
           <p>Total: Php {calculateTotal()}</p>
           <button className="btn btn-primary" onClick={handleCheckout} disabled={cartItems.length === 0}>
             Checkout All Items
           </button>
         </div>
         )}
       </div>
     );
   };

  export default CartPage;


