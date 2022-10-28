import { Button, TextField } from '@mui/material'
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
       <div className='card ' style={{textAlign:"center", marginTop:"100px", marginLeft:"100px"}}>
        <div className='card-body'>
        <h1>SignIn</h1>
        <form action="">
            <TextField id="outlined-basic" label="Email" variant="outlined" type="email" onChange={(e:any)=>{setEmail(e.target.value)}} style={{margin:"10px"}}/>
            <br />
            <TextField id="outlined-basic" label="Password" variant="outlined" type="password" onChange={(e:any)=>{setPassword(e.target.value)}} style={{margin:"10px"}}/>
            <br />
            <Button variant="contained" onClick={eventHandler}>Submit</Button>
        </form>
        </div>
    </div>
    </div>
  )
}

export default Signin
