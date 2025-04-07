import api from "../api";
import {
  setTournaments,
  addTournament,
  setCurrentTournament,
  setLoading,
  setError,
  setIdle,
} from "../slices/tournamentSlice";

//Obtener torneos
export const getTournaments = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const res = await api.get("/tournaments/tournaments/");
    dispatch(setTournaments(res.data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setIdle());
  }
};

//Obtener torneo especifico
export const getTournament = (id, type) => async (dispatch) => {
  dispatch(setLoading());
  try {
    if (type === "LEAGUE") {
      var res = await api.get(`tournaments/league/${id}/`);
    } else if (type === "CUP") {
      var res = await api.get(`tournaments/cup/${id}/`);
    } else if (type === "FRIENDLY"){
      var res = await api.get(`/tournaments/tournaments/?id=${id}`)
    }

    if(type === "FRIENDLY"){
      dispatch(setCurrentTournament(res.data[0]));
    }else{
      dispatch(setCurrentTournament(res.data));
    }
    
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setIdle());
  }
};

//Crear torneo
export const createTournament = (full_data) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const res = await api.post("/tournaments/tournament/create/", full_data);
    dispatch(addTournament(res.data));
    return res.data;
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setIdle());
  }
};
