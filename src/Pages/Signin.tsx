import { Button, TextField } from '@mui/material'
import '../index.css'
import axios from 'axios'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../Redux/Hooks'
import { initialize } from '../Redux/Slices/userSlice'

const Signin = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const eventHandler = (e:any) =>{
        e.preventDefault()

        axios.post("/user/signin", {email, password})
        .then((signinResponse)=>{
            if(signinResponse.data.auth === true){
                localStorage.setItem("jwt-token", signinResponse.data.token)
                dispatch(initialize({user:signinResponse.data.user, auth:signinResponse.data.auth}))
                navigate('/userpage')
            }
            alert(signinResponse.data.message)
        })
        .catch(err=>console.log(err))
    }

  return (
    <div>
       <div className=' card bg-gray-100 mx-auto max-w-5xl px-4 sm:px-5 lg:px-10 tw-width-full' style={{textAlign:"center", marginTop:"100px", marginLeft:"500px"}}>
        <div className='card-body mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32'>
        <h1 style={{fontSize:"30px"}}>SignIn</h1>
        <form action="">
            <TextField id="outlined-basic" label="Email" variant="outlined" type="email" onChange={(e:any)=>{setEmail(e.target.value)}} style={{margin:"10px"}}/>
            <br />
            <TextField id="outlined-basic" label="Password" variant="outlined" type="password" onChange={(e:any)=>{setPassword(e.target.value)}} style={{margin:"10px"}}/>
            <br />
            <br />
            <Button variant="contained" onClick={eventHandler}>Submit</Button>
        </form>
        </div>
    </div>
    </div>
  )
}

export default Signin
