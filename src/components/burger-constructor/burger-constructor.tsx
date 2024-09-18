import { useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearOrder,
  getNewOrderModalData,
  getNewOrderRequest,
  getNewOrder
} from '../../services/slices/newOrder';
import { useNavigate } from 'react-router-dom';
import { clearBurgerCart } from '../../services/slices/cartBurger';
import { checkUserAuth } from '../../services/slices/user';

export const BurgerConstructor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderRequest = useSelector(getNewOrderRequest);
  const orderModalData = useSelector(getNewOrderModalData);
  let dataNewOrder: string[] = [];
  const userIsAuth = useSelector(checkUserAuth);

  const { bun, ingredients } = useSelector((state) => state.cart);

  const constructorItems = {
    bun,
    ingredients
  };

  // Добавление заказа
  const onOrderClick = () => {
    if (!userIsAuth) {
      navigate('/login');
    } else if (constructorItems.bun && constructorItems.ingredients) {
      dataNewOrder = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id),
        constructorItems.bun._id
      ];
      console.log(dataNewOrder);
      dispatch(getNewOrder(dataNewOrder));
    }
  };
  // Закрытие моального окна с информацией о заказе
  const closeOrderModal = () => {
    dispatch(clearOrder());
    navigate('/');
    dispatch(clearBurgerCart());
  };

  useEffect(() => {}, []);

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
