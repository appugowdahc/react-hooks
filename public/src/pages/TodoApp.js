import React, { useReducer, useState } from 'react';
import { 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Chip 
} from '@mui/material';
import Todos from '../components/Todos';



const initialState = {
  todos: [],
  filter: 'all',
};

function todoReducer(state,action){
    switch(action.type){
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos,{id :state.todos.length+1,
                    text: action.payload.newTodo,
                    description:action.payload.todoDescription,
                    status:"todo",
                    completed: false}
                ],
            }
        case 'DELETE':
            return{
                ...state,
                todos:state.todos.filter((todo)=>todo.id !== action.payload.id)
            }
        case 'TOGGLE_TODO':
            return {
                ...state,
                todos:state.todos.map((todo)=>
                    todo.id===action.payload.id ? {...todo,status:"done",completed:true}:todo)
            }
        case "RESET":
            return initialState

        case 'SET_FILTER':
            return {
                ...state,
                todos:state.todos.filter(todo=>todo.status === action.payload.status),
                filter:action.payload.status
            }
        default:
            throw new Error(`This ${action.type} actions is not available.. `)
    }

}


// function todoReducer(state, action) {
//   switch (action.type) {
//     case 'ADD_TODO':
//       return {
//         ...state,
//         todos: [...state.todos, { id: Date.now(), text: action.payload.newTodo, description:action.payload.todoDescription, completed: false }],
//       };
//     case 'TOGGLE_TODO':
//       return {
//         ...state,
//         todos: state.todos.map(todo =>
//           todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
//         ),
//       };
//     case 'DELETE_TODO':
//       return {
//         ...state,
//         todos: state.todos.filter(todo => todo.id !== action.payload),
//       };
//     case 'SET_FILTER':
//       return {
//         ...state,
//         filter: action.payload,
//       };
//     default:
//       throw new Error(`Unknown action type: ${action.type}`);
//   }
// }

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [newTodo, setNewTodo] = useState('');
  const [todoDescription,setTodoDescription] = useState('')

  const filteredTodos =
    state.filter === 'all'
      ? state.todos
      : state.todos.filter(todo => state.filter === 'completed' ? todo.completed : !todo.completed);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch({ type: 'ADD_TODO', payload: {newTodo,todoDescription} });
      setNewTodo('');
      setTodoDescription('')
    }
  };

  return (
    <Box  sx={{ maxWidth: '50%', mx: 'auto', mt: 5, p: 3, border: '1px solid #ddd', borderRadius: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Advanced To-Do App
      </Typography>

      {/* Add Task */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Add a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          autoFocus={true}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Add short description"
          value={todoDescription}
          onChange={(e) => setTodoDescription(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddTodo}>
          Add
        </Button>
      </Box>

      {/* Filter Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
        <Chip 
          label="All" 
          color={state.filter === 'all' ? 'primary' : 'default'} 
          onClick={() => dispatch({ type: 'SET_FILTER', payload: {status:"all"} })} 
        />
        <Chip 
          label="Todo" 
          color={state.filter === 'todo' ? 'primary' : 'default'} 
          onClick={() => dispatch({ type: 'SET_FILTER', payload: {status:'todo'} })} 
        />
        <Chip 
          label="Completed" 
          color={state.filter === 'done' ? 'primary' : 'default'} 
          onClick={() => dispatch({ type: 'SET_FILTER', payload:  {status:"done"} })} 
        />
        <Chip 
          label="Pending" 
          color={state.filter === 'pending' ? 'primary' : 'default'} 
          onClick={() => dispatch({ type: 'SET_FILTER', payload:{status:'pending'} })} 
        />
         <Chip 
          label="Reset" 
          color='default'
          onClick={() => dispatch({ type: 'RESET'})} 
        />
      </Box>

      <Todos filteredTodos={filteredTodos} dispatch={dispatch}/>
      
    </Box>
  );
}

export default TodoApp;
