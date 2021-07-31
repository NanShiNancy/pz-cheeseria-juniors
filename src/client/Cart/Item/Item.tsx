import React, { useState } from "react";
import Button from '@material-ui/core/Button';

import ItemDetails from './ItemDetails/ItemDetails';

// Types
import { CartItemType } from '../../App';
// Styles
import { Wrapper } from './Item.styles';

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => {

  const [isItemDetailsVisible, setIsItemDetailsVisible] = useState(false);

  const handleItemDetails = () => {
    setIsItemDetailsVisible(isItemDetailVisible => !isItemDetailVisible)
  }

  return (
    <Wrapper>
      <img src={item.image} alt={item.title} onClick={handleItemDetails}/>
      <div onClick={handleItemDetails}>
        <h3>{item.title}</h3>
        <h3>${item.price}</h3>
      </div>
      <Button
        onClick={() => handleAddToCart(item)}
        data-cy={`add-to-cart-${item.id}`}>Add to cart
      </Button>
      <ItemDetails item={item} isVisible={isItemDetailsVisible}/>
    </Wrapper>
  );
}
export default Item;
