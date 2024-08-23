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

// Endpoint para obtener los datos del juego
app.get('/api/datosDelJuego', (req, res) => {
    const filePath = path.join(__dirname, 'dataJuego.json');

    // Verifica los permisos de lectura antes de intentar leer el archivo
    fs.access(filePath, fs.constants.R_OK, (err) => {
        if (err) {
            console.error(`No se puede leer el archivo: ${err}`);
            return res.status(500).json({ error: `No se puede leer el archivo: ${err.message}` });
        }

        console.log('El archivo tiene permisos de lectura.');

        // Si se pueden leer los permisos, intenta leer el archivo
        fs.readFile(filePath, 'utf8', (err, data) => {
            console.log('Intentando leer el archivo en la ruta:', filePath); // Mensaje de depuración
            if (err) {
                console.error('Error al leer el archivo:', err); // Mensaje de error detallado
                return res.status(500).json({ error: `Error al leer el archivo dataJuego.json: ${err.message}` });
            }

            try {
                const parsedData = JSON.parse(data);
                res.status(200).json(parsedData);
            } catch (parseError) {
                console.error('Error al parsear el archivo JSON:', parseError); // Mensaje de error detallado
                return res.status(500).json({ error: `Error al parsear el archivo JSON: ${parseError.message}` });
            }
        });
    });
});
// Endpoint para obtener los marcadores
app.get('/api/marcadores', (req, res) => {
    const filePath = path.join(__dirname, 'marcadores.json');

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
            res.status(500).json({ error: `Error al parsear el archivo JSON ${parsedData}` });
        }
    });
});


// Endpoint para guardar los datos del juego
app.post('/api/datosDelJuego', (req, res) => {
    const jsonData = JSON.stringify(req.body, null, 2);
    fs.writeFile(path.join(__dirname, 'dataJuego.json'), jsonData, 'utf8', (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al guardar el archivo JSON' });
        }
        res.json({ message: 'Datos del juego guardados exitosamente' });
    });
});
// Endpoint para guardar los marcadores
app.post('/api/marcadores', (req, res) => {
    const jsonData = JSON.stringify(req.body, null, 2);
    fs.writeFile(path.join(__dirname, 'marcadores.json'), jsonData, 'utf8', (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al guardar el archivo JSON' });
        }
        res.json({ message: 'Marcadores guardados exitosamente' });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
