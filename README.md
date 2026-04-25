# 🎬 Proyecto Cine

Aplicación web de películas desarrollada en Node.js. Permite listar, buscar y filtrar películas desde un archivo JSON local, y también expone un endpoint que consume una API externa de series de TV.

---

## 🛠️ Tecnologías utilizadas

- **Node.js** con **Express** — servidor y API REST
- **JavaScript** — tanto en el backend como en el frontend
- **Axios** — para el consumo de la API externa
- **CORS** — para permitir las solicitudes desde el frontend
- **HTML + CSS** — interfaz de usuario

---

## 📁 Estructura del proyecto

```
Proyecto-cine/
├── data/
│   └── peliculas.json      # Datos locales de películas
├── frontend/
│   ├── index.html          # Interfaz de usuario
│   └── style.css           # Estilos
├── app.js                  # Servidor Express y endpoints
├── package-lock.json
├── package.json
└── README.md
```

---

## 🚀 Cómo ejecutar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/valentiniannella/Proyecto-cine.git
cd Proyecto-cine
```

### 2. Instalar las dependencias

```bash
npm install
```

### 3. Iniciar el servidor

```bash
node app.js
```

El servidor quedará corriendo en `http://localhost:3000`.

### 4. Abrir el frontend

Abrí tu navegador y entrá a:

```
http://localhost:3000
```

Las películas no se cargan automáticamente. Para verlas, hacé clic en **"Mostrar todas"**, o escribí un título en el buscador y hacé clic en **"Buscar"**.

---

## 📡 Endpoints disponibles

### `GET /peliculas`
Devuelve el listado completo de películas. Acepta los siguientes query params opcionales:

| Parámetro | Descripción | Ejemplo |
|-----------|-------------|---------|
| `genero` | Filtra por género exacto | `?genero=Sci-Fi` |
| `orden` | Ordena por año (`asc` o `desc`) | `?orden=asc` |

**Ejemplos:**
```
GET http://localhost:3000/peliculas
GET http://localhost:3000/peliculas?genero=Romance
GET http://localhost:3000/peliculas?orden=desc
GET http://localhost:3000/peliculas?genero=Sci-Fi&orden=asc
```

---

### `GET /peliculas/buscar`
Busca películas cuyo título contenga el texto indicado (no distingue mayúsculas/minúsculas).

| Parámetro | Descripción | Ejemplo |
|-----------|-------------|---------|
| `titulo` | Texto a buscar en el título | `?titulo=inter` |

**Ejemplo:**
```
GET http://localhost:3000/peliculas/buscar?titulo=inception
```

---

### `GET /peliculas/externa`
Consulta la API pública de [TVMaze](https://www.tvmaze.com/api) y devuelve las primeras 5 series disponibles.

**Ejemplo:**
```
GET http://localhost:3000/peliculas/externa
```

---

## 📄 Datos locales

Las películas se encuentran en `data/peliculas.json`. Cada película tiene la siguiente estructura:

```json
{
  "id": 1,
  "titulo": "Inception",
  "genero": "Sci-Fi",
  "anio": 2010,
  "descripcion": "Descripción de la película..."
}
```

---

## 🌐 API externa utilizada

Se consume la API pública de **TVMaze**:
- Endpoint: `https://api.tvmaze.com/shows`
- No requiere autenticación
- Documentación: https://www.tvmaze.com/api
