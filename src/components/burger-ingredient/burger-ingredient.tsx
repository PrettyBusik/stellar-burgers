import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from '../../services/store';
import { addBun, addIngredient } from '../../services/slices/cartBurger';
import { showIngredientDetails } from '../../services/slices/ingredients';
import { TConstructorIngredient } from '@utils-types';
import { nanoid } from '@reduxjs/toolkit';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const handleClick = () => {
      dispatch(showIngredientDetails(ingredient));
    };

    const handleAdd = () => {
      const ingredientWithId: TConstructorIngredient = {
        ...ingredient,
        id: nanoid()
      };
      if (ingredientWithId.type === 'bun') {
        dispatch(addBun(ingredientWithId));
      } else {
        dispatch(addIngredient(ingredientWithId));
      }
    };

    return (
      <div onClick={handleClick}>
        <BurgerIngredientUI
          ingredient={ingredient}
          count={count}
          locationState={{ background: location }}
          handleAdd={handleAdd}
        />
      </div>
    );
  }
);
