const express = require('express');

const app = express();

app.use(express.static(__dirname, { dotfiles: 'allow' }));
app.use(express.static('../frontend/dist/pokemon-tera-types'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', { root: '../frontend/dist/pokemon-tera-types/' }),
);

app.listen(process.env.PORT || 8080, () => {
    console.log('Server running...');
});