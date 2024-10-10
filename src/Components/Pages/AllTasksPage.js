import React, { useState } from "react";
import TasksTable from "../TasksTable";
import { GoCheck, GoTrash } from "react-icons/go";
import { FaTags } from "react-icons/fa6";

function AllTasksPage({ tasks, onRemoveTasks, onTaskSelect, onEditTask, onFinishTasks }){
    const [selection, setSelection] = useState([])

    function multiSelectHandler(task, isDeleted, isFinished, isSelect){
        isSelect && !isDeleted && !isFinished && setSelection(() => [...selection, task])
        !isSelect && !isDeleted && !isFinished && setSelection(() => selection.filter(t => t.name !== task.name))
    }

    function removeSelected(){
        onRemoveTasks(selection)
        setSelection([])
    }

    function finishSelected(){
        console.log(`selection - ${JSON.stringify(selection)}`)
        onFinishTasks(selection)
        setSelection([])
    }

    function editTags(){
        console.log('asdfghjkl')
    }

    return <>
        {selection.length > 0 &&
            <div className="flex-item">
                <div className="horizontal-array">
                    <button onClick={removeSelected}><GoTrash fontSize='1.5rem'/><br/><small>Remove</small></button>
                    <button onClick={editTags}><FaTags fontSize='1.5rem'/><br/><small>Edit<br/>Tags</small></button>
                    <button onClick={finishSelected}><GoCheck fontSize='1.5rem'/><br/><small>Finish</small></button>
                </div>
            </div>}
        <div className="flex-item flexed">
            <TasksTable tasks={tasks} onTaskSelect={onTaskSelect} onMultipleSelect={multiSelectHandler}/>
        </div>
    </>
}

export default AllTasksPage;