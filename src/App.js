
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import Posts from "./components/Posts/Posts";

import Albums from "./components/Albums/Albums";

import Todos from "./components/Todos/Todos";

import Users from "./components/Users/Users";

const { Header, Content, Footer } = Layout;

const menuItems = [
    { key: "1", label: <Link to="/posts">Posts</Link> },
    { key: "3", label: <Link to="/albums">Albums</Link> },
    { key: "5", label: <Link to="/todos">Todos</Link> },
    { key: "6", label: <Link to="/users">Users</Link> },
];

const App = () => {
    return (
            <Router>
                <Layout className="layout">
                    <Header>
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={["1"]}
                            items={menuItems}
                        />
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
                        Resource Manager ©2024 Created by SonNH
                    </Footer>
                </Layout>
            </Router>
    );
};

export default App;
