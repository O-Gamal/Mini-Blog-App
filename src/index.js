import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Store from "./states/Store.js";
import { Provider } from "react-redux";
import { fetchUsers } from "./states/Users";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchPosts } from "./states/Posts";

Store.dispatch(fetchPosts());
Store.dispatch(fetchUsers());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store}>
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  </Provider>
);
