import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { selectPostById, updatePost } from './states/Posts';
import { useParams, useNavigate } from 'react-router-dom';
import { usersSelector } from './states/Users';
import ErrorComp from './ErrorComp';
import * as yup from 'yup';

const EditPost = ({ reqStatus, setReqStatus }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(usersSelector);

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const initialValues = {
    title: post?.title,
    body: post?.body,
    userId: Number(post?.userId),
  };

  const validattionSchema = yup.object({
    title: yup.string().required('Title is required'),
    body: yup.string().required('Body is required'),
    userId: yup.string().required('User is required'),
  });

  const onSubmit = (values) => {
    const canSave = reqStatus === 'idle';
    if (canSave) {
      try {
        setReqStatus('pending');
        dispatch(
          updatePost({
            ...values,
            userId: Number(values.userId),
            id: post.id,
            likesCount: post.likesCount,
          })
        );
        navigate(`/post/${postId}`);
      } catch (error) {
        console.error('Failed to update the post', error);
      } finally {
        setReqStatus('idle');
      }
    }
  };

  return (
    <section className='edit-post-area'>
      <h2>Add a new post</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validattionSchema}
        onSubmit={onSubmit}
        className='form'
      >
        <Form>
          <div>
            <label htmlFor='postTitle'>Post Title</label>
            <Field
              type='text'
              placeholder='Enter a title for your post ...'
              id='postTitle'
              name='title'
            />
            <ErrorMessage name='title' component={ErrorComp} />
          </div>
          <div>
            <label htmlFor='postBody'>Post Content</label>
            <Field
              as='textarea'
              type='text'
              placeholder='Enter the content of your post ...'
              id='postBody'
              name='body'
            />
            <ErrorMessage name='body' component={ErrorComp} />
          </div>
          <div>
            <label htmlFor='postUserId'>Post Author</label>
            <Field as='select' id='postAuthor' name='userId'>
              <option value=''>Select a user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name='userId' component={ErrorComp} />
          </div>
          <button className='form-btn' type='submit'>
            Update
          </button>
        </Form>
      </Formik>
    </section>
  );
};

export default EditPost;
