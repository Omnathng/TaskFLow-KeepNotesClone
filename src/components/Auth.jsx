import React from 'react'
import { useState} from 'react'
import { Form } from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../Services/allAPI';
import logo from "../images/logo_transparent.png";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Auth({register}) {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const navigate = useNavigate()
    const [userData,setuserData] = useState({
        username:"",email:"",password:""
    })
    const isRegisterForm = register?true:false
    const handleRegister = async (e)=>{
        e.preventDefault()
        const {username,email,password} = userData
        if(!username || !email || !password){
            toast.info("please fill the form completely")
        }
        else{
            const result = await registerAPI(userData)
            console.log(result);
            if(result.status===200){
                toast.success(`${result.data.username} has registered successfully`)
                setuserData({
                    username:"",email:"",password:""
                })
                navigate('/')
            }
            else{
                toast.warning(result.response.data)
                console.log(result);
            }
        }
    }

    const handleLogin = async (e)=>{
        e.preventDefault()
        const {email,password} = userData
        if( !email || !password){
            toast.info("please fill the form completely")
        }
        else{
            const result = await loginAPI(userData)
            console.log(result);
            if(result.status===200){
                // toast.success(`${result.data.username} has registered successfully`)
                sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("token",result.data.token)
                setuserData({
                    email:"",password:""
                })
                navigate('/home')          
        }
        else{
            toast.warning(result.response.data)
                console.log(result);        
        }
    
    }}
  return (
    <div style={{width:'100%',height:'100vh'}} className='d-flex justify-content-center align-items-center'>
        <div className='w-75 container'>
            <div className='card shadow p-5 bg-teritiary'>
                <div className='row align-items center'>
                    <div className='col-lg-6'>
                        <img src="https://uxwing.com/wp-content/themes/uxwing/download/editing-user-action/new-registration-icon.png"className='rounded-start w-100' height={'100%'} alt="" />
                    </div>
                    <div className='col-lg-6'>
                        <div className='d-flex align-items-center flex-column'>
                            <h1 className='fw-bolder text-dark mt-2'><img className='ms-5 me-2' src={logo} alt="#" />TaskFlow</h1>
                            <h5 className='fw-bolder text-dark mt-2 pb-3'>
                                {
                                    isRegisterForm?'Sign in to your Account':'Sign up to your Account'
                                }
                            </h5>

                        <Form className='text-align w-100'>
                        {isRegisterForm && (
                            <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-username"
                                type="text"
                                placeholder="Enter username"
                                value={userData.username}
                                onChange={(e) => {setuserData({...userData, username: e.target.value});}}
                                startAdornment={<InputAdornment position="start">👤</InputAdornment>}
                                label="Username"
                            />
                            </FormControl>
                        )}
                        <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                            <OutlinedInput
                            id="outlined-adornment-email"
                            type="email"
                            placeholder="Enter Email ID"
                            value={userData.email}
                            onChange={(e) => {setuserData({...userData, email: e.target.value});}}
                            startAdornment={<InputAdornment position="start">✉️</InputAdornment>}
                            label="Email"
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter password"
                            value={userData.password}
                            onChange={(e) => {setuserData({...userData, password: e.target.value});}}
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            />
                        </FormControl>
                        {isRegisterForm ? (
                            <div>
                            <button onClick={handleRegister} className='btn btn-dark mb-2'>Register</button>
                            <p>Already have an account? Click here to<Link to={'/'}>Login</Link></p>
                            </div>
                        ) : (
                            <div>
                            <button onClick={handleLogin} className='btn btn-dark mt-5 mb-2'>Login</button>
                            <p>New user? Click here to<Link to={'/register'}>Register</Link></p>
                            </div>
                        )}
                        </Form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer position='top-right' autoClose={2000} theme='colored'/>
    </div>
  )
}

export default Auth