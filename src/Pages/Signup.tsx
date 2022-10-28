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
    <div className='card ' style={{textAlign:"center", marginTop:"100px", marginLeft:"100px"}}>
        <div className='card-body'>
        <h1>SignUp</h1>
        <form action="">
            <TextField id="outlined-basic" label="Username" variant="outlined" type="name" onChange={(e:any)=>{setName(e.target.value)}} style={{margin:"10px"}}/>
            <br />
            <TextField id="outlined-basic" label="Email" variant="outlined" type="email" onChange={(e:any)=>{setEmail(e.target.value)}} style={{margin:"10px"}}/>
            <br />
            <TextField id="outlined-basic" label="Password" variant="outlined" type="password" onChange={(e:any)=>{setPassword(e.target.value)}} style={{margin:"10px"}}/>
            <br />
            <TextField id="outlined-basic" label="Confirm Password" variant="outlined" type="password" onChange={(e:any)=>{setConPassword(e.target.value)}} style={{margin:"10px"}}/>
            <br />
            <Button variant="contained" onClick={eventHandler}>Submit</Button>
        </form>
        </div>
    </div>
  )
}

export default Signup