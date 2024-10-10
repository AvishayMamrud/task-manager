import React, { useRef } from "react";
import Input from "../Input";
import '../components.css'

function NewTaskView({ task, onSaveTask, onError }){

    console.log(task ? JSON.stringify(task) : 'null')
    
    const taskNameRef = useRef()
    const taskDescRef = useRef()
    const priorityRef = useRef()
    const deadlineRef = useRef()

    function saveTaskHandler(){
        const name = taskNameRef.current.value 
        const desc = taskDescRef.current.value
        const priority = Number(priorityRef.current.value)
        const deadline = deadlineRef.current.value
        if(name && priority && priority > 0 && priority <= 5){
            task 
            ? onSaveTask(task, name, desc, priority, deadline)
            : onSaveTask(name, desc, priority, deadline)
        }else if(name === ''){
            onError('A task must have a non-empty name', true)
        }else{
            onError('A task must have a numeric priority (1-5)', true)
        }
        
    }
    
    return <div className="flex-item flexed">
        <table className="table">
            <tbody>
                <tr>
                    <td><label htmlFor="name">Task Name</label></td>
                    <td><Input name='name' ref={taskNameRef} isRequired type='text' value={task ? task.name : ''}/></td>
                </tr>
                <tr>
                    <td><label htmlFor="desc">Task Description</label></td>
                    <td><Input name="desc" ref={taskDescRef} isTextArea value={task ? task.desc : ''}/></td>
                </tr>
                <tr>
                    <td><label htmlFor="priority">Priority</label></td>
                    <td><Input name="priority" ref={priorityRef} isRequired type='numeric' value={task ? task.priority : ''}/></td>
                </tr>
                <tr>
                    <td><label htmlFor="deadline">Deadline</label></td>
                    <td><Input name="deadline" ref={deadlineRef} type='date' value={task ? task.deadline : ''}/></td>
                </tr>
                <tr>
                    <td colSpan='2'><button onClick={saveTaskHandler}>Save</button></td>
                </tr>
            </tbody>
        </table>
    </div>
}

export default NewTaskView;