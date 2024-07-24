import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Typography, Spin, Card, Button, Input, Modal } from 'antd';
import './Posts.css';

const { Title } = Typography;

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    body: ''
  });

  const fetchPosts = () => {
    setLoading(true);
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      body: post.body
    });
  };

  const handleSave = () => {
    if (editingPost.id) {
      axios.put(`https://jsonplaceholder.typicode.com/posts/${editingPost.id}`, formData)
        .then(response => {
          setPosts(posts.map(post => post.id === editingPost.id ? response.data : post));
          setEditingPost(null);
        })
        .catch(error => {
          console.error('Error updating post:', error);
        });
    } else {
      axios.post(`https://jsonplaceholder.typicode.com/posts`, formData)
        .then(response => {
          setPosts([...posts, response.data]);
          setEditingPost(null);
        })
        .catch(error => {
          console.error('Error creating post:', error);
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => {
        setPosts(posts.filter(post => post.id !== id));
      })
      .catch(error => {
        console.error('Error deleting post:', error);
      });
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <div>
      <Title level={2}>Posts</Title>
      <Button type="primary" onClick={() => setEditingPost({ id: null, title: '', body: '' })}>Add Post</Button>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={posts}
        renderItem={post => (
          <List.Item>
            <Card hoverable className="post-card">
              <Card.Meta title={post.title} description={post.body} />
              <Button type="primary" onClick={() => handleEdit(post)}>Edit</Button>
              <Button type="danger" onClick={() => handleDelete(post.id)}>Delete</Button>
            </Card>
          </List.Item>
        )}
      />
      {editingPost && (
        <Modal
          title={editingPost.id ? 'Edit Post' : 'Add Post'}
          visible={true}
          onOk={handleSave}
          onCancel={() => setEditingPost(null)}
        >
          <Input
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            placeholder="Title"
          />
          <Input.TextArea
            value={formData.body}
            onChange={e => setFormData({ ...formData, body: e.target.value })}
            placeholder="Body"
          />
        </Modal>
      )}
    </div>
  );
};

export default Posts;