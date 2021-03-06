//jshint esversion:10


const express = require('express');
const productRouter = require('./productos.js');


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));




app.use('/api/productos', productRouter);


const port = 8080;

app.listen(port, ()=>{
  console.log(`Server started on port ${port}`);
});
