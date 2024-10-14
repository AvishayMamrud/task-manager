import React, { useState } from "react";
import TasksTable from "../TasksTable";
import { GoX } from "react-icons/go";
import { MdRestore } from "react-icons/md";
import SearchBar from "../SearchBar";

function HistoryPage({ deletedTasks, finishedTasks, onRestoreTasks, onPermanentDelete, onTaskSelect }){
    const [selectionFinished, setSelectionFinished] = useState([])
    const [selectionDeleted, setSelectionDeleted] = useState([])
    const [filtered, setFiltered] = useState([deletedTasks, finishedTasks])

    function multiSelectHandler(tasks, isDeleted, isFinished, isSelect){
        isSelect && isDeleted && setSelectionDeleted(() => [...selectionDeleted, ...tasks])
        isSelect && isFinished && setSelectionFinished(() => [...selectionFinished, ...tasks])
        !isSelect && isDeleted && setSelectionDeleted(() => selectionDeleted.filter(t => tasks.every(x => x.name !== t.name)))
        !isSelect && isFinished && setSelectionFinished(() => selectionFinished.filter(t => tasks.every(x => x.name !== t.name)))
    }

    function restoreSelections(){
        onRestoreTasks([selectionFinished, selectionDeleted])
        setFiltered(() => [
            filtered[0].filter(t => !selectionDeleted.includes(t)), 
            filtered[1].filter(t => !selectionFinished.includes(t))
        ])
        setSelectionDeleted([])
        setSelectionFinished([])
        
    }

    function permanentlyDelete(){
        onPermanentDelete([selectionFinished, selectionDeleted])
        setFiltered([
            filtered[0].filter(t => !selectionDeleted.includes(t)), 
            filtered[1].filter(t => !selectionFinished.includes(t))
        ])
        setSelectionDeleted([])
        setSelectionFinished([])
    }

    function searchHandler(phrase){
        setFiltered([
            deletedTasks.filter(t => t.name.includes(phrase) || t.desc.includes(phrase)), 
            finishedTasks.filter(t => t.name.includes(phrase) || t.desc.includes(phrase))
        ])
    }

    return <>
        <SearchBar onSearch={searchHandler} placeholder='Filter tasks by name or tag...'/>
        {(selectionDeleted.length > 0 || selectionFinished.length > 0) &&
            <div className="flex-item">
                <div className="horizontal-array">
                        <button onClick={permanentlyDelete}><GoX fontSize='1.5rem'/><br/><small>Permanently<br/>Delete</small></button>
                        <button onClick={restoreSelections}><MdRestore fontSize='1.5rem'/><br/><small>Restore<br/>Tasks</small></button>
                </div>
            </div>}
        <div className="flex-item flexed">
            <div className="horizontal-array">
                <TasksTable tasks={filtered[0]} onTaskSelect={onTaskSelect} onMultipleSelect={multiSelectHandler} isDeleted/>
                <TasksTable tasks={filtered[1]} onTaskSelect={onTaskSelect} onMultipleSelect={multiSelectHandler} isFinished/>
            </div>
        </div>
    </>
}

export default HistoryPage;