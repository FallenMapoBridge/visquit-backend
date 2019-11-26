const express =require('express');

const app=require('../app.js');

// app.listen(process.env.PORT,()=>{
//   console.log('Working on port ${process.env.PORT}');
// });

app.listen(9000,()=>{
  console.log('Working on port 9000');
});



