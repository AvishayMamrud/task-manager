import React from "react";
import '../../App.css'
import NewTaskView from "./NewTaskView";

function EditTaskPage(props){
    
    return <>
        <NewTaskView {...props}/>
    </>
}

export default EditTaskPage;