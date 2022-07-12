import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "./states/Posts";
import { usersSelector } from "./states/Users";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import ErrorComp from "./ErrorComp";

const initialValues = {
  title: "",
  body: "",
  userId: "",
};

const validattionSchema = yup.object({
  title: yup.string().required("Title is required"),
  body: yup.string().required("Body is required"),
  userId: yup.string().required("User is required"),
});

const AddPost = () => {
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    dispatch(addPost(values.title, values.body, values.userId));
  };

  const users = useSelector(usersSelector);

  return (
    <section className="add-new-post-area">
      <h2>Add a new post</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validattionSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div>
            <label htmlFor="postTitle">Post Title</label>
            <Field
              type="text"
              placeholder="Enter a title for your post ..."
              id="postTitle"
              name="title"
            />
            <ErrorMessage name="title" component={ErrorComp} />
          </div>
          <div>
            <label htmlFor="postBody">Post Content</label>
            <Field
              as="textarea"
              type="text"
              placeholder="Enter the content of your post ..."
              id="postBody"
              name="body"
            />
            <ErrorMessage name="body" component={ErrorComp} />
          </div>
          <div>
            <label htmlFor="postUserId">Post Author</label>
            <Field as="select" id="postAuthor" name="userId">
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="userId" component={ErrorComp} />
          </div>
          <button type="submit">Add Post</button>
        </Form>
      </Formik>
    </section>
  );
};

export default AddPost;
