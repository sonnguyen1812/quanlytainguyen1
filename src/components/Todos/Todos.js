import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Typography, Spin, Card, Button, Input, Modal } from 'antd';
import './Todos.css';

const { Title } = Typography;

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTodo, setEditingTodo] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    completed: false
  });

  const fetchTodos = () => {
    setLoading(true);
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        setTodos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setFormData({
      title: todo.title,
      completed: todo.completed
    });
  };

  const handleSave = () => {
    if (editingTodo.id) {
      axios.put(`https://jsonplaceholder.typicode.com/todos/${editingTodo.id}`, formData)
        .then(response => {
          setTodos(todos.map(todo => todo.id === editingTodo.id ? response.data : todo));
          setEditingTodo(null);
        })
        .catch(error => {
          console.error('Error updating todo:', error);
        });
    } else {
      axios.post(`https://jsonplaceholder.typicode.com/todos`, formData)
        .then(response => {
          setTodos([...todos, response.data]);
          setEditingTodo(null);
        })
        .catch(error => {
          console.error('Error creating todo:', error);
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      })
      .catch(error => {
        console.error('Error deleting todo:', error);
      });
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <div>
      <Title level={2}>Todos</Title>
      <Button type="primary" onClick={() => setEditingTodo({ id: null, title: '', completed: false })}>Add Todo</Button>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={todos}
        renderItem={todo => (
          <List.Item>
            <Card hoverable className="todo-card">
              <Card.Meta title={todo.title} description={`Completed: ${todo.completed ? 'Yes' : 'No'}`} />
              <Button type="primary" onClick={() => handleEdit(todo)}>Edit</Button>
              <Button type="danger" onClick={() => handleDelete(todo.id)}>Delete</Button>
            </Card>
          </List.Item>
        )}
      />
      {editingTodo && (
        <Modal
          title={editingTodo.id ? 'Edit Todo' : 'Add Todo'}
          visible={true}
          onOk={handleSave}
          onCancel={() => setEditingTodo(null)}
        >
          <Input
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            placeholder="Title"
          />
          <Input
            type="checkbox"
            checked={formData.completed}
            onChange={e => setFormData({ ...formData, completed: e.target.checked })}
          /> Completed
        </Modal>
      )}
    </div>
  );
};

export default Todos;