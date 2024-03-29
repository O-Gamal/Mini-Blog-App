import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost } from './states/Posts';
import { usersSelector } from './states/Users';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import ErrorComp from './ErrorComp';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  title: '',
  body: '',
  userId: '',
};

const validattionSchema = yup.object({
  title: yup.string().required('Title is required'),
  body: yup.string().required('Body is required'),
  userId: yup.string().required('User is required'),
});

const AddPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addReqStatus, setAddReqStatus] = useState('idle');

  const onSubmit = (values) => {
    const canSave = addReqStatus === 'idle';
    if (canSave) {
      try {
        setAddReqStatus('pending');
        dispatch(addNewPost(values));
        navigate('/');
      } catch (error) {
        console.error('Failed to save the post', error);
      } finally {
        setAddReqStatus('idle');
      }
    }
  };

  const users = useSelector(usersSelector);

  return (
    <section className='add-new-post-area'>
      <h2>Add a new post</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validattionSchema}
        onSubmit={onSubmit}
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
            Add Post
          </button>
        </Form>
      </Formik>
    </section>
  );
};

export default AddPost;
