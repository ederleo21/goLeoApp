import api from "../api";
import { setPlayers, setCurrentPlayer, addPlayer, removePlayer, updatePlayerPersonal, updatePlayerSkills, setError, setLoading, setIdle } from "../slices/playerSlice";

//Obtener jugadores, opcionalmente filtrados por club
export const getAllPlayers = (clubId) => async(dispatch) => {
    if (!clubId) return; // Si no hay club seleccionado, no hacer nada

    dispatch(setLoading());
    try {
        const url = `/core/players/?club=${clubId}`;
        const res = await api.get(url);
        dispatch(setPlayers(res.data));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setIdle());
    }
}

//Traer un jugador especifico
export const getPlayerById = (playerId) => async(dispatch) =>{
    dispatch(setLoading());

    try{
        const res = await api.get(`/core/players/${playerId}/`);
        dispatch(setCurrentPlayer(res.data))
    }catch(error){
        dispatch(setError(error.message))
    }finally{
        dispatch(setIdle())
    }
}

//Añadir un jugador
export const createPlayer = (playerData) => async(dispatch) => {
    dispatch(setLoading())

    try{
        const res = await api.post('/core/players/create/', playerData)
        dispatch(addPlayer(res.data))
        return res.data
    }catch(error){
        dispatch(setError(error.message))
    }finally{
        dispatch(setIdle())
    }
} 

//Añadir habilidades
export const createSkills = (skills) => async(dispatch) => {
    dispatch(setLoading())
    try{
        const res = await api.post('/core/skills/create/', skills)
        return res.data
    }catch(error){
        dispatch(setError(error.message))
    }finally{
        dispatch(setIdle())
    }
}

//Actualizar datos personales de jugador
export const updatePlayerPersonalData = (id, personalData) => async(dispatch) => {

    dispatch(setLoading());

    try{
        const res = await api.put(`/core/players/${id}/update/`, personalData)
        dispatch(updatePlayerPersonal({id, personalData: res.data}));
        return res.data
    }catch(error){
        dispatch(setError(error.message))
    }finally{
        dispatch(setIdle())
    }
}

//Actualizar habilidades de jugador
export const updatePlayerSkillsData = (id, skills) => async(dispatch) => {

    dispatch(setLoading());

    try{
        const res = await api.put(`/core/skills/${id}/update/`, skills);
        dispatch(updatePlayerSkills({ id, skills: res.data }));
        return res.data
    }catch(error){
        dispatch(setError(error.message));
    }finally{
        dispatch(setIdle())
    }
}

export const deletePlayer = (id) => async(dispatch) => {

    dispatch(setLoading());

    try{
        await api.delete(`/core/players/${id}/delete/`);
        dispatch(removePlayer(id));
    }catch(error){
        dispatch(setError(error.message));
    }finally{
        dispatch(setIdle());
    }
}






