import React, { useState, useEffect } from "react";

// material-ui
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

// Types
import { CartItemType } from '../../../App';
// Styles
import { Wrapper } from './ItemDetails.styles';

type Props = {
  item: CartItemType;
  isVisible: boolean;
};

const renderItemDetails = (item: CartItemType, itemProp: keyof CartItemType) => {
  switch (itemProp) {
    case "image":
      return (<img src={item.image} alt={item.title}/>)
    default:
      return (<p>{item[itemProp]}</p>)
  }
}

const ItemDetails: React.FC<Props> = ({ item, isVisible }) => {
  const [open, setOpen] = useState(isVisible);

  useEffect(() => {
    setOpen(isVisible);
  }, [isVisible]);

  return (
    <Dialog open={open}>
      <DialogTitle id="item-detail-title">{item.title}</DialogTitle>
      <DialogContent id="item-detail-content" dividers>
        {Object.keys(item).map((itemProp) => {
          return (
            <Wrapper key={itemProp}>
              <h3>{itemProp}</h3>
              {renderItemDetails(item, itemProp as keyof CartItemType)}
            </Wrapper>
          )
        })}
      </DialogContent>
      <DialogActions id="item-detail-actions">
        <Button onClick={() => setOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  )
};

export default ItemDetails;
