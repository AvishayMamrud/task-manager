import { useState } from 'react';
import './Components/components.css';
import AllTasksPage from './Components/Pages/AllTasksPage';
import MainPage from './Components/Pages/MainPage';
import NewTaskView from './Components/Pages/NewTaskView';
import TaskCarouselPage from './Components/Pages/TaskCarouselPage';
import SideMenu from './Components/SideMenu';
import HistoryPage from './Components/Pages/HistoryPage';
import EditTaskPage from './Components/Pages/EditTaskPage';

class Task{
  // idCounter() {
  //   let counter = 0;
  //   return function (){
  //     return counter++;
  //   }
  // }
  constructor(name, desc, priority, deadline, tags = []){
    // this.id = this.idCounter;
    this.name = name;
    this.desc = desc;
    this.priority = priority;
    this.currentAge = priority;
    this.deadline = deadline;
    // this.tags = tags
  }
}

// const tags = new Map();

const sortFuncs = {
  priority: (a, b) => {return a?.priority - b?.priority},
  name: (a, b) => a?.name.localeCompare(b?.name),
  deadline: (a, b) => a.deadline - b.deadline,
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function App() {
  
  const [currPage, setCurrPage] = useState('Main')
  const [tasks, setTasks] = useState([]);
  const [finishedTasks, setFinishedTasks] = useState([])
  const [deletedTasks, setDeletedTasks] = useState([])
  const [currSortFuncName, setCurrSortFuncName] = useState('priority')
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0)
  const [headerMessage, setHeaderMessage] = useState(['', false])

  function headerMessageHandler(msg, isError){
    setHeaderMessage([msg, isError])
  }

  const pageSelectHandler = (pageName) => {
    headerMessageHandler('', false)
    setCurrPage(pageName)
  }
  
  function addTaskHandler(name, desc, priority, deadline){
    //console.log('addTaskHandler')
    if(tasks.filter(t => t.name === name).length > 0){
      headerMessageHandler(`The name '${name}' already exists. choose a different one.`, true)
    }else{
      tasks.push(new Task(name, desc, priority, deadline))
      //console.log(currSortFuncName)
      //console.log(typeof currSortFuncName)
      // (priority, 5))
      setTasks(() => tasks.sort(sortFuncs[[currSortFuncName]]))
      headerMessageHandler('addTaskHandler', false)
    }
  }

  function removeTasksHandler(tasksToRemove){
    headerMessageHandler('removeTaskHandler', false)
    tasksToRemove.map(t => t.finishTime = Date.now())
    setDeletedTasks([...tasksToRemove, ...deletedTasks])
    setTasks(() => tasks.filter(t => !tasksToRemove.includes(t)))
    setSelectedTaskIndex(() => tasks.length > 1 ? mod(selectedTaskIndex, tasks.length - 1) : 0)
  }

  function taskSelectHandler(task){
    let index = tasks.findIndex(t => t.name === task.name)
    index = index >= 0 ? index : 0
    //console.log(`index - ${index}`)
    setSelectedTaskIndex(index)
    setCurrPage('Next Task')
  }

  function changeSortHandler(sortFuncName){
    //console.log('changeSortHandler')
    headerMessageHandler('changeSortHandler', false)
    setCurrSortFuncName(sortFuncName)
    setTasks(tasks.sort(sortFuncs[[sortFuncName]]))
  }

  function changeSelectedTaskIndex(increment){
    //console.log('changeSelectedTaskIndex')
    if(currPage !== 'Next Task'){
      setCurrPage('Next Task')
    }
    setSelectedTaskIndex(() => tasks.length > 0 ? mod(selectedTaskIndex + increment, tasks.length) : 0)
  }

  function finishTasksHandler(tasksToFinish){
    headerMessageHandler('finishTaskHandler', false)
    tasksToFinish.map(t => t.finishTime = Date.now())
    setFinishedTasks([...tasksToFinish, ...finishedTasks])
    setTasks(() => tasks.filter(t => !tasksToFinish.includes(t)))
    setSelectedTaskIndex(() => tasks.length > 1 ? mod(selectedTaskIndex, tasks.length - 1) : 0)
  }

  function permanentDeleteHandler(tasks_to_delete){
    console.log(`tasks_to_delete - ${JSON.stringify(tasks_to_delete)}`)
    setFinishedTasks(() => finishedTasks.filter(t => tasks_to_delete[0].every(x => x.name !== t.name)))
    setDeletedTasks(() => deletedTasks.filter(t => tasks_to_delete[1].every(x => x.name !== t.name)))
  }
  
  function restoreTasksHandler(tasks_to_restore){
    // tasks_to_restore[0].forEach(t => delete t.finishTime)
    // tasks_to_restore[1].forEach(t => delete t.finishTime)
    permanentDeleteHandler(tasks_to_restore)
    setTasks(() => [...tasks, ...tasks_to_restore.flat()])
  }

  function editTaskHandler(task){
    setCurrPage('Edit Task')
  }

  function editSaveHandler(task, name, desc, priority, deadline){
    //console.log(`tasks[selectedTaskIndex] - ${tasks[selectedTaskIndex]} ,  `)
    if(tasks[selectedTaskIndex].name !== task.name){
      headerMessageHandler(`The has been a complecation...`, true)
    }else{
      tasks[selectedTaskIndex] = new Task(name, desc, priority, deadline)
      //console.log(currSortFuncName)
      //console.log(typeof currSortFuncName)
      setTasks(() => tasks)
      headerMessageHandler('editSaveHandler', false)
    }
  }


  const pageNames = ['Add Task', 'Edit Task', 'All Tasks', 'Next Task', 'History']
  // return <div className='app'>
  //   <MainPage/>
  // </div>
  //console.log(Object.keys(sortFuncs))
  return (
    <div className='app'>
      <SideMenu 
        buttons={pageNames.filter(v => v !== 'Edit Task')} 
        onPageSelect={pageSelectHandler} 
        sortFuncs={Object.keys(sortFuncs)} 
        onChangeSorting={changeSortHandler}
        currPage={currPage}
      />
      <div className='main-page'>
        {headerMessage[0] && <p className={`flex-item message ${headerMessage[1] ? 'error' : 'info'}`}>{headerMessage[0]}</p>}
        {currPage === 'Main' && <MainPage/>}
        {currPage === 'Add Task' && <NewTaskView onSaveTask={addTaskHandler} onError={headerMessageHandler}/>}
        {currPage === 'Edit Task' && <EditTaskPage task={tasks[selectedTaskIndex]} onSaveTask={editSaveHandler} onError={headerMessageHandler}/>}
        {currPage === 'All Tasks' && <AllTasksPage tasks={tasks} onRemoveTasks={removeTasksHandler} onTaskSelect={taskSelectHandler} onEditTask='' onFinishTasks={finishTasksHandler}/>}
        {currPage === 'Next Task' && <TaskCarouselPage 
                                        task={tasks.length > 0 ? tasks[selectedTaskIndex] : null} 
                                        onIncDecIndex={changeSelectedTaskIndex}
                                        onEditTask={editTaskHandler}
                                        onRemoveTasks={removeTasksHandler} 
                                        onFinishTasks={finishTasksHandler}
                                        index={selectedTaskIndex + 1}
                                        length={tasks.length}
                                      />}
        {currPage === 'History' && <HistoryPage 
                                        finishedTasks={finishedTasks} 
                                        deletedTasks={deletedTasks} 
                                        onRestoreTasks={restoreTasksHandler}
                                        onPermanentDelete={permanentDeleteHandler} 
                                        onTaskSelect={t => console.log(JSON.stringify(t))}/>}
      </div>

    </div>
  );
}

export default App;