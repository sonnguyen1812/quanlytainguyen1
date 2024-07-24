import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Spin, Button, Input } from 'antd';
import { ResourceContext } from '../../context/ResourceContext';

const PhotoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { resources, fetchResources, updateResource, deleteResource } = useContext(ResourceContext);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    url: ''
  });

  useEffect(() => {
    if (id) {
      const fetchedPhoto = resources.photos.find(photo => photo.id === parseInt(id));
      if (fetchedPhoto) {
        setPhoto(fetchedPhoto);
        setFormData({
          title: fetchedPhoto.title,
          url: fetchedPhoto.url
        });
        setLoading(false);
      } else {
        fetchResources('photos').then(() => {
          const newFetchedPhoto = resources.photos.find(photo => photo.id === parseInt(id));
          if (newFetchedPhoto) {
            setPhoto(newFetchedPhoto);
            setFormData({
              title: newFetchedPhoto.title,
              url: newFetchedPhoto.url
            });
          }
          setLoading(false);
        }).catch(error => {
          console.error('Error fetching photo:', error);
          setLoading(false);
        });
      }
    } else {
      setLoading(false);
    }
  }, [id, resources.photos, fetchResources]);

  const handleUpdate = () => {
    updateResource('photos', id, formData).then(() => {
      setEditing(false);
    }).catch(error => {
      console.error('Error updating photo:', error);
    });
  };

  const handleDelete = () => {
    deleteResource('photos', id).then(() => {
      navigate('/photos');
    }).catch(error => {
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
          <p>{photo.url}</p>
          <Button type="primary" onClick={() => setEditing(true)}>Edit</Button>
        </>
      )}
      <Button type="danger" onClick={handleDelete}>Delete</Button>
    </Card>
  );
};

export default PhotoDetail;