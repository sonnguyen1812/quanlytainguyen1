// src/components/Todos/TodoDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Spin, Button, Input, Checkbox } from 'antd';

const TodoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    completed: false
  });

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(response => {
        setTodo(response.data);
        setFormData({
          title: response.data.title,
          completed: response.data.completed
        });
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching todo:', error);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = () => {
    axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, formData)
      .then(response => {
        setTodo(response.data);
        setEditing(false);
      })
      .catch(error => {
        console.error('Error updating todo:', error);
      });
  };

  const handleDelete = () => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(() => {
        navigate('/todos');
      })
      .catch(error => {
        console.error('Error deleting todo:', error);
      });
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <Card title={todo.title}>
      {editing ? (
        <>
          <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
          <Checkbox checked={formData.completed} onChange={e => setFormData({ ...formData, completed: e.target.checked })}>Completed</Checkbox>
          <Button type="primary" onClick={handleUpdate}>Save</Button>
        </>
      ) : (
        <>
          <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
          <Button type="primary" onClick={() => setEditing(true)}>Edit</Button>
        </>
      )}
      <Button type="danger" onClick={handleDelete}>Delete</Button>
    </Card>
  );
};

export default TodoDetail;