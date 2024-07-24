import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Spin, Button, List } from 'antd';

const AlbumDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios.get(`https://jsonplaceholder.typicode.com/albums/${id}`)
        .then(response => {
          setAlbum(response.data);
          return axios.get(`https://jsonplaceholder.typicode.com/albums/${id}/photos`);
        })
        .then(response => {
          setPhotos(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching album or photos:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <Spin />;
  }

  if (!album) {
    return <div>Error: Album not found</div>;
  }

  return (
    <Card title={album.title}>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={photos}
        renderItem={photo => (
          <List.Item>
            <Card hoverable cover={<img alt={photo.title} src={photo.thumbnailUrl} />}>
              <Card.Meta title={photo.title} />
            </Card>
          </List.Item>
        )}
      />
      <Button type="primary" onClick={() => navigate('/albums')}>Back to Albums</Button>
    </Card>
  );
};

export default AlbumDetail;