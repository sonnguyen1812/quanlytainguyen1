import React, { useContext, useState } from 'react';
import { ResourceContext } from '../../context/ResourceContext';
import { List, Button, Input, Modal, Form } from 'antd';
import './Users.css';

const Users = () => {
    const { data, createItem, updateItem, deleteItem } = useContext(ResourceContext);
    const { users } = data;

    const [newUser, setNewUser] = useState({ name: '' });
    const [editUser, setEditUser] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCreate = () => {
        createItem('users', newUser);
        setNewUser({ name: '' });
    };

    const handleUpdate = () => {
        updateItem('users', editUser);
        setEditUser(null);
        setIsModalVisible(false);
    };

    const handleDelete = (id) => {
        deleteItem('users', id);
    };

    const showModal = (user) => {
        setEditUser(user);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditUser(null);
    };

    return (
        <div className="users">
            <h2>Users</h2>
            <List
                bordered
                dataSource={users}
                renderItem={user => (
                    <List.Item
                        actions={[
                            <Button type="primary" onClick={() => showModal(user)}>Edit</Button>,
                            <Button type="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
                        ]}
                    >
                        {user.name}
                    </List.Item>
                )}
            />
            <div style={{ marginTop: 20 }}>
                <Input
                    style={{ width: 200, marginRight: 10 }}
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="New user name"
                />
                <Button type="primary" onClick={handleCreate}>Add User</Button>
            </div>
            <Modal
                title="Edit User"
                visible={isModalVisible}
                onOk={handleUpdate}
                onCancel={handleCancel}
            >
                <Form layout="vertical">
                    <Form.Item label="User Name">
                        <Input
                            value={editUser?.name}
                            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                            placeholder="Edit user name"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Users;
