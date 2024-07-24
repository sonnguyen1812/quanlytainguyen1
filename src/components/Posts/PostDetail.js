import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Spin, Button, Input } from 'antd';
import { ResourceContext } from '../../context/ResourceContext';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { resources, fetchResources, updateResource, deleteResource } = useContext(ResourceContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    body: ''
  });

  useEffect(() => {
    if (id) {
      const fetchedPost = resources.posts.find(post => post.id === parseInt(id));
      if (fetchedPost) {
        setPost(fetchedPost);
        setFormData({
          title: fetchedPost.title,
          body: fetchedPost.body
        });
        setLoading(false);
      } else {
        fetchResources('posts').then(() => {
          const newFetchedPost = resources.posts.find(post => post.id === parseInt(id));
          if (newFetchedPost) {
            setPost(newFetchedPost);
            setFormData({
              title: newFetchedPost.title,
              body: newFetchedPost.body
            });
          }
          setLoading(false);
        }).catch(error => {
          console.error('Error fetching post:', error);
          setLoading(false);
        });
      }
    } else {
      setLoading(false);
    }
  }, [id, resources.posts, fetchResources]);

  const handleSave = () => {
    if (id) {
      updateResource('posts', id, formData).then(() => {
        setEditing(false);
        navigate('/posts');
      }).catch(error => {
        console.error('Error updating post:', error);
      });
    } else {
      // Logic for creating a new post
    }
  };

  const handleDelete = () => {
    if (id) {
      deleteResource('posts', id).then(() => {
        navigate('/posts');
      }).catch(error => {
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