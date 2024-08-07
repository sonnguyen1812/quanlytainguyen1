import React, { createContext, useReducer, useContext } from 'react';

// Create the context
export const ResourceContext = createContext({});

// Action types
const actionTypes = {
  SET_DATA: 'SET_DATA',
  CREATE_ITEM: 'CREATE_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  DELETE_ITEM: 'DELETE_ITEM'
};

// Reducer function
const dataReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_DATA:
      return { ...state, ...action.payload };
    case actionTypes.CREATE_ITEM:
      return { ...state, [action.payload.type]: [...state[action.payload.type], action.payload.item] };
    case actionTypes.UPDATE_ITEM:
      return {
        ...state,
        [action.payload.type]: state[action.payload.type].map(item =>
            item.id === action.payload.item.id ? action.payload.item : item
        )
      };
    case actionTypes.DELETE_ITEM:
      return {
        ...state,
        [action.payload.type]: state[action.payload.type].filter(item => item.id !== action.payload.id)
      };
    default:
      return state;
  }
};

// Provider component
export const ResourceProvider = ({ children, initialData }) => {
  const [data, dispatch] = useReducer(dataReducer, initialData);

  // CRUD functions
  const createItem = (type, item) => {
    dispatch({ type: actionTypes.CREATE_ITEM, payload: { type, item } });
  };

  const updateItem = (type, item) => {
    dispatch({ type: actionTypes.UPDATE_ITEM, payload: { type, item } });
  };

  const deleteItem = (type, id) => {
    dispatch({ type: actionTypes.DELETE_ITEM, payload: { type, id } });
  };

  return (
      <ResourceContext.Provider value={{ data, createItem, updateItem, deleteItem }}>
        {children}
      </ResourceContext.Provider>
  );
};

// Custom hook for accessing the context
export const useResource = () => useContext(ResourceContext);
