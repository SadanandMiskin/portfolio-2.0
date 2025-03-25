# Understanding Redux and Redux Toolkit

## What is Redux?
Redux is a state management library that provides a centralized state container for JS apps, but it requires significant boilerplate code for actions, reducers, and store configuration.

## State Management before Redux

### Traditional way:
Early React apps managed state directly within the components, with state handled at the component level.
When there was a need for the same state in other components, developers used "lifting state", placing the shared state in a common ancestor and passing it down as props.

### Prop Drilling:
This method led to "prop drilling," where state and functions had to be passed through multiple component layers to reach deeply nested children. This made the code hard to maintain and debug.

#### Example of Prop Drilling:
```
App Component
  │
  ├── Parent Component (Receives props)
  │      │
  │      ├── Child Component (Passes props)
  │      │      │
  │      │      ├── DeepChild Component (Finally uses the props)
  │      │      │      │
  │      │      │      └── "Hello from App!" (Rendered in UI)
```


```jsx
// App.js
import React from "react";
import Parent from "./Parent";

function App() {
  const message = "Hello from App!";
  return <Parent message={message} />;
}
export default App;

// Parent.js
import React from "react";
import Child from "./Child";

function Parent({ message }) {
  return <Child message={message} />;
}
export default Parent;

// Child.js
import React from "react";
import DeepChild from "./DeepChild";

function Child({ message }) {
  return <DeepChild message={message} />;
}
export default Child;

// DeepChild.js
import React from "react";
function DeepChild({ message }) {
  return <h1>{message}</h1>;
}
export default DeepChild;
```

### Problem:
Passing props through multiple components leads to complex and low-performing code.

## Introduction to Redux Toolkit
Redux Toolkit is an officially recommended library that simplifies Redux by reducing boilerplate code and providing better abstractions.

```
+---------------------+
|   React Component  |
|   (UI Interaction) |
+---------------------+
         │
         ▼
+----------------------+
|  useDispatch()      |  --- Dispatch Action (e.g., addTodo, removeTodo)
+----------------------+
         │
         ▼
+----------------------+
|  Redux Action       |  --- Defines how state should change
|  (addTodo, removeTodo) |
+----------------------+
         │
         ▼
+----------------------+
|  Reducer (todoSlice) |
|  - Updates State     |
|  - Handles Actions   |
+----------------------+
         │
         ▼
+----------------------+
|  Redux Store        |  --- Stores global state
+----------------------+
         │
         ▼
+----------------------+
|  useSelector()      |  --- Accesses Updated State
+----------------------+
         │
         ▼
+---------------------+
|   React Component  |  --- Re-renders UI with new state
+---------------------+

```


### Features of Redux Toolkit:
- Contains `Store` and `Reducers`, reducing boilerplate.
- Provides `configureStore` and `createSlice` for easy setup.
- `React-Redux` connects React components to the Redux store.
- Uses `useSelector` for state access and `useDispatch` for state updates.

## Building a TODO App with Redux Toolkit

```
+----------------------+
|  React Component    |  <--->  User Interaction (Add/Remove Todo)
+----------------------+
         │
         ▼
+----------------------+
|  useDispatch()      |  --- Dispatches Action (addTodo, removeTodo, updateTodo)
+----------------------+
         │
         ▼
+----------------------+
|  Redux Action       |  --- Defines the action type & payload
|  { type: "todo/addTodo", payload: "New Task" } |
+----------------------+
         │
         ▼
+----------------------+
|  Reducer (todoSlice) |
|  - Updates State     |
|  - Handles Actions   |
|  Example:            |
|  state.todos.push({id, text}) |
+----------------------+
         │
         ▼
+----------------------+
|  Redux Store        |  --- Stores global state { todos: [] }
+----------------------+
         │
         ▼
+----------------------+
|  useSelector()      |  --- Reads Updated State
+----------------------+
         │
         ▼
+----------------------+
|  React Component    |  --- UI re-renders with updated todos
|  <Todo /> Component |
+----------------------+

```

### Project Structure
```
-src
 |-main.jsx
 |-App.jsx
 |-app
   |- store.js
 |-features
   |-todo
     |-todoSlice.js
 |-components
   |-AddTodo.jsx
   |-Todo.jsx
```

### Step 1: Setup Vite and Install Dependencies
```sh
npm create vite@latest my-redux-app --template react
cd my-redux-app
npm install @reduxjs/toolkit react-redux
```

### Step 2: Configuring Redux Store

```js
// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todo/todoSlice';

export const store = configureStore({
    reducer: todoReducer
});
```

### Step 3: Creating the Todo Reducer

```js
// src/features/todo/todoSlice.js
import { createSlice, nanoid } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: 'todo',
    initialState: { todos: [] },
    reducers: {
         addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload
            };
            state.todos.push(todo);
         },
         removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
         },
         updateTodo: (state, action) => {
            const { id, text } = action.payload;
            const currentTodo = state.todos.find(todo => todo.id === id);
            if (currentTodo) {
                currentTodo.text = text;
            }
         }
    }
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
```

### Step 4: Adding Todos (useDispatch)

```js
// src/components/AddTodo.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todo/todoSlice';

export const AddTodo = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (input.trim()) {
            dispatch(addTodo(input));
            setInput('');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add a new todo"
            />
            <button type='submit'>Add</button>
        </form>
    );
};
```

### Step 5: Displaying Todos (useSelector)

```js
// src/components/Todo.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, updateTodo } from '../features/todo/todoSlice';

const Todo = () => {
    const [edit, setEdit] = useState('');
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();

    function handleUpdate(e, todoId) {
        e.preventDefault();
        if (edit.trim()) {
            dispatch(updateTodo({ id: todoId, text: edit }));
            setEdit('');
        }
    }

    return (
        <ul>
            {todos.map((todo) => (
                <li key={todo.id}>
                    {todo.text}
                    <button onClick={() => dispatch(removeTodo(todo.id))}>Delete</button>
                    <form onSubmit={(e) => handleUpdate(e, todo.id)}>
                        <input type="text" onChange={(e) => setEdit(e.target.value)} />
                        <button type='submit'>Update</button>
                    </form>
                </li>
            ))}
        </ul>
    );
};

export default Todo;
```

### Step 6: Wrapping the App with Provider

```js
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './app/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

### Run the Application
```sh
npm run dev
```

### Conclusion
Redux Toolkit simplifies state management in React by reducing boilerplate and providing an efficient setup. Try building a complex app with Redux Toolkit to see its full potential!
