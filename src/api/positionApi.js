import api from "../api";

//Obtener todos las posiciones
export const getPositions = async() => {
    try{
        const res = await api.get('/core/positions/')
        return res.data
    }catch(error){
        return error.message
    }
}




