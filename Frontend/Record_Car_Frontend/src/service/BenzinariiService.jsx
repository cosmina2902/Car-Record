import axios from 'axios';

export const getBenzinarii = async (oras) => {
    try {
        const geocodeUrl = `http://localhost:8080/benzinarii/geocode/${oras}`;
        const geocodeResponse = await axios.get(geocodeUrl);

        if (geocodeResponse.data.results.length > 0) {
            const location = geocodeResponse.data.results[0].geometry.location;
            const placesUrl = `http://localhost:8080/benzinarii/places?lat=${location.lat}&lng=${location.lng}`;
            const placesResponse = await axios.get(placesUrl);
            
            return placesResponse.data.results.map(place => ({
                id: place.place_id,
                nume: place.name,
                latitudine: place.geometry.location.lat,
                longitudine: place.geometry.location.lng
            }));
        } else {
            throw new Error('No results found');
        }
    } catch (error) {
        console.error("Error fetching benzinarii: ", error);
        throw error;
    }
};
