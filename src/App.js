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
  constructor(name, desc, priority, deadline){
    this.name = name;
    this.desc = desc;
    this.priority = priority;
    this.currentAge = priority;
    this.deadline = deadline;
  }
}

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
    console.log('addTaskHandler')
    if(tasks.filter(t => t.name === name).length > 0){
      headerMessageHandler(`The name '${name}' already exists. choose a different one.`, true)
    }else{
      tasks.push(new Task(name, desc, priority, deadline))
      console.log(currSortFuncName)
      console.log(typeof currSortFuncName)
      // (priority, 5))
      setTasks(() => tasks.sort(sortFuncs[[currSortFuncName]]))
      headerMessageHandler('addTaskHandler', false)
    }
  }

  function removeTaskHandler(task){
    if(task === tasks[selectedTaskIndex]){
      task.finishTime = Date.now()
      setDeletedTasks([task, ...deletedTasks])
      setTasks(() => tasks.slice(0, selectedTaskIndex).concat(tasks.slice(selectedTaskIndex + 1, tasks.length)))
      setSelectedTaskIndex(() => tasks.length > 1 ? mod(selectedTaskIndex, tasks.length - 1) : 0)
      headerMessageHandler('removeTaskHandler', false)
    }
  }

  function taskSelectHandler(name){
    let index = tasks.findIndex(t => t.name === name)
    index = index >= 0 ? index : 0
    console.log(`index - ${index}`)
    setSelectedTaskIndex(index)
    setCurrPage('Next Task')
  }

  function changeSortHandler(sortFuncName){
    console.log('changeSortHandler')
    headerMessageHandler('changeSortHandler', false)
    setCurrSortFuncName(sortFuncName)
    setTasks(tasks.sort(sortFuncs[[sortFuncName]]))
  }

  function changeSelectedTaskIndex(increment){
    console.log('changeSelectedTaskIndex')
    if(currPage !== 'Next Task'){
      setCurrPage('Next Task')
    }
    setSelectedTaskIndex(() => tasks.length > 0 ? mod(selectedTaskIndex + increment, tasks.length) : 0)
  }

  function finishTaskHandler(task){
    if(task === tasks[selectedTaskIndex]){
      headerMessageHandler('finishTaskHandler', false)
      task.finishTime = Date.now()
      setFinishedTasks([task, ...finishedTasks])
      setTasks(() => tasks.slice(0, selectedTaskIndex).concat(tasks.slice(selectedTaskIndex + 1, tasks.length)))
      setSelectedTaskIndex(() => tasks.length > 1 ? mod(selectedTaskIndex, tasks.length - 1) : 0)
    }
  }

  function restoreTaskHandler(task){

  }

  function editTaskHandler(task){
    setCurrPage('Edit Task')
  }

  function editSaveHandler(task, name, desc, priority, deadline){
    // const foundTask = tasks.filter(t => t.name === task.name)
    console.log(`tasks[selectedTaskIndex] - ${tasks[selectedTaskIndex]} ,  `)
    if(tasks[selectedTaskIndex].name !== task.name){
      headerMessageHandler(`The has been a complecation...`, true)
    }else{
      tasks[selectedTaskIndex] = new Task(name, desc, priority, deadline)
      console.log(currSortFuncName)
      console.log(typeof currSortFuncName)
      setTasks(() => tasks)
      headerMessageHandler('editSaveHandler', false)
    }
  }


  const pageNames = ['Add Task', 'Edit Task', 'All Tasks', 'Next Task', 'History']
  // return <div className='app'>
  //   <MainPage/>
  // </div>
  console.log(Object.keys(sortFuncs))
  return (
    <div className='app'>
      <SideMenu 
        buttons={pageNames.filter(v => v !== 'Edit Task')} 
        onPageSelect={pageSelectHandler} 
        sortFuncs={Object.keys(sortFuncs)} 
        onChangeSorting={changeSortHandler}
        currPage={currPage}
        // currSortFunc={currSortFuncName}
      />
      <div className='main-page'>
        {headerMessage[0] && <p className={`flex-item message ${headerMessage[1] ? 'error' : 'info'}`}>{headerMessage[0]}</p>}
        {currPage === 'Main' && <MainPage/>}
        {currPage === 'Add Task' && <NewTaskView onSaveTask={addTaskHandler} onError={headerMessageHandler}/>}
        {currPage === 'Edit Task' && <EditTaskPage task={tasks[selectedTaskIndex]} onSaveTask={editSaveHandler} onError={headerMessageHandler}/>}
        {currPage === 'All Tasks' && <AllTasksPage tasks={tasks} onRemoveTask={removeTaskHandler} onTaskSelect={taskSelectHandler}/>}
        {currPage === 'Next Task' && <TaskCarouselPage 
                                        task={tasks.length > 0 ? tasks[selectedTaskIndex] : null} 
                                        onIncDecIndex={changeSelectedTaskIndex}
                                        onEditTask={editTaskHandler}
                                        onRemoveTask={removeTaskHandler} 
                                        onFinishTask={finishTaskHandler}
                                        index={selectedTaskIndex + 1}
                                        length={tasks.length}
                                      />}
        {console.log(`${tasks} ,  ${JSON.stringify(tasks)} ,  ${selectedTaskIndex}`)}
        {currPage === 'History' && <HistoryPage finishedTasks={finishedTasks} deletedTasks={deletedTasks} onRestoreTask={restoreTaskHandler}/>}
      </div>

    </div>
  );
}

export default App;