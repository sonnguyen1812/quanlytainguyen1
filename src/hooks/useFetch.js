import { useCallback } from 'react';

const useFetch = () => {
  const handleResponse = async (response) => {
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    return response.json();
  };

  const fetchData = useCallback(async (url) => {
    try {
      const response = await fetch(url);
      return await handleResponse(response);
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
      return await handleResponse(response);
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
      return await handleResponse(response);
    } catch (error) {
      console.error('Error updating data:', error);
      return null;
    }
  }, []);

  const deleteData = useCallback(async (url) => {
    try {
      const response = await fetch(url, {
        method: 'DELETE'
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      return true;
    } catch (error) {
      console.error('Error deleting data:', error);
      return false;
    }
  }, []);

  return { fetchData, createData, updateData, deleteData };
};

export default useFetch;
