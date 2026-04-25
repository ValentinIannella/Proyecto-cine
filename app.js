const express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Servir archivos estáticos desde la carpeta frontend sin caché para ver los cambios al instante
app.use(express.static(path.join(__dirname, 'frontend'), { maxAge: 0 }));

function cargarPeliculas() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'peliculas.json')));
}

// Endpoint 1
app.get('/peliculas', (req, res) => {
  const peliculas = cargarPeliculas();
  let resultado = [...peliculas];

  if (req.query.genero) {
    resultado = resultado.filter(p => p.genero === req.query.genero);
  }

  if (req.query.orden === 'asc') {
    resultado.sort((a, b) => a.anio - b.anio);
  }

  if (req.query.orden === 'desc') {
    resultado.sort((a, b) => b.anio - a.anio);
  }

  res.json(resultado);
});

// Endpoint 2
app.get('/peliculas/buscar', (req, res) => {
  const texto = req.query.titulo || '';
  const peliculas = cargarPeliculas();

  const resultado = peliculas.filter(p =>
    p.titulo.toLowerCase().includes(texto.toLowerCase())
  );

  res.json(resultado);
});

// Endpoint 3
app.get('/peliculas/externa', async (req, res) => {
  try {
    const response = await axios.get('https://api.tvmaze.com/shows');
    res.json(response.data.slice(0, 5));
  } catch {
    res.status(500).send('Error');
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});