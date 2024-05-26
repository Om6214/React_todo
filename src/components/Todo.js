import React,{useEffect, useState} from 'react'
import list from '../images/list'
import '../App.css'
import { HiMiniArchiveBox } from "react-icons/hi2";
import { IoAdd } from "react-icons/io5";
import { MdDelete } from "react-icons/md";


const Todo = () => {
    const getarray=()=>{
        const list = localStorage.getItem('tasklist');
        return list?JSON.parse(list):[];
    }
    const [task, setTask] = useState("")
    const [taskarray, setTaskArray] = useState(getarray())
    
    const submit =(e)=>{
        e.preventDefault();
        setTaskArray([...taskarray,task])
        setTask(""); 
    }
    const deletetask=(index)=>{
        const newArray= taskarray.filter((_, i)=> i!==index);
        setTaskArray(newArray)
    }
    useEffect(()=>{
        localStorage.setItem('tasklist',JSON.stringify(taskarray))
    },[taskarray])
    const clear= ()=>{
        setTaskArray([]);
    }
  return (
    <>
        <div className="main-cont">
            <div className="container">
                <img src={list} alt="" />
                <h3>Enter your tasks</h3>
                <div className="inputs">
                    <label htmlFor="tasks"></label>
                    <div className="input"><input type="text" name="tasks" id="tasks" value={task} onChange={(e)=>setTask(e.target.value)}/><IoAdd className='icon' onClick={submit} /></div>
                    <ul>
                        {
                            taskarray.map((curEle,index)=>{
                                return(
                                    <ul key={index}>{curEle} <MdDelete className='delicon' onClick={()=>deletetask(index)}/></ul>
                                )
                            })
                        }
                    </ul>
                    <button onClick={clear}>clear all</button>
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default Todo