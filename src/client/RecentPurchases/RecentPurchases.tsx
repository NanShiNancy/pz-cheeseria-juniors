import React from 'react';
import { useQuery } from 'react-query';
// Material UI
import LinearProgress from '@material-ui/core/LinearProgress';
// Component
import RecentPurchasesItem from './RecentPurchasesItem/RecentPurchasesItem';
// Styles
import { Wrapper } from '../RecentPurchases/RecentPurchases.styles';
//Types
import { CartItemType } from '../App';

const RecentPurchases: React.FC = () => {
  // Get recent purchases from backend.
  const getRecentPurchases = async () => (await fetch('api/recentOrder')).json();
  const { data, isLoading, error } = useQuery(
    'recentPurchasedOrder',
    getRecentPurchases
  );
  if (isLoading) return <LinearProgress/>;
  if (error) return <div>Something went wrong ...</div>;

  return (
    <Wrapper>
      <div>
        <h2>Recent Purchases</h2>
        {data?.order.length === 0 ? <p>No recent purchase order</p> : null}
        {data.order.map((item: CartItemType) => (
          <RecentPurchasesItem
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </Wrapper>
  )

}

export default RecentPurchases;
