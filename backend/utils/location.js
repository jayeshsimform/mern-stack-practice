// const axios = require('axios');

const API_KEY = '';

async function getCoordsForAddress(address) {
    // const response = await axios.get(
    //     `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    //         address
    //     )}&key=${API_KEY}`
    // );

    // const data = response.data;
    // if (!data || data.status === 'ZERO_RESULTS') {
    //     const error = new HttpError(
    //         'Could not find location for the specified address.',
    //         422
    //     );
    //     throw error;
    // }

    // const coordinates = data.results[0].geometry.location;

    // return coordinates;
    return {
        lat: 40.7484405,
        lng: -73.9878531
    }
}
module.exports = getCoordsForAddress;