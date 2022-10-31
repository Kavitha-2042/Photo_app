import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'

const MyPhotos = () => {

    const [myPhotos, setMyPhotos] = useState([])

    useEffect(() => {
           axios.get('/user/myphotos') 
           .then((myResponse)=>{
            if(myResponse.data.auth === true){
                setMyPhotos(myResponse.data.file)
                console.log("myResponse: ", myResponse.data.file)
                console.log("EMail: ", myResponse.data.email)
            }
                
           })
           .catch(err=>console.log(err))
    }, []);

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
    
<div>
    <div className="bg-gray-100 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 tw-width-full">
    <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
    <h1 className="text-3xl font-bold text-gray-900 justify-items-center" style={{textAlign:"center", marginTop:"-90px", marginBottom:"30px"}}>My Images</h1>

    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
      {myPhotos.map(( val:any) => (
        <img src={`http://localhost:5000/${val.image}`} alt="file" key={val._id} style={{maxWidth:"300px"}}/>
      ))}
      
    </div>
    </div>
    </div>
    </div>
    </div>
    
  );
};
   
export default MyPhotos