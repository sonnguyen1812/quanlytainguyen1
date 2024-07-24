import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Spin } from 'antd';
import { ResourceContext } from '../../context/ResourceContext';

const Posts = () => {
  const { resources, fetchResources } = useContext(ResourceContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources('posts').then(() => {
      setLoading(false);
    }).catch(error => {
      console.error('Error fetching posts:', error);
      setLoading(false);
    });
  }, [fetchResources]);

  if (loading) {
    return <Spin />;
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={resources.posts}
      renderItem={post => (
        <List.Item>
          <List.Item.Meta
            title={<Link to={`/posts/${post.id}`}>{post.title}</Link>}
            description={post.body}
          />
        </List.Item>
      )}
    />
  );
};

export default Posts;