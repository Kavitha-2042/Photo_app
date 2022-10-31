import { Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../Redux/Hooks'
import { initialize } from '../Redux/Slices/userSlice'

const Signup = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [conpassword, setConPassword] = useState("")

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const eventHandler = (e:any) =>{
        e.preventDefault();

        axios.post("/user/signup", {name,email, password, conpassword})
        .then((signupResponse)=>{
            if(signupResponse){
                localStorage.setItem("jwt-token", signupResponse.data.token)
                dispatch(initialize({user:signupResponse.data.user, auth:signupResponse.data.auth}))
                alert(signupResponse.data.message)
                navigate('/signin')
            }
        })
        .catch(err=>console.log(err))
    }

  return (
    <div className='card bg-gray-100 mx-auto max-w-5xl px-4 sm:px-5 lg:px-10 tw-width-full' style={{textAlign:"center", marginTop:"100px", marginLeft:"500px"}}>
        <div className='card-body mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32'>
        <h1 style={{fontSize:"30px"}}>SignUp</h1>
        <form action="">
            <TextField id="outlined-basic" label="Username" variant="outlined" type="name" onChange={(e:any)=>{setName(e.target.value)}} style={{margin:"10px"}}/>
            <br />
            <TextField id="outlined-basic" label="Email" variant="outlined" type="email" onChange={(e:any)=>{setEmail(e.target.value)}} style={{margin:"10px"}}/>
            <br />
            <TextField id="outlined-basic" label="Password" variant="outlined" type="password" onChange={(e:any)=>{setPassword(e.target.value)}} style={{margin:"10px"}}/>
            <br />
            <TextField id="outlined-basic" label="Confirm Password" variant="outlined" type="password" onChange={(e:any)=>{setConPassword(e.target.value)}} style={{margin:"10px"}}/>
            <br />
            <br />
            <Button variant="contained" onClick={eventHandler}>Submit</Button>
        </form>
        </div>
    </div>
  )
}

export default Signup