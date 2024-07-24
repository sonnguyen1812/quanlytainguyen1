import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Spin } from 'antd';
import { ResourceContext } from '../../context/ResourceContext';

const Users = () => {
  const { resources, fetchResources } = useContext(ResourceContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources('users').then(() => {
      setLoading(false);
    }).catch(error => {
      console.error('Error fetching users:', error);
      setLoading(false);
    });
  }, [fetchResources]);

  if (loading) {
    return <Spin />;
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={resources.users}
      renderItem={user => (
        <List.Item>
          <List.Item.Meta
            title={<Link to={`/users/${user.id}`}>{user.name}</Link>}
            description={user.email}
          />
        </List.Item>
      )}
    />
  );
};

export default Users;