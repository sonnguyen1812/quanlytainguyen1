import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Spin } from 'antd';
import { ResourceContext } from '../../context/ResourceContext';

const Photos = () => {
  const { resources, fetchResources } = useContext(ResourceContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources('photos').then(() => {
      setLoading(false);
    }).catch(error => {
      console.error('Error fetching photos:', error);
      setLoading(false);
    });
  }, [fetchResources]);

  if (loading) {
    return <Spin />;
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={resources.photos}
      renderItem={photo => (
        <List.Item>
          <List.Item.Meta
            title={<Link to={`/photos/${photo.id}`}>{photo.title}</Link>}
            description={<img src={photo.url} alt={photo.title} style={{ width: '100px' }} />}
          />
        </List.Item>
      )}
    />
  );
};

export default Photos;