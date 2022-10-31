import { AppBar, Box, Button,Toolbar, Typography } from '@mui/material'
import React from 'react'



const Home = () => {
  return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
         
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <a href='/'> 
            Home
            </a>
            
          </Typography>
          <Button  style={{color:"white"}}><a href="/signup">Signup</a></Button>
          <Button  style={{color:"white"}}><a href="/signin">Signin</a></Button>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default Home
