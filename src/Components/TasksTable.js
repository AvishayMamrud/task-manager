import React, { useState } from "react";
import MiddleSectionMessage from "./MiddleSectionMessage";

// 1. add support for tags in description
// 2. add a search box in the tasks display page and history page 
// 3. implement edit tags in the tasks display page and history page
// 4. check for auto complete for tags
// 5. implement pop-up dialog when clicking on History page 
//    to choose Restore, Edit and restore or Parmenently delete
// 6. implement pop-up dialog of "Are you sure?" before multiselected tasks function execution



function TasksTable({ tasks, onTaskSelect, onMultipleSelect, isFinished = false, isDeleted = false }){
    const msg = isDeleted ? 'Deleted' : isFinished ? 'Finished' : ''
    const [defaulCheck, setDefaulCheck] = useState(false)
    function selectAll(val){
        setDefaulCheck(val)
        onMultipleSelect(tasks, isDeleted, isFinished, val)
    }

    return <div>
        <h4 style={{fontStyle: 'italic', border: '1px dotted grey', borderRadius: '.5rem', margin: '1rem 5rem'}}>{msg} Tasks</h4>
        {tasks.length > 0 ?
        <table className="task-table">
            <thead>
                <tr>
                    <th></th>
                    {/* <input type="checkbox" onChange={e => selectAll(e.target.checked)}/> */}
                    <th>Name</th>
                    <th>Priority</th>
                    <th>Deadline</th>
                    {isFinished && <th>Finish Time</th>}
                    {isDeleted && <th>Remove Time</th>}
                </tr>
            </thead>
            <tbody>
                {tasks.map(t => <tr key={`task${t.name}`}>
                                    <td><input type="checkbox" onChange={(e) => onMultipleSelect([t], isDeleted, isFinished, e.target.checked)} /></td>
                                    <td onClick={() => onTaskSelect(t)}>{t.name}</td>
                                    <td onClick={() => onTaskSelect(t)}>{t.priority}</td>
                                    <td onClick={() => onTaskSelect(t)}>{t.finishTime && new Date(t.deadline).toLocaleDateString('en-GB')}</td>
                                    {isFinished && t.finishTime && <td onClick={() => onTaskSelect(t)}>{new Date(t.finishTime).toLocaleDateString('en-GB')}</td>}
                                    {isDeleted && t.finishTime && <td onClick={() => onTaskSelect(t)}>{new Date(t.finishTime).toLocaleDateString('en-GB')}</td>}
                                </tr>)}
            </tbody>
        </table> : 
        <MiddleSectionMessage msg='There are no tasks to display here...'/>}
    </div>
}

export default TasksTable;