// src/context/ResourceContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ResourceContext = createContext();

export const ResourceProvider = ({ children }) => {
  const [resources, setResources] = useState({
    posts: [],
    comments: [],
    albums: [],
    photos: [],
    todos: [],
    users: []
  });

  const fetchResources = async (resourceType) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/${resourceType}`);
      setResources(prevResources => ({
        ...prevResources,
        [resourceType]: response.data
      }));
    } catch (error) {
      console.error(`Error fetching ${resourceType}:`, error);
    }
  };

  const updateResource = async (resourceType, id, data) => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/${resourceType}/${id}`, data);
      setResources(prevResources => ({
        ...prevResources,
        [resourceType]: prevResources[resourceType].map(item => item.id === id ? response.data : item)
      }));
    } catch (error) {
      console.error(`Error updating ${resourceType}:`, error);
    }
  };

  const deleteResource = async (resourceType, id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/${resourceType}/${id}`);
      setResources(prevResources => ({
        ...prevResources,
        [resourceType]: prevResources[resourceType].filter(item => item.id !== id)
      }));
    } catch (error) {
      console.error(`Error deleting ${resourceType}:`, error);
    }
  };

  useEffect(() => {
    const resourceTypes = ['posts', 'comments', 'albums', 'photos', 'todos', 'users'];
    resourceTypes.forEach(resourceType => fetchResources(resourceType));
  }, []);

  return (
    <ResourceContext.Provider value={{ resources, fetchResources, updateResource, deleteResource }}>
      {children}
    </ResourceContext.Provider>
  );
};