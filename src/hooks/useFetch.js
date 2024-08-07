const fetchData = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

const createData = async (url, newItem) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newItem)
  });
  return await response.json();
};

const updateData = async (url, updatedItem) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedItem)
  });
  return await response.json();
};

const deleteData = async (url) => {
  const response = await fetch(url, {
    method: 'DELETE'
  });
  return await response.json();
};

export { fetchData, createData, updateData, deleteData };