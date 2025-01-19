import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, deletePost } from '../redux/blogStore';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';

function Blog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const posts = useSelector(state => state.blog.posts);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPost({ id: Date.now(), title, content }));
    setTitle('');
    setContent('');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Blog App</Typography>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <form onSubmit={handleSubmit}>
          <TextField 
            fullWidth 
            label="Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            margin="normal" 
            required 
          />
          <TextField 
            fullWidth 
            label="Content" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            margin="normal" 
            multiline 
            rows={4} 
            required 
          />
          <Button type="submit" variant="contained" color="primary">Add Post</Button>
        </form>
      </Paper>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <Button onClick={() => dispatch(deletePost(post.id))} variant="outlined" color="secondary">Delete</Button>
          </li>
        ))}
      </ul>
    </Container>
  );
}


export default Blog;