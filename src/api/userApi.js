import api from "../api";

// Obtener informacion de usuario autenticado
export const GetUser = async() => {
    try{
        const res = await api.get("/profile/")
        return res.data
    }catch(error){
        console.error("Error al obtener usuario")
        throw error
    }
}












