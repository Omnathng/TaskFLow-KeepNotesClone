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

export const toRecycleBin = async(noteId,reqHeader)=>{
  return await commonAPI("PUT",`${BASE_URL}/note/move-to-recycle/${noteId}`,"",reqHeader)
}