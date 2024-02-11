const tareas = [{ id: 1407488397510, tarea: 'Hacer mercado', estado: false },
{ id: 1507488397511, tarea: 'Estudiar para la prueba', estado: false },
{ id: 1607488397512, tarea: 'Sacar a pasear a Tobby', estado: false }]

let input = document.querySelector('input');
const button = document.querySelector('button');
const taskBody = document.querySelector('tbody');
let totalTasks = document.querySelector('#total');
let completedTasks = document.querySelector('#realizadas');

// Mostrar en DOM tabla con la cantidad de tareas existentes en el arreglo de objetos
let taskRow = ''
let taskList = () => {
    taskRow = ''
    tareas.forEach((task) => {
        let taskChecked = task.estado ? 'checked' : '';
        taskRow += `
        <tr>
        <td>${task.id}</td>
        <td>${task.tarea}</td>
        <td><input type="checkbox" ${taskChecked} onclick="updateCompletedTask(${task.id})" value="${task.estado}"></td>
        <td><button onclick="deleteTask(${task.id})"><i class="fa-solid fa-trash-can fa-lg"></i></button></td>
        </tr>
        `
    })
    taskBody.innerHTML = taskRow
    totalTasksInfo()
    totalCompletedTasksInfo()
}

// Agregar una nueva tarea
button.addEventListener('click', () => {
    addNewTask()
})

let addNewTask = () => {
    tareas.push({ id: Date.now(), tarea: input.value, estado: false })
    taskListUpdate()
    totalTasksInfo()
    input.value = ''
}

// Actualizar lista luego de agregar una nueva tarea
let taskListUpdate = () => {
    taskRow += `
    <tr>
    <td>${tareas[tareas.length - 1].id}</td>
    <td>${tareas[tareas.length - 1].tarea}</td>
    <td><input id="checkbox" type="checkbox" onclick="updateCompletedTask(${tareas[tareas.length - 1].id})" value="${tareas[tareas.length - 1].estado}"></td>
    <td><button onclick="deleteTask(${tareas[tareas.length - 1].id})"><i class="fa-solid fa-trash-can fa-lg"></i></button></td>
    </tr>
    `
    taskBody.innerHTML = taskRow
}

// Eliminar tarea
const deleteTask = (taskId) => {
    let taskIndex = tareas.findIndex(task => task.id === taskId)
    tareas.splice(taskIndex, 1)
    taskList()
}

// Cambiar el estado de una tarea entre True y False
let updateCompletedTask = (taskId) => {
    let taskIndex = tareas.findIndex(task => task.id === taskId)
    if (tareas[taskIndex].estado === false) {
        tareas[taskIndex].estado = true
        totalCompletedTasksInfo()
    } else if (tareas[taskIndex].estado === true) {
        tareas[taskIndex].estado = false
        totalCompletedTasksInfo()
    }
}

// Contar la cantidad de tareas completadas (estado: true)
let completedTaskCounter = () => {
    let counter = tareas.reduce((acc, task) => {
        if (task.estado === true) {
            acc++
        }
        return acc
    }, 0)
    return counter
}

// Mostrar en DOM cantidad de tareas existentes
let totalTasksResume = ''
let totalTasksInfo = () => {
    totalTasksResume = tareas.length
    totalTasks.innerHTML = totalTasksResume
}

// Mostrar en DOM cantidad de tareas completadas
let totalCompletedTasksResume = ''
let totalCompletedTasksInfo = () => {
    totalCompletedTasksResume = completedTaskCounter()
    completedTasks.innerText = totalCompletedTasksResume
}

taskList()
