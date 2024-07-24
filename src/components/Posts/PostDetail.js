import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Spin, Button, Input } from 'antd';

const PostDetail = ({ fetchPosts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    body: ''
  });

  useEffect(() => {
    if (id) {
      axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(response => {
          setPost(response.data);
          setFormData({
            title: response.data.title,
            body: response.data.body
          });
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching post:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleSave = () => {
    if (id) {
      axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, formData)
        .then(response => {
          setPost(response.data);
          setEditing(false);
          fetchPosts(); // Cập nhật danh sách sau khi chỉnh sửa
          navigate('/posts');
        })
        .catch(error => {
          console.error('Error updating post:', error);
        });
    } else {
      axios.post(`https://jsonplaceholder.typicode.com/posts`, formData)
        .then(response => {
          fetchPosts(); // Cập nhật danh sách sau khi thêm mới
          navigate(`/posts/${response.data.id}`);
        })
        .catch(error => {
          console.error('Error creating post:', error);
        });
    }
  };

  const handleDelete = () => {
    if (id) {
      axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(() => {
          fetchPosts(); // Cập nhật danh sách sau khi xóa
          navigate('/posts');
        })
        .catch(error => {
          console.error('Error deleting post:', error);
        });
    }
  };

  if (loading) {
    return <Spin />;
  }

  if (id && !post) {
    return <div>Error: Post not found</div>;
  }

  return (
    <Card title={id ? post.title : 'New Post'}>
      {editing || !id ? (
        <>
          <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
          <Input.TextArea value={formData.body} onChange={e => setFormData({ ...formData, body: e.target.value })} />
          <Button type="primary" onClick={handleSave}>Save</Button>
        </>
      ) : (
        <>
          <p>{post.body}</p>
          <Button type="primary" onClick={() => setEditing(true)}>Edit</Button>
        </>
      )}
      {id && <Button type="danger" onClick={handleDelete}>Delete</Button>}
    </Card>
  );
};

export default PostDetail;