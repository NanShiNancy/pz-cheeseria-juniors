import React from 'react';
import Button from '@material-ui/core/Button';
import CartItem from './CartItem/CartItem';
import { Wrapper } from './Cart.styles';
import { CartItemType } from '../App';

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  setCartOpen: (carOpen: boolean) => void;
  handlePurchase: (cartItems: CartItemType[]) => void;

};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart, handlePurchase }) => {

  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <div className='order-wrapper'>
        <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
        {cartItems.length !== 0 &&
        <Button className='purchase-button' data-cy='cart-purchase' onClick={() => handlePurchase(cartItems)}>
            <h2>Purchase</h2>
        </Button>}
      </div>
    </Wrapper>
  );
};

export default Cart;
