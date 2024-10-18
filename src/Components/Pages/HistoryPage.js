import React, { useRef, useState } from "react";
import TasksTable from "../TasksTable";
import { GoX } from "react-icons/go";
import { MdRestore } from "react-icons/md";
import SearchBar from "../SearchBar";
import Dialog from "../Dialog";

function HistoryPage({ deletedTasks, finishedTasks, onRestoreTasks, onPermanentDelete }){
    const [selectionFinished, setSelectionFinished] = useState([])
    const [selectionDeleted, setSelectionDeleted] = useState([])
    const [filtered, setFiltered] = useState({'deleted': deletedTasks, 'finished': finishedTasks})
    const x = useRef()

    function multiSelectHandler(tasks, isDeleted, isFinished, isSelect){
        isSelect && isDeleted && setSelectionDeleted(() => [...selectionDeleted, ...tasks])
        isSelect && isFinished && setSelectionFinished(() => [...selectionFinished, ...tasks])
        !isSelect && isDeleted && setSelectionDeleted(() => selectionDeleted.filter(t => tasks.every(x => x.name !== t.name)))
        !isSelect && isFinished && setSelectionFinished(() => selectionFinished.filter(t => tasks.every(x => x.name !== t.name)))
    }

    function restoreSelections(){
        onRestoreTasks([selectionFinished, selectionDeleted])
        setFiltered(() => {return {
            'deleted': filtered.deleted.filter(t => !selectionDeleted.includes(t)), 
            'finished': filtered.finished.filter(t => !selectionFinished.includes(t))
        }})
        setSelectionDeleted([])
        setSelectionFinished([])
    }

    function permanentlyDelete(){
        onPermanentDelete([selectionFinished, selectionDeleted])
        setFiltered(() => {return {
            'deleted': filtered.deleted.filter(t => !selectionDeleted.includes(t)), 
            'finished': filtered.finished.filter(t => !selectionFinished.includes(t))
        }})
        setSelectionDeleted([])
        setSelectionFinished([])
    }

    function searchHandler(phrase){
        setFiltered(() => {return {
            'deleted': filtered.deleted.filter(t => t.name.includes(phrase) || t.desc.includes(phrase)), 
            'finished': filtered.finished.filter(t => t.name.includes(phrase) || t.desc.includes(phrase))
        }})
    }

    function onTaskSelect(task, isDeleted, isFinished){
        x.current.open({'task': task, 'isDeleted': isDeleted, 'isFinished': isFinished})
    }

    function singularRestoreHandler({task, isDeleted, isFinished}){
        isFinished ? onRestoreTasks([[task], []]) : isDeleted && onRestoreTasks([[], [task]])
        isFinished ? setFiltered(() => {return {
            'deleted': filtered.deleted,
            'finished': filtered.finished.filter(t => t !== task) 
        }}) : isDeleted && setFiltered(() => {return {
            deleted: filtered.deleted.filter(t => t !== task), 
            finished: filtered.finished
        }})
    }

    function singularDeleteHandler({task, isDeleted, isFinished}){
        isFinished ? onPermanentDelete([[task], []]) : isDeleted && onPermanentDelete([[], [task]])
        isFinished ? setFiltered(() => {return {
            'deleted': filtered.deleted,
            'finished': filtered.finished.filter(t => t !== task) 
        }}) : isDeleted && setFiltered(() => {return {
            deleted: filtered.deleted.filter(t => t !== task), 
            finished: filtered.finished
        }})
    }

    return <>
        <Dialog
            ref={x} 
            msg='This is the massage...' 
            buttonFuncObj={{
                'Restore': singularRestoreHandler, 
                'Permanently Delete': singularDeleteHandler
            }}
        />
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
                <TasksTable tasks={filtered.deleted} onTaskSelect={onTaskSelect} onMultipleSelect={multiSelectHandler} isDeleted/>
                <TasksTable tasks={filtered.finished} onTaskSelect={onTaskSelect} onMultipleSelect={multiSelectHandler} isFinished/>
            </div>
        </div>
    </>
}

export default HistoryPage;