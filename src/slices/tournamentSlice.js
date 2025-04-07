import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tournaments: [],
    status: 'idle',
    error: null,
    currentTournament: {},
}

const tournamentsSlice = createSlice({

    name: 'tournaments',
    initialState: initialState,
    reducers: {
        
        setTournaments(state, action){
            state.tournaments = action.payload;
        },

        addTournament(state, action){
            state.tournaments = [...state.tournaments, action.payload];
        },

        setCurrentTournament(state, action){
            state.currentTournament = action.payload
        },

        setLoading(state){
            state.status = 'loading';
        },

        setError(state, action){
            state.status = 'failed';
            state.error = action.payload;
        },

        setIdle(state){
            state.status = 'idle';
        },

        clearStateTounraments(state){
            return initialState;
        }

    }
})

export const {setTournaments, addTournament, setCurrentTournament, clearStateTounraments, setLoading, setError, setIdle } = tournamentsSlice.actions;
export default tournamentsSlice.reducer;



