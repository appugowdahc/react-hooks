import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const Todos = ({ filteredTodos, dispatch }) => {
  return (
    <List>
      {/* Header Row */}
      <ListItem
        sx={{
          bgcolor: 'inherit',
          borderRadius: 1,
          mb: 1,
          fontWeight: 'bold',
        }}
      ><ListItemText primary="Number" />
        <ListItemText primary="Task Name" />
        <ListItemText primary="Description" />
        <ListItemText primary="Status" />
        <ListItemText primary="Actions" />
      </ListItem>

      {/* Todo Items */}
      {filteredTodos.map((todo) => (
        <ListItem
          key={todo.id}
          sx={{
            bgcolor: todo.completed ? '#e0ffe0' : '#f0f0f0',
            borderRadius: 1,
            mb: 1,
          }}
        >
           <ListItemText primary={todo.id} />
          <ListItemText primary={todo.text} />
          <ListItemText primary={todo.description} />
          <ListItemText primary={todo.completed ? "Completed" : "Pending"} />
          <ListItemSecondaryAction>
            {/* Toggle Status Button */}
            <IconButton
              edge="end"
              aria-label="toggle"
              onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
            >
              {todo.completed ? <CancelIcon color="error" /> : <CheckCircleIcon color="success" />}
            </IconButton>

            {/* Delete Button */}
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => dispatch({ type: 'DELETE_TODO', payload:{ id:todo.id} })}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default Todos;
