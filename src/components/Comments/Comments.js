import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Spin } from 'antd';
import { ResourceContext } from '../../context/ResourceContext';

const Comments = () => {
  const { resources, fetchResources } = useContext(ResourceContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources('comments').then(() => {
      setLoading(false);
    }).catch(error => {
      console.error('Error fetching comments:', error);
      setLoading(false);
    });
  }, [fetchResources]);

  if (loading) {
    return <Spin />;
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={resources.comments}
      renderItem={comment => (
        <List.Item>
          <List.Item.Meta
            title={<Link to={`/comments/${comment.id}`}>{comment.name}</Link>}
            description={comment.body}
          />
        </List.Item>
      )}
    />
  );
};

export default Comments;