import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { List, Typography, Spin, Card, Button, Input, Modal } from 'antd';
import './Users.css';

const { Title } = Typography;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: ''
  });
  const navigate = useNavigate();

  const fetchUsers = () => {
    setLoading(true);
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      username: user.username,
      email: user.email
    });
  };

  const handleSave = () => {
    if (editingUser.id) {
      axios.put(`https://jsonplaceholder.typicode.com/users/${editingUser.id}`, formData)
        .then(response => {
          setUsers(users.map(user => user.id === editingUser.id ? response.data : user));
          setEditingUser(null);
        })
        .catch(error => {
          console.error('Error updating user:', error);
        });
    } else {
      axios.post(`https://jsonplaceholder.typicode.com/users`, formData)
        .then(response => {
          setUsers([...users, response.data]);
          setEditingUser(null);
        })
        .catch(error => {
          console.error('Error creating user:', error);
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <div>
      <Title level={2}>Users</Title>
      <Button type="primary" onClick={() => setEditingUser({ id: null, name: '', username: '', email: '' })}>Add User</Button>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={users}
        renderItem={user => (
          <List.Item>
            <Card hoverable className="user-card" onClick={() => navigate(`/users/${user.id}`)}>
              <Card.Meta title={user.name} description={user.email} />
              <div className="button-group">
                <Button type="primary" onClick={(e) => { e.stopPropagation(); handleEdit(user); }}>Edit</Button>
                <Button type="danger" onClick={(e) => { e.stopPropagation(); handleDelete(user.id); }}>Delete</Button>
              </div>
            </Card>
          </List.Item>
        )}
      />
      {editingUser && (
        <Modal
          title={editingUser.id ? 'Edit User' : 'Add User'}
          visible={true}
          onOk={handleSave}
          onCancel={() => setEditingUser(null)}
        >
          <Input
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            placeholder="Name"
          />
          <Input
            value={formData.username}
            onChange={e => setFormData({ ...formData, username: e.target.value })}
            placeholder="Username"
          />
          <Input
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email"
          />
        </Modal>
      )}
    </div>
  );
};

export default Users;