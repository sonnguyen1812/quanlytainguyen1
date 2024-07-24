// src/components/Photos/PhotoDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Spin, Button, Input } from 'antd';

const PhotoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    url: ''
  });

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`)
      .then(response => {
        setPhoto(response.data);
        setFormData({
          title: response.data.title,
          url: response.data.url
        });
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching photo:', error);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = () => {
    axios.put(`https://jsonplaceholder.typicode.com/photos/${id}`, formData)
      .then(response => {
        setPhoto(response.data);
        setEditing(false);
      })
      .catch(error => {
        console.error('Error updating photo:', error);
      });
  };

  const handleDelete = () => {
    axios.delete(`https://jsonplaceholder.typicode.com/photos/${id}`)
      .then(() => {
        navigate('/photos');
      })
      .catch(error => {
        console.error('Error deleting photo:', error);
      });
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <Card title={photo.title}>
      {editing ? (
        <>
          <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
          <Input value={formData.url} onChange={e => setFormData({ ...formData, url: e.target.value })} />
          <Button type="primary" onClick={handleUpdate}>Save</Button>
        </>
      ) : (
        <>
          <img src={photo.url} alt={photo.title} />
          <Button type="primary" onClick={() => setEditing(true)}>Edit</Button>
        </>
      )}
      <Button type="danger" onClick={handleDelete}>Delete</Button>
    </Card>
  );
};

export default PhotoDetail;