// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { ResourceProvider } from './context/ResourceContext';
import Posts from './components/Posts/Posts';
import PostDetail from './components/Posts/PostDetail';

import Albums from './components/Albums/Albums';
import AlbumDetail from './components/Albums/AlbumDetail';

import Todos from './components/Todos/Todos';
import TodoDetail from './components/Todos/TodoDetail';
import Users from './components/Users/Users';
import UserDetail from './components/Users/UserDetail';

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <ResourceProvider>
      <Router>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1"><Link to="/posts">Posts</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/albums">Albums</Link></Menu.Item>
              <Menu.Item key="5"><Link to="/todos">Todos</Link></Menu.Item>
              <Menu.Item key="6"><Link to="/users">Users</Link></Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content">
              <Routes>
                <Route path="/posts" element={<Posts />} />
                <Route path="/posts/:id" element={<PostDetail />} />
                <Route path="/albums" element={<Albums />} />
                <Route path="/albums/:id" element={<AlbumDetail />} />
                <Route path="/todos" element={<Todos />} />
                <Route path="/todos/:id" element={<TodoDetail />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<UserDetail />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Resource Manager ©2023 Created by You</Footer>
        </Layout>
      </Router>
    </ResourceProvider>
  );
};

export default App;