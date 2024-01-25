import { BASE_URL } from "./baseurl"
import { commonAPI } from "./commonAPI"

export const registerAPI = async (user)=>{
    return await commonAPI("POST",`${BASE_URL}/user/register`,user,"")
}

// login
export const loginAPI = async(user)=>{
    return await commonAPI("POST",`${BASE_URL}/user/login`,user,"")
}

// Add a note
export const addNoteAPI = async (reqBody,reqHeader) => {
    return await commonAPI("POST", `${BASE_URL}/note/create`, reqBody,reqHeader);
  };

// get a note 
export const getUsernotes = async(reqHeader)=>{
  return await commonAPI("GET",`${BASE_URL}/note/user-notes`,"",reqHeader);
}

// move to recyclebin
// allAPI.js

export const moveNoteToRecycleBin = async (noteId, reqHeader) => {
  try {
    const response = await fetch(
      `${BASE_URL}/note/move-to-recycle/${noteId}`,
      {
        method: 'PUT',
        headers: reqHeader,
      }
    );

    if (response.ok) {
      const data = await response.json();
      return { status: response.status, data };
    } else {
      const errorMessage = await response.text();
      return { status: response.status, message: errorMessage };
    }
  } catch (error) {
    console.error('Error calling moveNoteToRecycleBin API:', error);
    return { status: 500, message: 'Internal server error' };
  }
};

export const restoreFromRecycleBin = async (noteId, reqHeader) => {
  try {
    const response = await fetch(
      `${BASE_URL}/note/restore-from-recycle/${noteId}`,
      {
        method: 'PUT',
        headers: reqHeader,
      }
    );

    if (response.ok) {
      const data = await response.json();
      return { status: response.status, data };
    } else {
      const errorMessage = await response.text();
      return { status: response.status, message: errorMessage };
    }
  } catch (error) {
    console.error('Error calling restoreFromRecycleBin API:', error);
    return { status: 500, message: 'Internal server error' };
  }
};

export const permanentDeleteNote = async (noteId, reqHeader) => {
  try {
    const result = await commonAPI('DELETE', `${BASE_URL}/note/permanent-delete/${noteId}`,{}, reqHeader);

    if (result.status === 204) {
      console.log('Note permanently deleted successfully');
    } else {
      console.log('Error deleting note permanently:', result);
    }

    return result;
  } catch (error) {
    console.error('Error calling API to permanently delete note:', error);
    throw error;
  }
};

export const addCollaborators = async (noteId, collaborators, reqHeader) => {
  try {
    const result = await commonAPI('POST', `${BASE_URL}/note/add-collaborators/${noteId}`, collaborators, reqHeader);

    if (result.status === 200) {
      console.log('Collaborators added successfully');
    } else {
      console.log('Error adding collaborators:', result.statusText);
    }

    return result;
  } catch (error) {
    console.error('Error calling API to add collaborators:', error);
    throw error;
  }
};

// get all users
export const getAllUsers = async()=>{
  return await commonAPI("GET",`${BASE_URL}/users`,"");
}