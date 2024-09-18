import { FC, useMemo, useState, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '../../utils/types';

import { useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices/ingredients';
import { useParams } from 'react-router-dom';
import { getOrderByNumberApi } from '@api';

export const OrderInfo: FC = () => {
  const [orderData, setOrderData] = useState<TOrder>({
    createdAt: '',
    ingredients: [''],
    _id: '',
    status: '',
    name: '',
    updatedAt: '',
    number: 0
  });

  const id = Number(useParams().number);
  const ingredients = useSelector(getIngredients);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total: Object.values(ingredientsInfo).reduce(
        (acc, item) => acc + item.price * item.count,
        0
      )
    };
  }, [orderData, ingredients]);

  useEffect(() => {
    getOrderByNumberApi(id).then((data) => {
      setOrderData(data.orders[0]);
    });
  }, [id]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
