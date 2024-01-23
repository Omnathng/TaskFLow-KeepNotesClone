import React, { useState, useEffect, useRef } from 'react';
import './notes.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addNoteAPI } from '../Services/allAPI';
import NoteCard from './NoteCard';

function Notes({ alignRight }) {
  console.log("Component rerendered");
  const [token, setToken] = useState("");
  const [showSecondInput, setShowSecondInput] = useState(false);
  const mainDivRef = useRef(null);
  const [noteDetails, setNoteDetails] = useState({
    title: "",
    description: "",
    image: null,
  });

  const handleTitleChange = (e) => {
    setNoteDetails((prevNoteDetails) => {
      const updatedNoteDetails = { ...prevNoteDetails, title: e.target.value };
      console.log("Updated state: ", updatedNoteDetails);
      return updatedNoteDetails;
    });
  };

  const handleDescriptionChange = (e) => {
    setNoteDetails((prevNoteDetails) => {
      const updatedNoteDetails = { ...prevNoteDetails, description: e.target.value };
      console.log("Updated state: ", updatedNoteDetails);
      return updatedNoteDetails;
    });
  };

  const handleAdd = async () => {
    console.log("Before check - Note details:", noteDetails);
    const { title, description, image } = noteDetails;
    console.log("Note details:", noteDetails);


      console.log("Inside check - Note details:", noteDetails);
      const reqBody = new FormData();
      const userString = sessionStorage.getItem("existingUser");
      const userObject = JSON.parse(userString);

      // Access the _id property
      const userId = userObject._id;

      // Now, userId contains the value of _id
      console.log("UserId:", userId);

      // Append the Authorization header directly to the FormData object
      reqBody.append("userId", userId);
      reqBody.append("title", title);
      reqBody.append("description", description);

      // Add image only if it exists
      if (image) {
        reqBody.append("image", image);
      }
      const reqHeader={
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
      try {
        console.log("Token:", token);
        console.log("UserId:", userId);

        const result = await addNoteAPI(reqBody,reqHeader);

        if (result.status === 201) {
          console.log(result.data);
          alert("Note Added");
          setNoteDetails({
            title: "",
            description: "",
            image: null,
          });
        } else {
          console.log(result);
          toast.warning(result.response.data);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to add note");
      }
  };

  const expandInput = () => {
    setShowSecondInput(true);
  };

  const handleClickOutside = (event) => {
    if (mainDivRef.current && !mainDivRef.current.contains(event.target)) {
      console.log("Clicked outside");
      setShowSecondInput(false);
      // Save the note when clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    } else {
      setToken("");
    }
  }, []);

  return (
 
      <div ref={mainDivRef} className={`notes-container ${alignRight ? 'align-right' : ''} d-flex justify-content-center responsive-container`} style={{ width: '100%' }}>
        {/* Second input */}
        <div className='pt-2 pb-2 ps-3 pe-3 d-flex flex-column justify-content-between w-50' style={{border:'1px solid #ccc',borderRadius:'25px',marginRight:'200px',height:'5rem'}}>
          {showSecondInput && (
            <div className='d-flex justify-content-between w-100 mt-2'>
              <input
                type="text"
                style={{ width: '75%', border: '0', outline: "0", background: 'transparent' }}
                placeholder='Title'
                value={noteDetails.title}
                onChange={handleTitleChange}
              />
              <i onClick={()=>handleAdd()} class="fa-solid fa-check"></i>
            </div>
          )}
  
          {/* take a note */}
          <div className='d-flex justify-content-between w-100 mt-2'>
            <input
              onClick={expandInput}
              type="text"
              style={{ width: '75%', border: '0', outline: "0", background: 'transparent' }}
              placeholder='Add a Note...'
              value={noteDetails.description}
              onChange={handleDescriptionChange}
            />
            <label htmlFor='fileInput' className='icn'>
              <input
                id='fileInput'
                type='file'
                style={{ display: 'none' }}
                onChange={(e)=>setNoteDetails({
                  ...noteDetails,
                  image:e.target.files[0],
                })
              }
              />
              <i className="fa-regular fa-image"></i>
            </label>
          </div>
        </div>
        <ToastContainer position='top-right' autoClose={2000} theme='colored'/>
      </div>


  );
}

export default Notes;
