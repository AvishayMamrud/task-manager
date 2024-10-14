import React from "react";
import '../../App.css'
import NewTaskView from "./NewTaskView";

function EditTaskPage({ task, onSaveTask, onError }){
    //console.log(JSON.stringify(task))
    
    return <>
        <NewTaskView task={task} onSaveTask={onSaveTask} onError={onError}/>
    </>
}

export default EditTaskPage;