//jshint esversion:10
const express = require('express');
const productRouter = express.Router();
productRouter.use(express.json());

class Product{
  constructor(title, price, url){
    this.title = title;
    this.price = price;
    this.url = url;

    this.id = undefined;
  }
}

class Api{
  constructor(){
    this.item_list = [];
    this.current_index = 0;
  }

  addItem(item){
    this.current_index++;
    item.id = this.current_index;
    this.item_list.push(item);
  }

  getAll(){
    return this.item_list;
  }
}

api = new Api();

const producto1 = new Product('Producto1', 23, 'url.com');

api.addItem(producto1);

productRouter.get('/', (req, res) =>{
  const content = JSON.stringify(api.getAll(), null, 2);
  res.type('json').send(content);
});

productRouter.get('/:id', (req, res) =>{
  const productRes = api.item_list.find( (product) => product.id == req.params.id);
  let result;

  if (productRes == undefined){
    result = ({'error': 'producto no encontrado'});
  }
  else{
    result = productRes;
  }

  const content = JSON.stringify(result, null, 2);
  res.type('json').send(content);
  console.log(productRes);
});


productRouter.delete('/:id', (req, res) =>{
  const productRes = api.item_list.findIndex( (product) => product.id == req.params.id);
  if(productRes >= 0){
    api.item_list.splice(productRes, 1);
    res.send('Producto eliminado.');
  }
  else{
    res.send({'error': 'producto no encontrado'});
  }
});

productRouter.put('/:id', (req, res) =>{
  const productRes = api.item_list.find( (product) => product.id == req.params.id);

  if(productRes == undefined){
    res.send({'error': 'producto no encontrado'});
  }
  else{
    productRes.title = req.body.title;
    productRes.price = req.body.price;
    productRes.url = req.body.url;
    res.send('Producto modificado.');
  }
});


productRouter.post('/', (req, res) =>{
  const title = req.body.title;
  const price = String(req.body.price);
  const url = req.body.url;

  if(title.length > 0 && price.length > 0 && url.length > 0){
    const newProduct = new Product(title, price, url);
    api.addItem(newProduct);
    res.send('Producto agregado.');
  }
  console.log('Se ha agregado un producto.');
});




module.exports = productRouter;
