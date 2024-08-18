const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Importa el paquete cors

const app = express();
const PORT = process.env.PORT || 3001;

// Configura CORS
app.use(cors()); // Permite solicitudes desde cualquier origen

// Middleware para parsear JSON
app.use(express.json());

// Endpoint para obtener el store
app.get('/api/store', (req, res) => {
    const filePath = path.join(__dirname, 'dataJuego.json');

    fs.access(filePath, fs.constants.R_OK, (err) => {
        if (err) {

            return res.status(500).json({ error: `No se puede leer el archivo ${err}` });
        } else {
            console.log('El archivo tiene permisos de lectura.');
        }
    });

    fs.readFile(filePath, 'utf8', (err, data) => {
        console.log('Intentando leer el archivo en la ruta:', filePath); // Mensaje de depuración
        if (err) {
            console.error('Error al leer el archivo:', err); // Mensaje de error detallado
            return res.status(500).json({ error: `Error al leer el archivo dataJuego.json ${err}` });
        }

        try {
            const parsedData = JSON.parse(data);
            res.status(200).json(parsedData);
        } catch (parseError) {
            res.status(500).json({ error: `Error al parsear el archivo JSON ${parsedData}`});
        }
    });
});


// Endpoint para guardar el store
app.post('/api/store', (req, res) => {
    const jsonData = JSON.stringify(req.body, null, 2);
    fs.writeFile(path.join(__dirname, 'dataJuego.json'), jsonData, 'utf8', (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al guardar el archivo JSON' });
        }
        res.json({ message: 'Datos del juego guardados exitosamente' });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
