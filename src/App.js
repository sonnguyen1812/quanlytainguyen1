// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { ResourceProvider } from "./context/ResourceContext";
import Posts from "./components/Posts/Posts";

import Albums from "./components/Albums/Albums";

import Todos from "./components/Todos/Todos";

import Users from "./components/Users/Users";

const { Header, Content, Footer } = Layout;

const App = () => {
    return (
        <ResourceProvider>
            <Router>
                <Layout className="layout">
                    <Header>
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={["1"]}
                        >
                            <Menu.Item key="1">
                                <Link to="/posts">Posts</Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/albums">Albums</Link>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Link to="/todos">Todos</Link>
                            </Menu.Item>
                            <Menu.Item key="6">
                                <Link to="/users">Users</Link>
                            </Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{ padding: "0 50px" }}>
                        <div className="site-layout-content">
                            <Routes>
                                <Route path="/posts" element={<Posts />} />

                                <Route path="/albums" element={<Albums />} />

                                <Route path="/todos" element={<Todos />} />

                                <Route path="/users" element={<Users />} />
                            </Routes>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: "center" }}>
                        Resource Manager ©2023 Created by You
                    </Footer>
                </Layout>
            </Router>
        </ResourceProvider>
    );
};

export default App;
