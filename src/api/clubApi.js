import api from "../api";
import { setClubs, setCurrentClub, addClub, removeClub, changeClub, setError, setIdle, setLoading } from "../slices/clubSlice"; 

// Devuelve todos los clubes 
export const getClubs = () => async(dispatch) => {
    dispatch(setLoading())
    try{
        const res = await api.get('/core/clubs/')
        dispatch(setClubs(res.data))
    }catch(error){
        dispatch(setError(error.message));
    }finally{
        dispatch(setIdle())
    }
}

//Devuelve un club por el id
export const getClubByid = (id) => async(dispatch) => {
    dispatch(setLoading())
    try{
        const res = await api.get(`core/clubs/${id}/`)
        dispatch(setCurrentClub(res.data))
    }catch(error){
        dispatch(setError(error.message))
    }finally{
        dispatch(setIdle())
    }
}

//Envia un objeto por post para crear un club
export const createClub = (clubData) => async(dispatch) => {
    dispatch(setLoading())
    try{
        const res = await api.post('/core/clubs/create/', clubData);
        dispatch(addClub(res.data));
    }catch(error){
        dispatch(setError(error.message))
    }finally{
        dispatch(setIdle())
    }
}

//Actualiza un club por el id
export const updateClub = (id, clubData) => async(dispatch) => {
    dispatch(setLoading())
    try{
        const res = await api.put(`/core/clubs/${id}/update/`, clubData)
        dispatch(changeClub(res.data))
    }catch(error){  
        dispatch(setError(error.message))
    }finally{
        dispatch(setIdle())
    }
}

//Borra un club por el id
export const deleteClub = (id) => async(dispatch) => {
    dispatch(setLoading());
    try{
        const res = await api.delete(`/core/clubs/${id}/delete/`);
        dispatch(removeClub(id))
    }catch(error){
        dispatch(setError(error.message))
    }finally{
        dispatch(setIdle())
    }
}




