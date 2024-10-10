import React from "react";
import TasksTable from "../TasksTable";

function AllTasksPage({ tasks, onRemoveTask, onTaskSelect }){

    return <div className="flex-item flexed">
        <TasksTable tasks={tasks} onRemoveTask={onRemoveTask} onTaskSelect={onTaskSelect}/>
    </div>
}

export default AllTasksPage;