// Feature adding Buttons
const addTaskButton = document.getElementById('add');

const completeAllTasksButton = document.querySelector('#comlpete-task');
const clearCompletedButton = document.querySelector('#clear-task');

const showAll = document.querySelector('#all');
const showCompleted = document.querySelector('#complete');
const showUncompleted = document.querySelector('#uncomplete');

// Containers
const taskInput = document.getElementById('task');
const todoListContainer = document.querySelector('#active-task');
const countContainer = document.querySelector('#task-count');

// Set a TODO item into localStorage
const setItems = (items) => {
	const itemsJSON = JSON.stringify(items);

	localStorage.setItem('todo-items', itemsJSON);
};

// Get TODO items from localStorage
const getItems = () => {
	const value = localStorage.getItem('todo-items') || '[]';

	return JSON.parse(value);
};

let tasks = getItems();

// Add Task to DOM
const addTasksToDOM = (tasks) => {
	taskInput.value = '';
	todoListContainer.innerHTML = '';

	if (!tasks.length > 0) {
		todoListContainer.innerHTML = '<li class="empty-message">Empty!</li>';
	}

	// Sort TODO items
	tasks.sort((a, b) => {
		if (a.isCompleted) {
			return 1;
		}

		if (b.isCompleted) {
			return -1;
		}

		return a.text < b.text ? -1 : 1;
	});

	for (let i = 0; i < tasks.length; i++) {
		const li = document.createElement('li');

		li.innerHTML = `
			<input type="checkbox" onchange="toggleTask('${tasks[i].id}')" 
			id="${tasks[i].id}" class=${tasks[i].isCompleted ? 'checked' : ''}>
      
			<label for="${tasks[i].id}">
			<span class="custom-checkbox"><span></span></span>
			<span class="text">${tasks[i].text}</span>
			</label>
      
			<span class="delete-task-button" onclick="deleteTask('${tasks[i].id}')">
				<i class="fa-regular fa-circle-xmark"></i>
			</span>
		`;

		todoListContainer.append(li);
	}
};

const refreshList = () => {
	setItems(tasks);

	let completedTasks = tasks.filter((task) => {
		return task.isCompleted;
	});

	let uncompletedTasks = tasks.filter((task) => {
		return !task.isCompleted;
	});

	countContainer.innerText = uncompletedTasks.length;

	// Insert every TODO items into todo-list
	showAll.addEventListener('click', () => {
		showAll.style.color = 'black';
		showCompleted.style.color = 'rgb(211, 208, 208)';
		showUncompleted.style.color = 'rgb(211, 208, 208)';

		addTasksToDOM(tasks);
	});

	showCompleted.addEventListener('click', () => {
		showAll.style.color = 'rgb(211, 208, 208)';
		showCompleted.style.color = 'black';
		showUncompleted.style.color = 'rgb(211, 208, 208)';

		addTasksToDOM(completedTasks);
	});

	showUncompleted.addEventListener('click', () => {
		showAll.style.color = 'rgb(211, 208, 208)';
		showCompleted.style.color = 'rgb(211, 208, 208)';
		showUncompleted.style.color = 'black';

		addTasksToDOM(uncompletedTasks);
	});

	addTasksToDOM(tasks);
};

refreshList();

// Utilities

// Add TODO item
const addTask = (task) => {
	tasks.unshift(task);

	refreshList();
};

// Toggle TODO state
const toggleTask = (taskId) => {
	const task = tasks.filter((task) => {
		return task.id === taskId;
	});

	const currentTask = task[0];
	currentTask.isCompleted = !currentTask.isCompleted;

	refreshList();
	return;
};

// Delete TODO item
const deleteTask = (taskId) => {
	const newTasks = tasks.filter((task) => {
		return task.id !== taskId;
	});

	tasks = newTasks;

	refreshList();
	return;
};

// Complete All Tasks
completeAllTasksButton.addEventListener('click', () => {
	tasks.forEach((task) => {
		task.isCompleted = true;
	});

	refreshList();
	return;
});

// Clear Completed Tasks
clearCompletedButton.addEventListener('click', () => {
	const newTasks = tasks.filter((task) => {
		return !task.isCompleted;
	});
	tasks = newTasks;

	refreshList();
	return;
});

// Create Object Template
const createObject = (text) => {
	const task = {
		id: Date.now().toString(),
		isCompleted: false,
		text,
	};

	return task;
};

// Adding task with Click Event
addTaskButton.addEventListener('click', () => {
	let value = taskInput.value;

	if(value==""){
		window.alert('Input Box is Empty!!');
		return;
	}

	if (value) {
		const task = createObject(value);
		addTask(task);
	}
	return;
});

// Keyboard Events
const handleInput = (e) => {
	// Adding task with Keyboard Event
	let value = e.target.value;

	if (e.key === 'Enter') {
		if (value==""){
			window.alert('Input Box is Empty!!');
			return;
		}
		if (value) {
			const task = createObject(value);
			addTask(task);
		}
		return;
	}
};

taskInput.addEventListener('keyup', handleInput);
