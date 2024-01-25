import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getUsernotes, permanentDeleteNote, restoreFromRecycleBin, toRecycleBin } from '../Services/allAPI'
import Navbar from './Navbar'

function DeletedNotes() {
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

  const restoreFromBin = async (noteId) => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');
      const reqHeader = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      try {
        const result = await restoreFromRecycleBin(noteId, reqHeader);
        console.log('Result from API call:', result);

        if (result.status === 200) {
          console.log('Note moved to recycle bin successfully');
          setNoteResult((prevNotes) =>
            prevNotes.filter((note) => note._id !== noteId)
          );
        } else {
          console.log('Error moving note to recycle bin:', result.message);
        }
      } catch (error) {
        console.log('Error calling API to move note to recycle bin:', error);
      }
    }
  };

  const deleteNote = async (noteId) => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');
      const reqHeader = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      try {
        const result = await permanentDeleteNote(noteId, reqHeader);
        console.log('Result from API call:', result);

        if (result.status === 204) {
          console.log('Note permanently deleted successfully');
          setNoteResult((prevNotes) =>
            prevNotes.filter((note) => note._id !== noteId)
          );
        } else {
          console.log('Error permanently deleting note:', result.message);
        }
      } catch (error) {
        console.log('Error calling API to permanently delete note:', error);
      }
    }
  };

  const [noteResult,setNoteResult]=useState([])

  useEffect(()=>{
    getUNotes()
  },[])

  return (
    <div>
        <Navbar/>
        <div className='notes m-3 row'>
            {noteResult && noteResult.length > 0 ? noteResult.filter(item => item.inRecycleBin).map((item)=>
            <div className='ntcard col-2 m-3 ncard d-flex flex-column' style={{border:'1px solid #ccc',borderRadius:'25px',height:'8rem'}}>
            <h4 style={{}} className='w-100'>{item.title.substring(0,10)}</h4>
            <p style={{width:'100%',overflow:'hidden'}}>{item.description.split(0,20)}</p>
            <div style={{position:'relative',bottom:'0px'}} className="d-flex justify-content-between" >
              <div className='btn'><i className="fa-solid fa-trash-arrow-up " onClick={()=>restoreFromBin(item._id)}></i></div>
              <div className='btn'><i className="fa-solid fa-trash-can me-2" onClick={() => deleteNote(item._id)}></i></div>
            </div>
        </div>):null }
         
        </div>
    </div>
   
  )
}

export default DeletedNotes