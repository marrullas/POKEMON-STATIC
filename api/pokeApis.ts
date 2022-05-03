import axios from "axios";


const pokeApi = axios.create({
    baseURL: "http://pokeapi.co/api/v2"

});


export default pokeApi;