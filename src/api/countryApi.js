import api from "../api";

//Obtener todos los paises
export const getCountries = async() => {
    try{
        const res = await api.get('/core/countries/')
        return res.data
    }catch(error){
        return error.message
    }
}






