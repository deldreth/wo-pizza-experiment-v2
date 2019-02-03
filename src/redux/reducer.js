import { ADD_PIZZA, REMOVE_PIZZA, TOGGLE_TOPPING } from './actions';

import { calculateTotal } from './selectors';

export const initialState = {
  pizzas: {},
  total: 0,
};

function addPizzaHandler(state, action) {
  const toppings = [];
  let price = action.payload.basePrice;
  let totalSelected = 0;

  action.payload.toppings.forEach(({ topping, defaultSelected }) => {
    let selected = false;
    if (defaultSelected) {
      selected = true;
      totalSelected++;
      price += topping.price;
    }

    toppings.push({
      name: topping.name,
      price: topping.price,
      selected,
    });
  });

  const pizzas = {
    ...state.pizzas,
    [Math.random()
      .toString(16)
      .substr(2, 9)]: {
      name: action.payload.name,
      maxToppings: action.payload.maxToppings,
      basePrice: action.payload.basePrice,
      toppings,
      price,
      totalSelected,
    },
  };

  return {
    pizzas,
    total: calculateTotal(pizzas)
  };
}

function removePizzaHandler(state, action) {
  const pizzas = {};

  for (const id in state.pizzas) {
    if (state.pizzas[id] && id !== action.payload.id) {
      pizzas[id] = state.pizzas[id];
    }
  }

  return {
    pizzas,
    total: calculateTotal(pizzas)
  };
}

function toggleToppingHandler(state, action) {
  const { toppings } = state.pizzas[action.payload.pizzaId];
  let { price, totalSelected } = state.pizzas[action.payload.pizzaId];

  toppings.forEach(topping => {
    if (topping.name === action.payload.name) {
      if (topping.selected) {
        topping.selected = false;
        price -= topping.price;
        totalSelected--;
      } else {
        topping.selected = true;
        price += topping.price;
        totalSelected++;
      }
    }
  });

  const pizzas = {
    ...state.pizzas,
    [action.payload.pizzaId]: {
      ...state.pizzas[action.payload.pizzaId],
      toppings,
      price: price,
      totalSelected,
    },
  };

  return {
    pizzas,
    total: calculateTotal(pizzas)
  };
}

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case ADD_PIZZA:
      return addPizzaHandler(state, action);
    case REMOVE_PIZZA:
      return removePizzaHandler(state, action);
    case TOGGLE_TOPPING:
      return toggleToppingHandler(state, action);
    default:
      return state;
  }
}
