import axios from "axios";

const API_KEY = "apikey=py5IWdrL32q83G5SoXRjotu8XJJTFKD7";
const SEARCH_URL = 'https://app.ticketmaster.com/discovery/v2/events.json?size=10&&countryCode=US&' + API_KEY;
const DETAILS_BASE_URL = `https://app.ticketmaster.com/discovery/v2/events/`;

export const findEventsBySearchTerm = async (term) => {
    const URL = SEARCH_URL + "&keyword=" + term;
    const response = await axios.get(URL)
    return response.data;
}

export const findEventById = async (eventId) => {
    const URL = DETAILS_BASE_URL + eventId + ".json?" + API_KEY;
    const response = await axios.get(URL)
    return response.data
}