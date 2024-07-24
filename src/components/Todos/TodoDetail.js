import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Spin, Button, Input, Checkbox } from 'antd';
import { ResourceContext } from '../../context/ResourceContext';

const TodoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { resources, fetchResources, updateResource, deleteResource } = useContext(ResourceContext);
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    completed: false
  });

  useEffect(() => {
    if (id) {
      const fetchedTodo = resources.todos.find(todo => todo.id === parseInt(id));
      if (fetchedTodo) {
        setTodo(fetchedTodo);
        setFormData({
          title: fetchedTodo.title,
          completed: fetchedTodo.completed
        });
        setLoading(false);
      } else {
        fetchResources('todos').then(() => {
          const newFetchedTodo = resources.todos.find(todo => todo.id === parseInt(id));
          if (newFetchedTodo) {
            setTodo(newFetchedTodo);
            setFormData({
              title: newFetchedTodo.title,
              completed: newFetchedTodo.completed
            });
          }
          setLoading(false);
        }).catch(error => {
          console.error('Error fetching todo:', error);
          setLoading(false);
        });
      }
    } else {
      setLoading(false);
    }
  }, [id, resources.todos, fetchResources]);

  const handleUpdate = () => {
    updateResource('todos', id, formData).then(() => {
      setEditing(false);
    }).catch(error => {
      console.error('Error updating todo:', error);
    });
  };

  const handleDelete = () => {
    deleteResource('todos', id).then(() => {
      navigate('/todos');
    }).catch(error => {
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