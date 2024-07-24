import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Spin } from 'antd';
import { ResourceContext } from '../../context/ResourceContext';

const Albums = () => {
  const { resources, fetchResources } = useContext(ResourceContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources('albums').then(() => {
      setLoading(false);
    }).catch(error => {
      console.error('Error fetching albums:', error);
      setLoading(false);
    });
  }, [fetchResources]);

  if (loading) {
    return <Spin />;
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={resources.albums}
      renderItem={album => (
        <List.Item>
          <List.Item.Meta
            title={<Link to={`/albums/${album.id}`}>{album.title}</Link>}
          />
        </List.Item>
      )}
    />
  );
};

export default Albums;