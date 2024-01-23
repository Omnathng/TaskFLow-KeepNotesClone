import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getUsernotes, toRecycleBin } from '../Services/allAPI'

function NoteCard() {
  const getUNotes = async ()=>{
    
    if(sessionStorage.getItem('token')){
        const token = sessionStorage.getItem('token')
      const reqHeader ={
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      }
      try{
        const result=await getUsernotes(reqHeader);
        if(result.status===200){
          console.log('Result',result.data);
          setNoteResult(result.data)          
        }else{
          console.log(result);
        }
      }catch(error){
        console.log("Error fetching user notes",error)
      }
    }
  }

  const recycleBin = async (noteId)=>{
    if(sessionStorage.getItem('token')){
      const token = sessionStorage.getItem('token')
    const reqHeader ={
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    }
    try{
      const result=await toRecycleBin(noteId,reqHeader);
      if(result.status===204){
        console.log('Result',result.data);
        setNoteResult((prevNotes) =>
        prevNotes.filter((note) => note._id !== noteId));         
      }else{
        console.log(result);
      }
    }catch(error){
      console.log("Error Deleting user notes",error)
    }
  }
  }

  const [noteResult,setNoteResult]=useState([])

  useEffect(()=>{
    getUNotes()
  },[])

  return (
    <div className='notes m-3 row'>
        {noteResult && noteResult.length > 0 ? noteResult.filter(item => !item.inRecycleBin).map((item)=>
        <div className='ntcard col-2 m-3 ncard d-flex flex-column' style={{border:'1px solid #ccc',borderRadius:'25px',height:'8rem'}}>
        <h4 style={{}} className='w-100'>{item.title.substring(0,10)}</h4>
        <p style={{width:'100%',overflow:'hidden'}}>{item.description.split(0,20)}</p>
        <div style={{position:'relative',bottom:'0px'}} className="d-flex justify-content-between" >
          <div className='btn'><i className="fa-solid fa-user-plus " ></i></div>
          <div className='btn'><i className="fa-solid fa-trash-can me-2" onClick={()=>recycleBin(item._id)}></i></div>
        </div>
    </div>):null }
     
    </div>
  )
}

export default NoteCard