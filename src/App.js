import { useState } from 'react';
import Posts from './Posts.js';
import AddPost from './AddPost.js';
import PostPage from './PostPage.js';
import EditPost from './EditPost.js';
import Users from './Users.js';
import UserPage from './UserPage.js';
import Layout from './Layout.js';
import ErrorPage from './ErrorPage.js';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './HomePage.js';

function App() {
  const [reqStatus, setReqStatus] = useState('idle');

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path='post'>
          <Route index element={<AddPost />} />
          <Route
            path=':postId'
            element={<PostPage setReqStatus={setReqStatus} />}
          />
          <Route
            path='edit/:postId'
            element={
              <EditPost reqStatus={reqStatus} setReqStatus={setReqStatus} />
            }
          />
        </Route>

        <Route path='user'>
          <Route index element={<Users />} />
          <Route path=':userId' element={<UserPage />} />
        </Route>
      </Route>

      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
