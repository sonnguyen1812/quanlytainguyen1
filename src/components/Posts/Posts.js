import React, { useContext, useState } from 'react';
import { ResourceContext } from '../../context/ResourceContext';
import { List, Button, Input, Modal, Form, Card} from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import './Posts.css';

const Posts = () => {
  const { data, createItem, updateItem, deleteItem } = useContext(ResourceContext);
  const { posts, comments } = data;

  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [editPost, setEditPost] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCreate = () => {
    createItem('posts', newPost);
    setNewPost({ title: '', body: '' });
  };

  const handleUpdate = () => {
    updateItem('posts', editPost);
    setEditPost(null);
    setIsModalVisible(false);
  };

  const handleDelete = (id) => {
    deleteItem('posts', id);
  };

  const showModal = (post) => {
    setEditPost(post);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditPost(null);
  };

  const postComments = (postId) => {
    return comments.filter(comment => comment.postId === postId);
  };

  return (
    <div className="posts">
      <h2>Posts</h2>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={posts}
        renderItem={post => (
          <List.Item>
            <Card
              title={post.title}
              actions={[
                <Button type="primary" onClick={() => showModal(post)}>Edit</Button>,
                <Button type="danger" onClick={() => handleDelete(post.id)}>Delete</Button>
              ]}
            >
              <p>{post.body}</p>
              <List
                className="comment-list"
                header={`${postComments(post.id).length} replies`}
                itemLayout="horizontal"
                dataSource={postComments(post.id)}
                renderItem={comment => (
                  <li>
                    <Card.Meta
                      avatar={<MessageOutlined />}
                      title={comment.name}
                      description={comment.body}
                    />
                    
                  </li>
                )}
              />
            </Card>
          </List.Item>
        )}
      />
      <div style={{ marginTop: 20 }}>
        <Input
          style={{ width: 200, marginRight: 10 }}
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          placeholder="New post title"
        />
        <Input
          style={{ width: 200, marginRight: 10 }}
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          placeholder="New post body"
        />
        <Button type="primary" onClick={handleCreate}>Add Post</Button>
      </div>
      <Modal
        title="Edit Post"
        visible={isModalVisible}
        onOk={handleUpdate}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Post Title">
            <Input
              value={editPost?.title}
              onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
              placeholder="Edit post title"
            />
          </Form.Item>
          <Form.Item label="Post Body">
            <Input
              value={editPost?.body}
              onChange={(e) => setEditPost({ ...editPost, body: e.target.value })}
              placeholder="Edit post body"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Posts;
