// src/components/Comments/CommentDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Spin, Button, Input } from 'antd';

const CommentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    body: '',
    email: ''
  });

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/comments/${id}`)
      .then(response => {
        setComment(response.data);
        setFormData({
          name: response.data.name,
          body: response.data.body,
          email: response.data.email
        });
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching comment:', error);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = () => {
    axios.put(`https://jsonplaceholder.typicode.com/comments/${id}`, formData)
      .then(response => {
        setComment(response.data);
        setEditing(false);
      })
      .catch(error => {
        console.error('Error updating comment:', error);
      });
  };

  const handleDelete = () => {
    axios.delete(`https://jsonplaceholder.typicode.com/comments/${id}`)
      .then(() => {
        navigate('/comments');
      })
      .catch(error => {
        console.error('Error deleting comment:', error);
      });
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <Card title={comment.name}>
      {editing ? (
        <>
          <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
          <Input.TextArea value={formData.body} onChange={e => setFormData({ ...formData, body: e.target.value })} />
          <Input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
          <Button type="primary" onClick={handleUpdate}>Save</Button>
        </>
      ) : (
        <>
          <p>{comment.body}</p>
          <p>Email: {comment.email}</p>
          <Button type="primary" onClick={() => setEditing(true)}>Edit</Button>
        </>
      )}
      <Button type="danger" onClick={handleDelete}>Delete</Button>
    </Card>
  );
};

export default CommentDetail;