// src/components/Albums/Albums.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Typography, Spin, Card} from 'antd';
import { Link } from 'react-router-dom';
import './Albums.css';

const { Title } = Typography;

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/albums')
      .then(response => {
        setAlbums(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching albums:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spin />;
  }

  return (
    <div>
      <Title level={2}>Albums</Title>
      
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={albums}
        renderItem={album => (
          <List.Item>
            <Link to={`/albums/${album.id}`}>
              <Card hoverable className="album-card">
                <Card.Meta title={album.title} />
              </Card>
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Albums;