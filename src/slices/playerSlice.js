import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    players: [],
    status: 'idle',
    error: null,
    currentPlayer: null,
    selectedClub: null
}

const playersSlice = createSlice({
    name: 'players',
    initialState: initialState,
    reducers: {

        setPlayers(state, action){
            state.players = action.payload
        },

        addPlayer(state, action){
            state.players = [...state.players, action.payload]
        },

        removePlayer(state, action){
            state.players = state.players.filter(player => player.id !== action.payload)
        },

        setSelectedClub(state, action){
            state.selectedClub = action.payload
        },

        setCurrentPlayer(state, action){
            state.currentPlayer = action.payload
        },
        
        updatePlayerPersonal(state, action){
            const { id, personalData } = action.payload;
            const playerIndex = state.players.findIndex(player => player.id === id);
            
            if(playerIndex !== -1){
                state.players[playerIndex] = {
                    ...state.players[playerIndex],
                    ...personalData,
                }
            }
        },

        updatePlayerSkills(state, action){
            const { id, skills } = action.payload;
            const playerIndex = state.players.findIndex(player => player.id === id)

            if(playerIndex !== -1){
                state.players[playerIndex].skills = {
                    ...state.players[playerIndex].skills,
                    ...skills,
                }
            }  
        },

        setLoading(state){
            state.status = 'loading'
        },
        
        setError(state, action){
            state.status = 'failed';
            state.error = action.payload
        },
        
        setIdle(state){
            state.status = 'idle'
        },

        clearStatePlayers(state){
            return initialState;
        }

    }
})

export const { setPlayers, addPlayer, removePlayer, setCurrentPlayer, setLoading, setError, setIdle, setSelectedClub, updatePlayerPersonal, updatePlayerSkills, clearStatePlayers} = playersSlice.actions;
export default playersSlice.reducer











