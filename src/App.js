import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation, Navigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import Posts from "./components/Posts/Posts";
import Albums from "./components/Albums/Albums";
import Todos from "./components/Todos/Todos";
import Users from "./components/Users/Users";

const { Header, Content, Footer } = Layout;

const menuItems = [
    { key: "/posts", label: <Link to="/posts">Posts</Link> },
    { key: "/albums", label: <Link to="/albums">Albums</Link> },
    { key: "/todos", label: <Link to="/todos">Todos</Link> },
    { key: "/users", label: <Link to="/users">Users</Link> },
];

const App = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    // Determine if the current path should be highlighted
    const selectedKeys = currentPath === "/" || currentPath.startsWith("/posts") ? ["/posts"] : [currentPath];

    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={selectedKeys}
                    items={menuItems}
                />
            </Header>
            <Content style={{ padding: "0 50px" }}>
                <div className="site-layout-content">
                    <Routes>
                        <Route path="/" element={<Navigate to="/posts" />} />
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
    );
};

const AppWithRouter = () => (
    <Router>
        <App />
    </Router>
);

export default AppWithRouter;
