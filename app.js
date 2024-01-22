const express = require('express');
const path = require('path');
const app = express();

// Définition du moteur de template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get(['/', '/index'], (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/image', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/image.html'));
});

app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/form.html'));
});

app.get('/student/:id', (req, res) => {
    const { id } = req.params;
    const name = req.query.name || 'Unknown';
    res.render('student', { id, name });
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).send('404: Page not found');
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
