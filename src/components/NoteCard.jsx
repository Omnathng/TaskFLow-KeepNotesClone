import React, { useState, useEffect } from 'react';
import { getUsernotes, moveNoteToRecycleBin, addCollaborators } from '../Services/allAPI';
import UserModal from './UserModal';

function NoteCard() {
  const getUNotes = async () => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');
      const reqHeader = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      try {
        const result = await getUsernotes(reqHeader);
        if (result.status === 200) {
          console.log('Result', result.data);
          setNoteResult(result.data);
        } else {
          console.log(result);
        }
      } catch (error) {
        console.log('Error fetching user notes', error);
      }
    }
  }

  const recycleBin = async (noteId) => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token');
      const reqHeader = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      try {
        const result = await moveNoteToRecycleBin(noteId, reqHeader);
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



  const [noteResult, setNoteResult] = useState([]);

  useEffect(() => {
    getUNotes();
  }, []);

  return (
    <div className='notes m-3 row'>
      {noteResult && noteResult.length > 0 ? noteResult.filter(item => !item.inRecycleBin).map((item) =>
        <div className='ntcard col-2 m-3 ncard d-flex flex-column' style={{ border: '1px solid #ccc', borderRadius: '25px', height: '8rem' }} key={item._id}>
          <h4 style={{}} className='w-100'>{item.title.substring(0, 10)}</h4>
          <p style={{ width: '100%', overflow: 'hidden' }}>{item.description.split(0, 20)}</p>
          {item.collaborators && item.collaborators.length > 0 && (
  <div className='d-flex'>
    {item.collaborators.slice(0,3).map((collaborator) => (
   
     
        <div key={collaborator.userId} className='m-1' style={{width:'25px',height:"25px",borderRadius:'50%',backgroundColor:'blue',color:'white ',textAlign:'center',fontSize:'1rem'}}>
                      {
                        collaborator.username ?  collaborator.username.charAt(0).toUpperCase(): null
                      }
                  </div>

    ))}
  </div>
)}

          <div style={{ position: 'relative', bottom: '0px' }} className="d-flex justify-content-between">
            <UserModal id={item._id}/>
            <div className='btn'><i className="fa-solid fa-trash-can me-2" onClick={() => recycleBin(item._id)}></i></div>
          </div>
        </div>) : null}
    </div>
  )
}

export default NoteCard;
