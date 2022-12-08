const express  = require('express');
const app = express();
const port = 4000; /* en el 4000 par aque no entre en conflicto con react*/

const {logErrors, errorHandler} = require('./middlewares/error.handler');
const faker =require('faker');

app.use(express.json());
const routerApi = require('./router');


app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

routerApi(app);

app.use(logErrors);
app.use(errorHandler);

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy un nueva ruta');
});

app.get('/users', (req, res) =>{
  const {limit, offset} =req.query;
  if (limit && offset){
    res.json({
      limit,
      offset
    });
  }
  else{
    res.send ("No hay parametros");
  }
});


app.get('/categorias/:categoriaId/productos/:productosId', (req, res) =>{
  const { categoriaId, productosId} =req.params;
  res.json({
    categoriaId,
    productosId,
  });
});



app.listen(port, () =>{
  console.log('mi port' + port);
});

