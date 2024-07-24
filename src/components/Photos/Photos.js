import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Typography, Spin, Card, Button, Input, Modal } from 'antd';
import './Photos.css';

const { Title } = Typography;

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    thumbnailUrl: ''
  });

  const fetchPhotos = () => {
    setLoading(true);
    axios.get('https://jsonplaceholder.typicode.com/photos')
      .then(response => {
        setPhotos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching photos:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleEdit = (photo) => {
    setEditingPhoto(photo);
    setFormData({
      title: photo.title,
      url: photo.url,
      thumbnailUrl: photo.thumbnailUrl
    });
  };

  const handleSave = () => {
    if (editingPhoto.id) {
      axios.put(`https://jsonplaceholder.typicode.com/photos/${editingPhoto.id}`, formData)
        .then(response => {
          setPhotos(photos.map(photo => photo.id === editingPhoto.id ? response.data : photo));
          setEditingPhoto(null);
        })
        .catch(error => {
          console.error('Error updating photo:', error);
        });
    } else {
      axios.post(`https://jsonplaceholder.typicode.com/photos`, formData)
        .then(response => {
          setPhotos([...photos, response.data]);
          setEditingPhoto(null);
        })
        .catch(error => {
          console.error('Error creating photo:', error);
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/photos/${id}`)
      .then(() => {
        setPhotos(photos.filter(photo => photo.id !== id));
      })
      .catch(error => {
        console.error('Error deleting photo:', error);
      });
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <div>
      <Title level={2}>Photos</Title>
      <Button type="primary" onClick={() => setEditingPhoto({ id: null, title: '', url: '', thumbnailUrl: '' })}>Add Photo</Button>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={photos}
        renderItem={photo => (
          <List.Item>
            <Card hoverable className="photo-card">
              <Card.Meta title={photo.title} description={`Album ID: ${photo.albumId}`} />
              <img src={photo.thumbnailUrl} alt={photo.title} />
              <Button type="primary" onClick={() => handleEdit(photo)}>Edit</Button>
              <Button type="danger" onClick={() => handleDelete(photo.id)}>Delete</Button>
            </Card>
          </List.Item>
        )}
      />
      {editingPhoto && (
        <Modal
          title={editingPhoto.id ? 'Edit Photo' : 'Add Photo'}
          visible={true}
          onOk={handleSave}
          onCancel={() => setEditingPhoto(null)}
        >
          <Input
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            placeholder="Title"
          />
          <Input
            value={formData.url}
            onChange={e => setFormData({ ...formData, url: e.target.value })}
            placeholder="URL"
          />
          <Input
            value={formData.thumbnailUrl}
            onChange={e => setFormData({ ...formData, thumbnailUrl: e.target.value })}
            placeholder="Thumbnail URL"
          />
        </Modal>
      )}
    </div>
  );
};

export default Photos;