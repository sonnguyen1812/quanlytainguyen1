import { useCallback } from 'react';

const useFetch = () => {
  const fetchData = useCallback(async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }, []);

  const createData = useCallback(async (url, newData) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating data:', error);
      return null;
    }
  }, []);

  const updateData = useCallback(async (url, updatedData) => {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating data:', error);
      return null;
    }
  }, []);

  const deleteData = useCallback(async (url) => {
    try {
      await fetch(url, {
        method: 'DELETE'
      });
      return true;
    } catch (error) {
      console.error('Error deleting data:', error);
      return false;
    }
  }, []);

  return { fetchData, createData, updateData, deleteData };
};

export default useFetch;
