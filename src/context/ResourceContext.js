import React, { createContext, useReducer, useEffect } from 'react';
import useCreateItem from '../hooks/useCreateItem';
import useUpdateItem from '../hooks/useUpdateItem';
import useDeleteItem from '../hooks/useDeleteItem';
import useFetch from '../hooks/useFetch';

export const ResourceContext = createContext({});


const actionTypes = {
  SET_DATA: 'SET_DATA',
  CREATE_ITEM: 'CREATE_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  DELETE_ITEM: 'DELETE_ITEM'
};


const dataReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_DATA:
      return {
        ...state,
        ...action.payload
      };
    case actionTypes.CREATE_ITEM:
      return {
        ...state,
        [action.payload.type]: [...state[action.payload.type], action.payload.item]
      };
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

export const ResourceProvider = ({ children }) => {
  const [data, dispatch] = useReducer(dataReducer, {});
  const { fetchData } = useFetch();
  const { createItem } = useCreateItem();
  const { updateItem } = useUpdateItem();
  const { deleteItem } = useDeleteItem();

  useEffect(() => {
    const fetchInitialData = async () => {
      const users = await fetchData('https://jsonplaceholder.typicode.com/users');
      const posts = await fetchData('https://jsonplaceholder.typicode.com/posts');
      const comments = await fetchData('https://jsonplaceholder.typicode.com/comments');
      const albums = await fetchData('https://jsonplaceholder.typicode.com/albums');
      const photos = await fetchData('https://jsonplaceholder.typicode.com/photos');
      const todos = await fetchData('https://jsonplaceholder.typicode.com/todos');
      
      dispatch({
        type: actionTypes.SET_DATA,
        payload: { users, posts, comments, albums, photos, todos }
      });
    };

    fetchInitialData();
  }, [fetchData]);

  const createItemHandler = async (type, newItem) => {
    const createdItem = await createItem(type, newItem);
    if (createdItem) {
      dispatch({
        type: actionTypes.CREATE_ITEM,
        payload: { type, item: createdItem }
      });
    }
  };

  const updateItemHandler = async (type, updatedItem) => {
    const item = await updateItem(type, updatedItem);
    if (item) {
      dispatch({
        type: actionTypes.UPDATE_ITEM,
        payload: { type, item }
      });
    }
  };

  const deleteItemHandler = async (type, id) => {
    const success = await deleteItem(type, id);
    if (success) {
      dispatch({
        type: actionTypes.DELETE_ITEM,
        payload: { type, id }
      });
    }
  };

  return (
    <ResourceContext.Provider value={{ data, createItem: createItemHandler, updateItem: updateItemHandler, deleteItem: deleteItemHandler }}>
      {children}
    </ResourceContext.Provider>
  );
};
