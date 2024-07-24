import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Spin, Button, Input } from 'antd';
import { ResourceContext } from '../../context/ResourceContext';

const CommentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { resources, fetchResources, updateResource, deleteResource } = useContext(ResourceContext);
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    body: ''
  });

  useEffect(() => {
    if (id) {
      const fetchedComment = resources.comments.find(comment => comment.id === parseInt(id));
      if (fetchedComment) {
        setComment(fetchedComment);
        setFormData({
          name: fetchedComment.name,
          body: fetchedComment.body
        });
        setLoading(false);
      } else {
        fetchResources('comments').then(() => {
          const newFetchedComment = resources.comments.find(comment => comment.id === parseInt(id));
          if (newFetchedComment) {
            setComment(newFetchedComment);
            setFormData({
              name: newFetchedComment.name,
              body: newFetchedComment.body
            });
          }
          setLoading(false);
        }).catch(error => {
          console.error('Error fetching comment:', error);
          setLoading(false);
        });
      }
    } else {
      setLoading(false);
    }
  }, [id, resources.comments, fetchResources]);

  const handleUpdate = () => {
    updateResource('comments', id, formData).then(() => {
      setEditing(false);
    }).catch(error => {
      console.error('Error updating comment:', error);
    });
  };

  const handleDelete = () => {
    deleteResource('comments', id).then(() => {
      navigate('/comments');
    }).catch(error => {
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
          <Button type="primary" onClick={handleUpdate}>Save</Button>
        </>
      ) : (
        <>
          <p>{comment.body}</p>
          <Button type="primary" onClick={() => setEditing(true)}>Edit</Button>
        </>
      )}
      <Button type="danger" onClick={handleDelete}>Delete</Button>
    </Card>
  );
};

export default CommentDetail;