import React, { useContext, useState } from 'react';
import { Modal, Form, Input, Button, List, Card } from 'antd';
import { ResourceContext } from '../../context/ResourceContext';

const Albums = () => {
    const { data, createItem, updateItem, deleteItem } = useContext(ResourceContext);
    const { albums, photos } = data;

    const [newAlbum, setNewAlbum] = useState({ title: "" });
    const [editAlbum, setEditAlbum] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [photoModalVisible, setPhotoModalVisible] = useState(false);
    const [selectedAlbum, setSelectedAlbum] = useState(null);

    const handleCreate = () => {
        createItem("albums", newAlbum);
        setNewAlbum({ title: "" });
    };

    const handleUpdate = () => {
        updateItem("albums", editAlbum);
        setEditAlbum(null);
        setIsModalVisible(false);
    };

    const handleDelete = (id) => {
        deleteItem("albums", id);
    };

    const showModal = (album) => {
        setEditAlbum(album);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditAlbum(null);
    };

    const showPhotosModal = (album) => {
        setSelectedAlbum(album);
        setPhotoModalVisible(true);
    };

    const handlePhotoModalCancel = () => {
        setPhotoModalVisible(false);
        setSelectedAlbum(null);
    };

    if (!albums || !photos) {
        return <div>Loading...</div>;
    }

    const albumPhotos = (albumId) => {
        return photos.filter((photo) => photo.albumId === albumId);
    };

    return (
        <div className="albums">
            <h2>Albums</h2>
            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={albums}
                renderItem={album => (
                    <List.Item>
                        <Card
                            title={album.title}
                            actions={[
                                <Button type="primary" onClick={() => showModal(album)}>Edit</Button>,
                                <Button type="danger" onClick={() => handleDelete(album.id)}>Delete</Button>,
                                <Button onClick={() => showPhotosModal(album)}>View Photos</Button>
                            ]}
                        >
                            <List
                                className="photo-list"
                                header={`${albumPhotos(album.id).length} photos`}
                                itemLayout="horizontal"
                                dataSource={albumPhotos(album.id)}
                                renderItem={photo => (
                                    <li>
                                        <Card.Meta
                                            title={photo.title}
                                            description={photo.url}
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
                    value={newAlbum.title}
                    onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
                    placeholder="New album title"
                />
                <Button type="primary" onClick={handleCreate}>Add Album</Button>
            </div>
            <Modal
                title="Edit Album"
                visible={isModalVisible}
                onOk={handleUpdate}
                onCancel={handleCancel}
            >
                <Form layout="vertical">
                    <Form.Item label="Album Title">
                        <Input
                            value={editAlbum?.title}
                            onChange={(e) => setEditAlbum({ ...editAlbum, title: e.target.value })}
                            placeholder="Edit album title"
                        />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Photos"
                visible={photoModalVisible}
                onCancel={handlePhotoModalCancel}
                footer={null}
            >
                <List
                    className="photo-list"
                    itemLayout="horizontal"
                    dataSource={selectedAlbum ? albumPhotos(selectedAlbum.id) : []}
                    renderItem={photo => (
                        <List.Item>
                            <Card.Meta
                                title={photo.title}
                                description={photo.url}
                            />
                        </List.Item>
                    )}
                />
            </Modal>
        </div>
    );
};

export default Albums;
