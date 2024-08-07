import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ResourceProvider } from "./context/ResourceContext";
import { fetchData } from "./hooks/useFetch";

// Async IIFE to fetch data and set initial context
(async () => {
    try {
        const users = await fetchData('https://jsonplaceholder.typicode.com/users');
        const posts = await fetchData('https://jsonplaceholder.typicode.com/posts');
        const comments = await fetchData('https://jsonplaceholder.typicode.com/comments');
        const albums = await fetchData('https://jsonplaceholder.typicode.com/albums');
        const photos = await fetchData('https://jsonplaceholder.typicode.com/photos');
        const todos = await fetchData('https://jsonplaceholder.typicode.com/todos');

        // Initialize React app with fetched data
        ReactDOM.createRoot(document.getElementById('root')).render(
            <React.StrictMode>
                <ResourceProvider initialData={{ users, posts, comments, albums, photos, todos }}>
                    <App />
                </ResourceProvider>
            </React.StrictMode>
        );

    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();

reportWebVitals();
