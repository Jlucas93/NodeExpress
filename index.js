const express = require('express');

const app = express();

const usuarios = [
  {
    Nome: 'Lucas',
    sobrenome: 'Andrade',
  },
  {
    Nome: 'joão',
    sobrenome: 'Nascimento',
  },
];
//Definindo porta do servidor
app.listen(3031, () => {
  console.log('Rodando on 3031');
});

//Traduzindo conteudo para do JSON
app.use(express.json());

//Metodo GET
app.get('/', (req, res) => {
  return res.send('Pagina Home');
});

app.get('/usuarios', (req, res) => {
  return res.json(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
  console.log(req.params);
  const {id} = req.params;
  return res.json(usuarios[id]);
});

//Metodo POST
app.post('/usuarios/', (req, res) => {
  const {Nome, sobrenome} = req.body;
  const usuario = {Nome, sobrenome};

  usuarios.push(usuario);

  return res.json(usuario);
});

//Metodo PUT
app.put('/usuarios/:id', (req, res) => {
  const {id} = req.params;
  const {Nome, sobrenome} = req.body;

  usuarios[id] = {Nome, sobrenome};

  if (id < 0) {
    return res.status(404).json({error: 'Usuario não existe'});
  }
  return res.json(usuarios[id]);
});

//Metodo DELETE
app.delete('/usuarios/:id', (req, res) => {
  const {id} = req.params;
  usuarios.splice(id, 1);

  return res.json(usuarios);
});
