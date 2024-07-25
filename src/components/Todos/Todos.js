import React, { useContext, useState } from 'react';
import { ResourceContext } from '../../context/ResourceContext';
import { List, Button, Input, Modal, Form, Checkbox } from 'antd';
import './Todos.css';

const Todos = () => {
  const { data, createItem, updateItem, deleteItem } = useContext(ResourceContext);
  const { todos } = data;

  const [newTodo, setNewTodo] = useState({ title: '', completed: false });
  const [editTodo, setEditTodo] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCreate = () => {
    createItem('todos', newTodo);
    setNewTodo({ title: '', completed: false });
  };

  const handleUpdate = () => {
    updateItem('todos', editTodo);
    setEditTodo(null);
    setIsModalVisible(false);
  };

  const handleDelete = (id) => {
    deleteItem('todos', id);
  };

  const showModal = (todo) => {
    setEditTodo(todo);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditTodo(null);
  };

  return (
    <div className="todos">
      <h2>Todos</h2>
      <List
        bordered
        dataSource={todos}
        renderItem={todo => (
          <List.Item
            actions={[
              <Button type="primary" onClick={() => showModal(todo)}>Edit</Button>,
              <Button type="danger" onClick={() => handleDelete(todo.id)}>Delete</Button>
            ]}
          >
            <Checkbox checked={todo.completed}>{todo.title}</Checkbox>
          </List.Item>
        )}
      />
      <div style={{ marginTop: 20 }}>
        <Input
          style={{ width: 200, marginRight: 10 }}
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          placeholder="New todo title"
        />
        <Checkbox
          checked={newTodo.completed}
          onChange={(e) => setNewTodo({ ...newTodo, completed: e.target.checked })}
        >
          Completed
        </Checkbox>
        <Button type="primary" onClick={handleCreate}>Add Todo</Button>
      </div>
      <Modal
        title="Edit Todo"
        visible={isModalVisible}
        onOk={handleUpdate}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Todo Title">
            <Input
              value={editTodo?.title}
              onChange={(e) => setEditTodo({ ...editTodo, title: e.target.value })}
              placeholder="Edit todo title"
            />
          </Form.Item>
          <Form.Item>
            <Checkbox
              checked={editTodo?.completed}
              onChange={(e) => setEditTodo({ ...editTodo, completed: e.target.checked })}
            >
              Completed
            </Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Todos;
