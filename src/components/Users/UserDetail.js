import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Spin, Button, Input } from 'antd';
import { ResourceContext } from '../../context/ResourceContext';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { resources, fetchResources, updateResource, deleteResource } = useContext(ResourceContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    if (id) {
      const fetchedUser = resources.users.find(user => user.id === parseInt(id));
      if (fetchedUser) {
        setUser(fetchedUser);
        setFormData({
          name: fetchedUser.name,
          email: fetchedUser.email
        });
        setLoading(false);
      } else {
        fetchResources('users').then(() => {
          const newFetchedUser = resources.users.find(user => user.id === parseInt(id));
          if (newFetchedUser) {
            setUser(newFetchedUser);
            setFormData({
              name: newFetchedUser.name,
              email: newFetchedUser.email
            });
          }
          setLoading(false);
        }).catch(error => {
          console.error('Error fetching user:', error);
          setLoading(false);
        });
      }
    } else {
      setLoading(false);
    }
  }, [id, resources.users, fetchResources]);

  const handleUpdate = () => {
    updateResource('users', id, formData).then(() => {
      setEditing(false);
    }).catch(error => {
      console.error('Error updating user:', error);
    });
  };

  const handleDelete = () => {
    deleteResource('users', id).then(() => {
      navigate('/users');
    }).catch(error => {
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
          <Input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
          <Button type="primary" onClick={handleUpdate}>Save</Button>
        </>
      ) : (
        <>
          <p>{user.email}</p>
          <Button type="primary" onClick={() => setEditing(true)}>Edit</Button>
        </>
      )}
      <Button type="danger" onClick={handleDelete}>Delete</Button>
    </Card>
  );
};

export default UserDetail;