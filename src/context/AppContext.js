import { createContext } from 'react';

export const AppContext = createContext();

export const initialState = 0;
export const reducer = (state, action) => {
   switch (action.type) {
      case 'increment':
         return state + action.value;
      case 'decrement':
         return state - action.value;
      case 'reset':
         return initialState;
      default:
         return state;
   }
};
