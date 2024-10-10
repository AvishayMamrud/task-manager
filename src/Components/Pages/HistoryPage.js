import React from "react";
import TasksTable from "../TasksTable";

function HistoryPage({ deletedTasks, finishedTasks, onRestoreTask }){
    return <>
        <div className="flex-item flexed">
            <div className="horizontal-array">
                <TasksTable tasks={finishedTasks} onRemoveTask={onRestoreTask} isFinished/>
                <TasksTable tasks={deletedTasks} onRemoveTask={onRestoreTask} isDeleted/>
            </div>
        </div>
    </>
}

export default HistoryPage;