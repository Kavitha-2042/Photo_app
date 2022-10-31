import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'

import axios from 'axios'
import React, {useState} from 'react'

//import { initialize } from '../Redux/Slices/imageSlice' 
import { useNavigate } from 'react-router-dom';

const UserPage = () => {

    const [inputFile, setInputFile] = useState("")
    const [fileUpload, setFileUpload] = useState("")

    const navigate = useNavigate()

    const formData = new FormData()
    formData.append('image', inputFile)

    const formHandler = (e:any) =>{
        console.log("FormHandler: ", e.target.files[0])
        setInputFile(e.target.files[0])
    }

    const eventHandler = (e:any) =>{
        e.preventDefault();


        axios.post('/user/imageupload', formData)
        .then((result)=>{
            console.log("Result: ",result.data.file)
            if(result){
              setFileUpload(result.data.file)
              navigate('/allphotos')
            }
            alert(result.data.message)
        })
        .catch(err=>console.log(err))

    }

    
  return (

  <div>

      

        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          
            <a href='/'> 
            Home
            </a>
            
          </Typography>
          <Button  style={{color:"white"}}><a href="/userpage">Upload</a></Button>
          <Button  style={{color:"white"}}><a href="/allphotos">All Photos</a></Button>
          <Button  style={{color:"white"}}><a href="/myphotos">My Photos</a></Button>
          <Button  style={{color:"white"}}><a href="/signout">Signout</a></Button>
        </Toolbar>
      </AppBar> 
    </Box>


    <div className='container' >
        <div className='row'>
            <form action="" style={{textAlign:'center'}}>
                <h1 style={{textAlign:"center", marginTop:"20px", fontSize:"30px"}}>File Uploads</h1>
                <br />
                <div className='form-group' >
                    <input type="file" multiple  style={{fontSize:"15px"}} onChange={formHandler} />
                </div>
                <br />
                <div className='form-group'>
                <Button variant="contained" onClick={eventHandler}>Upload</Button>
                </div>
            </form>
            
        </div>
    </div>
    
        {
      (fileUpload)?<img src={`http://localhost:5000/${fileUpload}`} alt='' style={{maxWidth:"500px"}}/>
      
      :<></>
    }
    {/* <img src={`http://localhost:5000/${fileUpload}`} alt='' style={{maxWidth:"500px"}}/> */}
    

    </div>
  )
}

export default UserPage
