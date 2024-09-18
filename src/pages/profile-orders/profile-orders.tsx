import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { getOrdersList } from '../../services/slices/orderList';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector((state) => state.orderList.orders);

  useEffect(() => {
    dispatch(getOrdersList());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
