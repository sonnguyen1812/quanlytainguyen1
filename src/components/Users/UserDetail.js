// src/components/Users/UserDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Spin, Button, Input } from 'antd';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    address: '',
    phone: '',
    website: '',
    company: ''
  });

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => {
        setUser(response.data);
        setFormData({
          name: response.data.name,
          username: response.data.username,
          email: response.data.email,
          address: `${response.data.address.street}, ${response.data.address.city}`,
          phone: response.data.phone,
          website: response.data.website,
          company: response.data.company.name
        });
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = () => {
    axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, formData)
      .then(response => {
        setUser(response.data);
        setEditing(false);
      })
      .catch(error => {
        console.error('Error updating user:', error);
      });
  };

  const handleDelete = () => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        navigate('/users');
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <Card title={user.name}>
      {editing ? (
        <>
          <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
          <Input value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} />
          <Input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
          <Input value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
          <Input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
          <Input value={formData.website} onChange={e => setFormData({ ...formData, website: e.target.value })} />
          <Input value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
          <Button type="primary" onClick={handleUpdate}>Save</Button>
        </>
      ) : (
        <>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Address: {user.address.street}, {user.address.city}</p>
          <p>Phone: {user.phone}</p>
          <p>Website: {user.website}</p>
          <p>Company: {user.company.name}</p>
          <Button type="primary" onClick={() => setEditing(true)}>Edit</Button>
        </>
      )}
      <Button type="danger" onClick={handleDelete}>Delete</Button>
    </Card>
  );
};

export default UserDetail;