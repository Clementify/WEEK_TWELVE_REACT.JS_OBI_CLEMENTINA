/*
Task 1: Set up Redux in a React application
Install the redux and react-redux libraries in your project.
Create a Redux store using the configureStore function provided by the Redux toolkit
Wrap your application with the Provider component from react-redux and provide the Redux store to make it available to all components.
Setup a simple form component with input fields such as name, comment(text) and a button to submit comments
*/

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const CommentForm = () => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = () => {
    if (comment.trim() !== '') {
      dispatch({ type: 'ADD_COMMENT', payload: comment });
      setComment('');
    }
  };

  return (
    <div className="comment-form">
      <input
        type="text"
        placeholder="Your Name"
      />
      <textarea
        placeholder="Add a comment"
        value={comment}
        onChange={handleCommentChange}
      />
      <button onClick={handleSubmitComment}>Submit Comment</button>
    </div>
  );
};

export default CommentForm;
