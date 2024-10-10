import React, { useState } from "react";
import TasksTable from "../TasksTable";
import { GoX } from "react-icons/go";
import { MdRestore } from "react-icons/md";

function HistoryPage({ deletedTasks, finishedTasks, onRestoreTask, onPermanentDelete, onTaskSelect }){
    const [selectionFinished, setSelectionFinished] = useState([])
    const [selectionDeleted, setSelectionDeleted] = useState([])

    function multiSelectHandler(task, isDeleted, isFinished, isSelect){
        console.log(JSON.stringify(task))
        console.log(isSelect)
        isSelect && isDeleted && setSelectionDeleted(() => [...selectionDeleted, task])
        isSelect && isFinished && setSelectionFinished(() => [...selectionFinished, task])
        !isSelect && isDeleted && setSelectionDeleted(() => selectionDeleted.filter(t => t.name !== task.name))
        !isSelect && isFinished && setSelectionFinished(() => selectionFinished.filter(t => t.name !== task.name))
    }

    function restoreSelections(){

    }

    function permanentlyDelete(){

    }

    return <>
        {(selectionDeleted.length > 0 || selectionFinished.length > 0) &&
            <div className="flex-item">
                <div className="horizontal-array">
                        <button onClick={permanentlyDelete}><GoX fontSize='1.5rem'/><br/><small>Permanently<br/>Delete</small></button>
                        <button onClick={restoreSelections}><MdRestore fontSize='1.5rem'/><br/><small>Restore<br/>Tasks</small></button>
                </div>
            </div>}
        <div className="flex-item flexed">
            <div className="horizontal-array">
                <TasksTable tasks={finishedTasks} onTaskSelect={onTaskSelect} onMultipleSelect={multiSelectHandler} isFinished/>
                <TasksTable tasks={deletedTasks} onTaskSelect={onTaskSelect} onMultipleSelect={multiSelectHandler} isDeleted/>
            </div>
        </div>
    </>
}

export default HistoryPage;