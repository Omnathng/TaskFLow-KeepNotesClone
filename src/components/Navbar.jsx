import React, { useState } from 'react';
import logo from "../images/logo_transparent.png";
import './style.css'
import Notes from './Notes';
import { textAlign } from '@mui/system';
import { Link } from 'react-router-dom';
import DeletedNotes from './DeletedNotes';


function Navbar() {
    const [sidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
      setSidebarVisible(!sidebarVisible);
    };
    const userNameData = sessionStorage.getItem('existingUser');
    
    const userNameObject = JSON.parse(userNameData);
    console.log('userNameObject:', userNameObject);
    
    const initial = userNameObject ? userNameObject.username : null;
    console.log('initial:', initial);
  return (
    <>
        <nav className='flex-div w-100 d-flex align-items-center pt-2 ps-4 pb-2 pe-5' style={{boxShadow:'0 0 1rem rgba(0,0,0,0.2)',zIndex:'100'}}>
    
            <div className='nav-start w-25 d-flex'>
                <div className='icon '><i className="fa-solid mt-1 fa-bars fa-2x d-flex align-items-center justify-content-center" onClick={toggleSidebar}  style={{ transition: 'background 0.3s' }}></i></div>
                <img className='ms-5 me-2' src={logo} alt="#" />
                <h4>TaskFlow</h4>
            </div>
            <div className='nav-middle'>
                <div className='pt-2 pb-2 ps-3 pe-3 d-flex' style={{border:'1px solid #ccc',borderRadius:'25px'}}>
                    <input type="text" style={{width:'400px',border:'0',outline:"0",background:'transparent'}} placeholder='Search'/>
                    <div className='icn'><i class="fa-solid fa-magnifying-glass"></i></div>
                </div>
            </div>
            <div className='nav-end'>
                <div className=' d-flex justify-content-evenly w-50' style={{position:'static'}}>
                    <div className='icns'><i className="fa-solid fa-rotate-right pe-3"></i></div>
                    <div className='icns'><i className="fa-solid fa-list pe-3"></i></div>
                    <div className='icns'><i className="fa-solid fa-gear pe-3"></i></div>
                </div>
                <div className='ms-5 pt-1' style={{width:'35px',height:"35px",borderRadius:'50%',backgroundColor:'blue',color:'white ',textAlign:'center',fontSize:'1.2rem'}}>
                    {
                      initial ? initial.charAt(0).toUpperCase() : null
                    }
                </div>
            </div>
        </nav>


        <div className={`${sidebarVisible ? 'sidebar' : 'sidebar-small'} pt-5 mt-5`} style={{ width: sidebarVisible ? '15%' : '10%', height: 'calc(max-content - 60px)', position: 'fixed', paddingLeft:sidebarVisible? '2%':'4%', background: '#fff', top: '25px', boxShadow: '0 0 0.5rem rgba(0,0,0,0.2), 0.5rem 0 1rem rgba(0,0,0,0.1)', transition: 'width 0.3s ease' }}>
              <div className='shortcut-links'>
                <a href='' style={{ textDecoration: 'none', color: '#000', display: 'flex', alignItems: 'center', flexWrap: 'wrap', width: 'fit-content' }}>
                  <i className="icn fa-regular fa-clipboard fa-lg" style={{ marginRight: '8px', marginTop: sidebarVisible ? "" : "25px" }}></i>
                  <p className={`ms-3 mt-2 ${sidebarVisible ? '' : 'd-none'}`}>Notes</p>
                </a>

                <a href='' style={{ textDecoration: 'none', color: '#000', display: 'flex', alignItems: 'center', flexWrap: 'wrap', width: 'fit-content' }}>
                  <i className="icn fa-regular fa-bell fa-lg" style={{ marginRight: '8px', marginTop: sidebarVisible ? "" : "50px" }}></i>
                  <p className={`ms-3 mt-2 ${sidebarVisible ? '' : 'd-none'}`}>Reminder</p>
                </a>

                <a href='' style={{ textDecoration: 'none', color: '#000', display: 'flex', alignItems: 'center', flexWrap: 'wrap', width: 'fit-content' }}>
                  <i class="icn fa-solid fa-pencil fa-lg" style={{ marginRight: '8px', marginTop: sidebarVisible ? "" : "50px" }}></i>
                  <p className={`ms-2 mt-2 ${sidebarVisible ? '' : 'd-none'}`}>Edit Labels</p>
                </a>

                <Link to={"/deleted-notes"} style={{ textDecoration: 'none', color: '#000', display: 'flex', alignItems: 'center', flexWrap: 'wrap', width: 'fit-content' }}>
                  <i class="icn fa-solid fa-recycle fa-lg" style={{ marginRight: '8px', marginTop: sidebarVisible ? "" : "50px" }}></i>
                  <p className={`ms-3 mt-2 ${sidebarVisible ? '' : 'd-none'}`}>Deleted</p>
                </Link>
              </div>
        </div>
    </>
  )
}

export default Navbar