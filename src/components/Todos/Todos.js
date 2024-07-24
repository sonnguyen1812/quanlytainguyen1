import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Spin } from 'antd';
import { ResourceContext } from '../../context/ResourceContext';

const Todos = () => {
  const { resources, fetchResources } = useContext(ResourceContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources('todos').then(() => {
      setLoading(false);
    }).catch(error => {
      console.error('Error fetching todos:', error);
      setLoading(false);
    });
  }, [fetchResources]);

  if (loading) {
    return <Spin />;
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={resources.todos}
      renderItem={todo => (
        <List.Item>
          <List.Item.Meta
            title={<Link to={`/todos/${todo.id}`}>{todo.title}</Link>}
            description={`Completed: ${todo.completed ? 'Yes' : 'No'}`}
          />
        </List.Item>
      )}
    />
  );
};

export default Todos;