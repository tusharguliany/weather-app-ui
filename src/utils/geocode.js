const request = require('postman-request');
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZ3VsaWFueSIsImEiOiJjazludjZpdmgwNXd4M21taHN3ZjBobjFvIn0.N9Rzgk8opD_b3KOnraWE0Q&limit=1`;
    request ({url, json: true}, (err, { body } = {}) => {
        if (err) {
            callback(`Unable to connect to Location services.`, undefined);
        } else if (body.message) {
            callback(`${body.message}`, undefined);
        } else if (body.features.length === 0) {
            callback(`No Locations found with registered Address. Try other search.`, undefined);
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude:  body.features[0].center[1],
                placeName: body.features[0].place_name
            });
        }
    });
}

module.exports = {
    geocode: geocode
}