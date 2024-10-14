import React, { useState } from "react";
import TasksTable from "../TasksTable";
import { GoCheck, GoTrash } from "react-icons/go";
import { FaTags } from "react-icons/fa6";
import SearchBar from "../SearchBar";

function AllTasksPage({ tasks, onRemoveTasks, onTaskSelect, onEditTask, onFinishTasks }){
    const [selection, setSelection] = useState([])
    const [filtered, setFiltered] = useState(tasks)

    function multiSelectHandler(tasks, isDeleted, isFinished, isSelect){
        isSelect && !isDeleted && !isFinished && setSelection(() => [...selection, ...tasks])
        !isSelect && !isDeleted && !isFinished && setSelection(() => selection.filter(t => tasks.every(x => x.name !== t.name)))
    }

    function removeSelected(){
        onRemoveTasks(selection)
        setFiltered(tasks.filter(t => selection.every(x => x.name !== t.name)))
        setSelection([])
    }

    function finishSelected(){
        //console.log(`selection - ${JSON.stringify(selection)}`)
        onFinishTasks(selection)
        setFiltered(tasks.filter(t => selection.every(x => x.name !== t.name)))
        setSelection([])
    }

    function editTags(){
        //console.log('asdfghjkl')
    }

    function searchHandler(phrase){
        setFiltered(tasks.filter(t => t.name.includes(phrase) || t.desc.includes(phrase)))
    }

    return <>
        <SearchBar onSearch={searchHandler} placeholder='Filter tasks by name or tag...'/>
        {selection.length > 0 &&
            <div className="flex-item">
                <div className="horizontal-array">
                    <button onClick={removeSelected}><GoTrash fontSize='1.5rem'/><br/><small>Remove</small></button>
                    <button onClick={editTags}><FaTags fontSize='1.5rem'/><br/><small>Edit<br/>Tags</small></button>
                    <button onClick={finishSelected}><GoCheck fontSize='1.5rem'/><br/><small>Finish</small></button>
                </div>
            </div>}
        <div className="flex-item flexed">
            <TasksTable tasks={filtered} onTaskSelect={onTaskSelect} onMultipleSelect={multiSelectHandler}/>
        </div>
    </>
}

export default AllTasksPage;