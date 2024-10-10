import React from "react";
import MiddleSectionMessage from "./MiddleSectionMessage";

function TasksTable({ tasks, onRemoveTask, onTaskSelect, isFinished, isDeleted }){
    const msg = isDeleted ? 'Deleted' : isFinished ? 'Finised' : ''
    return <div className="">
        <h4 style={{fontStyle: 'italic', border: '1px dotted grey', borderRadius: '.5rem', margin: '1rem 5rem'}}><italic>{msg} Tasks</italic></h4>
        {tasks.length >0 ?
        <table className="task-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Priority</th>
                    <th>Deadline</th>
                    {isFinished && <th>Finish Time</th>}
                    {isDeleted && <th>Remove Time</th>}
                </tr>
            </thead>
            <tbody>
                {tasks.map(t => <tr key={`task${t.name}`} onClick={() => onTaskSelect(t.name)}>
                                    <td>{t.name}</td>
                                    <td>{t.priority}</td>
                                    <td>{t.finishTime && new Date(t.deadline).toLocaleDateString('en-GB')}</td>
                                    {isFinished && t.finishTime && <td>{new Date(t.finishTime).toLocaleDateString('en-GB')}</td>}
                                    {isDeleted && t.finishTime && <td>{new Date(t.finishTime).toLocaleDateString('en-GB')}</td>}
                                </tr>)}
            </tbody>
        </table> : 
        <MiddleSectionMessage msg='There are no tasks to display here...'/>}
    </div>
}

export default TasksTable;