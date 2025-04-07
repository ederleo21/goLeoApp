import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    clubs: [],
    currentClub: null,
    status: 'idle',
    error: null
}

//Slice de club
const clubSlice = createSlice({
    name: 'clubs',
    initialState: initialState,
    reducers: {

        setClubs(state, action){
            state.clubs = action.payload
        },

        addClub(state, action){
            state.clubs = [...state.clubs, action.payload]
        },

        changeClub(state, action){
            const updatedClub = action.payload;
            state.clubs = state.clubs.map(club => 
                club.id === updatedClub.id ? updatedClub : club
            )
            if (state.currentClub && state.currentClub.id === updatedClub.id){
                state.currentClub = updatedClub;
            }
        },

        removeClub(state, action){
            state.clubs = state.clubs.filter(club => club.id !== action.payload)
        },

        setCurrentClub(state, action){
            state.currentClub = action.payload
        },

        setLoading(state, action){
            state.status = 'loading'
        },

        setError(state, action){
            state.status = 'failed';
            state.error = action.payload
        },

        setIdle(state){
            state.status = 'idle'
        },

        clearStateClubs(state){
            return initialState;
        }

    }
})

export const {setClubs, setCurrentClub, addClub, removeClub, changeClub, clearStateClubs, setLoading, setError, setIdle} = clubSlice.actions;
export default clubSlice.reducer




