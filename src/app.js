const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const { forecast } = require('./utils/forecast');
const { geocode } = require('./utils/geocode');
const chalkUtils = require('./utils/chalkUtil');
const port = process.env.PORT || 3000;

// defines paths for express configs
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(publicDirectoryPath, '/templates/views');
const partialsPath = path.join(publicDirectoryPath, '/templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to use
app.use(express.static((publicDirectoryPath)));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Tushar Arora'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Tushar Arora'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Tushar Arora'
    })
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Article Not Found',
        errorMessage: 'Help Article not Found.' ,
        name: 'Tushar Arora'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        console.log(chalkUtils.error('Weather called without Address.'));
        return res.send({
            error: 'You need to provide an address to get location data.'
        });
    }
    geocode(req.query.address, (err, {longitude, latitude, placeName} = {}) => {
        if (err) {
            console.log(chalkUtils.error(err));
            return res.send({
                error: err
            });
        } else {
            forecast(longitude,latitude, (err, {timezone, weather, temperature, feelslike} = {}) => {
                if (err) {
                    console.log(chalkUtils.error(err));
                    return res.send({
                        error: err
                    });
                } else {
                    console.log(`Place : ${chalkUtils.success.inverse(placeName)}`);
                    console.log(`Time Zone : ${chalkUtils.success.inverse(timezone)}`);
                    console.log(`Weather : ${chalkUtils.success.inverse(weather)}`);
                    console.log(`Temperature : ${chalkUtils.success.inverse(temperature)}`);
                    console.log(`Feels Like : ${chalkUtils.success.inverse(feelslike)}`);
                    res.send({
                        placeName,
                        timezone, 
                        weather,
                        temperature,
                        feelslike,
                        address: req.query.address
                    });
                }
            });
        }
    });
});

app.get('/products', (req, res) => {
    res.send({
        products: []
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Page Not Found',
        errorMessage: 'Page not Found.',
        name: 'Tushar Arora'
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});