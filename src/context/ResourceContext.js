// src/context/ResourceContext.js
import React, { createContext, useState } from 'react';

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

  return (
    <ResourceContext.Provider value={{ resources, setResources }}>
      {children}
    </ResourceContext.Provider>
  );
};