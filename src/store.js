import { configureStore } from '@reduxjs/toolkit';
import clubSlice from './slices/clubSlice';
import playerSlice from './slices/playerSlice';
import tournamentsSlice from './slices/tournamentSlice';

const store = configureStore({

    reducer: {
        clubs: clubSlice,
        players: playerSlice,
        tournaments: tournamentsSlice
    }   
    
})

export default store

