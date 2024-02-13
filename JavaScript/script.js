let tasks = [];

function toggleInput() {
    document.getElementById('taskInput').style.display = 'inline-block';
    document.getElementById('addButton').disabled = false;
    document.getElementById('taskInput').focus();
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText) {
        tasks.push({ id: Date.now(), text: taskText });
        displayTasks();
        taskInput.value = '';
        toggleInput();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    displayTasks();
}

function editTask(id) {
    const updatedText = prompt('Edit task:', tasks.find(task => task.id === id)?.text);

    if (updatedText !== null) {
        tasks = tasks.map(task => (task.id === id ? { ...task, text: updatedText } : task));
        displayTasks();
    }
}

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.textContent = task.text;

        ['Edit', 'Delete'].forEach(action => {
            const button = document.createElement('button');
            button.textContent = action;
            button.onclick = function() {
                if (action === 'Edit') {
                    editTask(task.id);
                } else {
                    deleteTask(task.id);
                }
            };
            listItem.appendChild(button);
        });

        taskList.appendChild(listItem);
    });
}
