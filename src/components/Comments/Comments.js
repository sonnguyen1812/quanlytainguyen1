import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Typography, Spin, Card, Button, Input, Modal } from 'antd';
import './Comments.css';

const { Title } = Typography;

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingComment, setEditingComment] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    body: ''
  });

  const fetchComments = () => {
    setLoading(true);
    axios.get('https://jsonplaceholder.typicode.com/comments')
      .then(response => {
        setComments(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleEdit = (comment) => {
    setEditingComment(comment);
    setFormData({
      name: comment.name,
      email: comment.email,
      body: comment.body
    });
  };

  const handleSave = () => {
    if (editingComment.id) {
      axios.put(`https://jsonplaceholder.typicode.com/comments/${editingComment.id}`, formData)
        .then(response => {
          setComments(comments.map(comment => comment.id === editingComment.id ? response.data : comment));
          setEditingComment(null);
        })
        .catch(error => {
          console.error('Error updating comment:', error);
        });
    } else {
      axios.post(`https://jsonplaceholder.typicode.com/comments`, formData)
        .then(response => {
          setComments([...comments, response.data]);
          setEditingComment(null);
        })
        .catch(error => {
          console.error('Error creating comment:', error);
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/comments/${id}`)
      .then(() => {
        setComments(comments.filter(comment => comment.id !== id));
      })
      .catch(error => {
        console.error('Error deleting comment:', error);
      });
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <div>
      <Title level={2}>Comments</Title>
      <Button type="primary" onClick={() => setEditingComment({ id: null, name: '', email: '', body: '' })}>Add Comment</Button>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={comments}
        renderItem={comment => (
          <List.Item>
            <Card hoverable className="comment-card">
              <Card.Meta title={comment.name} description={comment.body} />
              <Button type="primary" onClick={() => handleEdit(comment)}>Edit</Button>
              <Button type="danger" onClick={() => handleDelete(comment.id)}>Delete</Button>
            </Card>
          </List.Item>
        )}
      />
      {editingComment && (
        <Modal
          title={editingComment.id ? 'Edit Comment' : 'Add Comment'}
          visible={true}
          onOk={handleSave}
          onCancel={() => setEditingComment(null)}
        >
          <Input
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            placeholder="Name"
          />
          <Input
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email"
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

export default Comments;