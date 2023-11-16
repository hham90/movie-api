const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path');

const app = express();

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

app.use(morgan('combined', {stream: accessLogStream}));

let topTenMovies = [
    {
        title: 'Forrest Gump',
        starring: 'Tom Hanks, Gary Sinise'
    },
    {
        title: 'Aladdin',
        starring: 'Robin Williams, Scott Weinger, Linda Larkin'
    },
    {
        title: 'The Matrix',
        starring: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss'
    },
    {
        title: 'Edward Scissorhands',
        starring: 'Johnny Depp, Winona Ryder'
    },
    {
        title: 'Rush Hour',
        starring: 'Jackie Chan, Chris Tucker'
    },
    {
        title: 'The Equalizer',
        starring: 'Denzel Washington'
    },
    {
        title: 'Bad Boys',
        starring: 'Will Smith, Martin Lawrence'
    },
    {
        title: 'Space Balls',
        starring: 'Rick Moranis, Daphne Zuniga, John Candy'
    },
    {
        title: 'Kingsman: The Secret Service',
        starring: 'Colin Firth, Michael Caine, Taron Egerton, Samuel L. Jackson'
    },
    {
        title: 'A Bronx Tale',
        starring: 'Chazz Palminteri, Robert De Niro, Lillo Brancato'
    }
]

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Welcome to my Top Movies');
});

app.get('/movies', (req, res) => {
    res.json(topTenMovies);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3000, () => {
    console.log('Port: 3000');
});
