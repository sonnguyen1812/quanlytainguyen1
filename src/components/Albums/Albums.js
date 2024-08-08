import React, { useContext, useState, useCallback, useRef, memo } from 'react';
import { Modal, Form, Input, Button, List, Card, Pagination } from 'antd';
import { ResourceContext } from '../../context/ResourceContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Albums = () => {
    const { data, createItem, updateItem, deleteItem } = useContext(ResourceContext);
    const { albums, photos } = data;

    const [newAlbum, setNewAlbum] = useState({ title: "" });
    const [editAlbum, setEditAlbum] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState({});
    const pageSize = 10;

    // Ref to store the scroll position
    const listRef = useRef(null);

    const handleCreate = async () => {
        await createItem("albums", newAlbum);
        setNewAlbum({ title: "" });
    };

    const handleUpdate = async () => {
        await updateItem("albums", editAlbum);
        setEditAlbum(null);
        setIsModalVisible(false);
    };

    const handleDelete = useCallback(async (id) => {
        if (listRef.current) {
            // Save scroll position
            const scrollPosition = listRef.current.scrollTop;
            await deleteItem("albums", id);
            // Restore scroll position
            listRef.current.scrollTop = scrollPosition;
        }
    }, [deleteItem]);

    const showModal = useCallback((album) => {
        setEditAlbum(album);
        setIsModalVisible(true);
    }, []);

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditAlbum(null);
    };

    const albumPhotos = useCallback((albumId) => {
        return photos.filter((photo) => photo.albumId === albumId);
    }, [photos]);

    const handlePageChange = (albumId, page) => {
        setCurrentPage(prevState => ({
            ...prevState,
            [albumId]: page
        }));
    };

    const renderAlbum = useCallback((album) => {
        const currentAlbumPage = currentPage[album.id] || 1;

        const photosForCurrentPage = () => {
            const photosForAlbum = albumPhotos(album.id);
            const startIndex = (currentAlbumPage - 1) * pageSize;
            return photosForAlbum.slice(startIndex, startIndex + pageSize);
        };

        return (
            <List.Item key={album.id}>
                <Card
                    title={album.title}
                    actions={[
                        <Button type="primary" onClick={() => showModal(album)}>Edit</Button>,
                        <Button type="danger" onClick={() => handleDelete(album.id)}>Delete</Button>
                    ]}
                >
                    <List
                        className="photo-list"
                        itemLayout="horizontal"
                        grid={{ gutter: 16, column: 4 }}
                        dataSource={photosForCurrentPage()}
                        renderItem={photo => (
                            <List.Item key={photo.id}>
                                <Card
                                    cover={
                                        <LazyLoadImage
                                            src={photo.thumbnailUrl}
                                            alt={photo.title}
                                            effect="blur"
                                            style={{ cursor: 'pointer', width: '100%' }}
                                        />
                                    }
                                >
                                    <Card.Meta title={photo.title} />
                                </Card>
                            </List.Item>
                        )}
                    />
                    <Pagination
                        current={currentAlbumPage}
                        total={albumPhotos(album.id).length}
                        pageSize={pageSize}
                        onChange={(page) => handlePageChange(album.id, page)}
                        style={{ marginTop: 16 }}
                    />
                </Card>
            </List.Item>
        );
    }, [albumPhotos, currentPage, handleDelete, showModal]);

    if (!albums || !photos) {
        return <div>Loading...</div>;
    }

    return (
        <div className="albums" ref={listRef}>
            <h2>Albums</h2>
            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={albums}
                renderItem={renderAlbum}
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
        </div>
    );
};

export default memo(Albums);
