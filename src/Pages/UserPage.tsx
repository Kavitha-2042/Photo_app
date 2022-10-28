import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import axios from 'axios'
import React, {useState} from 'react'

const UserPage = () => {

    const [inputFile, setInputFile] = useState("")
    const [fileUpload, setFileUpload] = useState("")

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
            console.log("Result: ",result.data)
            setFileUpload(result.data.file)
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
          <Button  style={{color:"white"}}><a href="/allphotos">All Photos</a></Button>
          <Button  ><a href="/userpage">My Photos</a></Button>
          <Button  ><a href="/signout">Signout</a></Button>
        </Toolbar>
      </AppBar> 
    </Box>


    <div className='container' >
        <div className='row'>
            <form action="" style={{textAlign:'center'}}>
                <h1>File Uploads</h1>
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
    <img src={`http://localhost:5000/${fileUpload}`} alt='file' style={{maxWidth:"500px"}}/>
    </div>
  )
}

export default UserPage
