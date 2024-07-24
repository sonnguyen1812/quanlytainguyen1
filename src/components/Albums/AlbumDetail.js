import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Spin, Button, Input } from 'antd';
import { ResourceContext } from '../../context/ResourceContext';

const AlbumDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { resources, fetchResources, updateResource, deleteResource } = useContext(ResourceContext);
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: ''
  });

  useEffect(() => {
    if (id) {
      const fetchedAlbum = resources.albums.find(album => album.id === parseInt(id));
      if (fetchedAlbum) {
        setAlbum(fetchedAlbum);
        setFormData({
          title: fetchedAlbum.title
        });
        setLoading(false);
      } else {
        fetchResources('albums').then(() => {
          const newFetchedAlbum = resources.albums.find(album => album.id === parseInt(id));
          if (newFetchedAlbum) {
            setAlbum(newFetchedAlbum);
            setFormData({
              title: newFetchedAlbum.title
            });
          }
          setLoading(false);
        }).catch(error => {
          console.error('Error fetching album:', error);
          setLoading(false);
        });
      }
    } else {
      setLoading(false);
    }
  }, [id, resources.albums, fetchResources]);

  const handleUpdate = () => {
    updateResource('albums', id, formData).then(() => {
      setEditing(false);
    }).catch(error => {
      console.error('Error updating album:', error);
    });
  };

  const handleDelete = () => {
    deleteResource('albums', id).then(() => {
      navigate('/albums');
    }).catch(error => {
      console.error('Error deleting album:', error);
    });
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <Card title={album.title}>
      {editing ? (
        <>
          <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
          <Button type="primary" onClick={handleUpdate}>Save</Button>
        </>
      ) : (
        <>
          <p>{album.title}</p>
          <Button type="primary" onClick={() => setEditing(true)}>Edit</Button>
        </>
      )}
      <Button type="danger" onClick={handleDelete}>Delete</Button>
    </Card>
  );
};

export default AlbumDetail;