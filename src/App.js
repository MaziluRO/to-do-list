import { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
	//states
	const [inputText, setInputText] = useState('');
	const [todos, setTodos] = useState(
		JSON.parse(localStorage.getItem('todos')) || []
	);
	const [status, setStatus] = useState('all');
	const [filteredTodos, setFilteredTodos] = useState([]);

	//use effect
	useEffect(() => {
		getLocalTodos();
	}, []);

	useEffect(() => {
		saveLocalTodos();
		filterHandler();
	}, [todos, status]);

	//save local
	const saveLocalTodos = () => {
		localStorage.setItem('todos', JSON.stringify(todos));
	};
	const getLocalTodos = () => {
		console.log(localStorage.getItem('todos'));
		if (localStorage.getItem('todos') === null) {
			localStorage.setItem('todos', JSON.stringify([]));
		} else {
			let todoLocal = JSON.parse(localStorage.getItem('todos'));
			setTodos(todoLocal);
		}
	};

	const filterHandler = () => {
		switch (status) {
			case 'completed':
				setFilteredTodos(todos.filter((todo) => todo.completed === true));
				break;
			case 'uncompleted':
				setFilteredTodos(todos.filter((todo) => todo.completed === false));
				break;
			default:
				setFilteredTodos(todos);
				break;
		}
	};

	return (
		<div className='App'>
			<header>
				<h1>Mazi's To Do List</h1>
			</header>
			<Form
				todos={todos}
				setTodos={setTodos}
				setInputText={setInputText}
				inputText={inputText}
				setStatus={setStatus}
			></Form>
			<TodoList
				todos={todos}
				setTodos={setTodos}
				filteredTodos={filteredTodos}
			></TodoList>
		</div>
	);
}

export default App;
