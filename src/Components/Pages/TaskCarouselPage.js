import { GoArrowRight, GoArrowLeft, GoTrash, GoPencil, GoCheck } from "react-icons/go";
import MiddleSectionMessage from "../MiddleSectionMessage";
import { Fragment } from "react";

function TaskCarouselPage({ task, onIncDecIndex, onEditTask, onRemoveTasks, onFinishTasks, index, length }){
    console.log(`${task} ,  ${JSON.stringify(task)}`)
    return <>
        {task ?
        <Fragment>
            <Task {...task}/>
            <div className="flex-item">
                <div className="horizontal-array">
                    <button disabled={length <= 1} onClick={() => onIncDecIndex(-1)}><GoArrowLeft fontSize='1.5rem'/><br/><small>Previous</small></button>
                    <button onClick={() => onRemoveTasks([task])}><GoTrash fontSize='1.5rem'/><br/><small>Remove</small></button>
                    <button onClick={() => onEditTask(task)}><GoPencil fontSize='1.5rem'/><br/><small>Edit</small></button>
                    <button onClick={() => onFinishTasks([task])}><GoCheck fontSize='1.5rem'/><br/><small>Finish</small></button>
                    <button disabled={length <= 1} onClick={() => onIncDecIndex(1)}><GoArrowRight fontSize='1.5rem'/><br/><small>Next</small></button>
                </div>
                <footer className="center" ><small style={{color: 'grey'}}>{index} out of {length}</small></footer>
            </div>
        </Fragment> :
        <MiddleSectionMessage msg='There are no tasks to display here...'/>}
    </>
}

function Task({ name, desc, priority, currentAge, deadline }){
    return <div className="flex-item flexed">
        <div>
        <p>{name}</p>
        <p>{desc}</p>
        <p>{priority}</p>
        <p>{deadline}</p>
        </div>
    </div>
}

export default TaskCarouselPage;