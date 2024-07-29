import React, { createContext, useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';

export const ResourceContext = createContext({});

export const ResourceProvider = ({ children }) => {
  const [data, setData] = useState({
    users: [],
    posts: [],
    comments: [],
    albums: [],
    photos: [],
    todos: []
  });

  const { fetchData, createData, updateData, deleteData } = useFetch();

  useEffect(() => {
    const fetchInitialData = async () => {
      const users = await fetchData('https://jsonplaceholder.typicode.com/users');
      const posts = await fetchData('https://jsonplaceholder.typicode.com/posts');
      const comments = await fetchData('https://jsonplaceholder.typicode.com/comments');
      const albums = await fetchData('https://jsonplaceholder.typicode.com/albums');
      const photos = await fetchData('https://jsonplaceholder.typicode.com/photos');
      const todos = await fetchData('https://jsonplaceholder.typicode.com/todos');
      
      setData({
        users,
        posts,
        comments,
        albums,
        photos,
        todos
      });
    };

    fetchInitialData();
  }, [fetchData]);

  const updateContextData = (type, updatedData) => {
    setData(prevData => ({
      ...prevData,
      [type]: updatedData
    }));
  };

  const createItem = async (type, newItem) => {
    const createdItem = await createData(`https://jsonplaceholder.typicode.com/${type}`, newItem);
    if (createdItem) {
      updateContextData(type, [...data[type], createdItem]);
    }
  };

  const updateItem = async (type, updatedItem) => {
    const item = await updateData(`https://jsonplaceholder.typicode.com/${type}/${updatedItem.id}`, updatedItem);
    if (item) {
      updateContextData(type, data[type].map(i => (i.id === item.id ? item : i)));
    }
  };

  const deleteItem = async (type, id) => {
    const success = await deleteData(`https://jsonplaceholder.typicode.com/${type}/${id}`);
    if (success) {
      updateContextData(type, data[type].filter(i => i.id !== id));
    }
  };

  return (
    <ResourceContext.Provider value={{ data, createItem, updateItem, deleteItem }}>
      {children}
    </ResourceContext.Provider>
  );
};