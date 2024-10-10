import { forwardRef } from "react";

const Input = forwardRef(function Input({ isTextArea, isRequired, type, value }, ref){
    return <>
        {isTextArea ? 
        <textarea rows='3' className="textarea" ref={ref} required={isRequired} defaultValue={value} /> :
        <input className="textarea" ref={ref} required={isRequired} type={type} defaultValue={value}/>}
    </>
})

export default Input;