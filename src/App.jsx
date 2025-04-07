import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import { Layout } from './components/Layout'
import { UserProvider } from './context/userContext'
import { PermissionRoute } from './components/security/PermissionRoute'
import { Clubs } from './pages/PagesProtected/Clubs'
import store from './store'
import { Provider } from 'react-redux'
import { ClubForm } from './components/clubs/ClubForm'
import { Club } from './pages/PagesProtected/Club'
import { Players } from './pages/PagesProtected/Players'
import { PlayerForm } from './components/players/PlayerForm'
import { Player } from './pages/PagesProtected/Player'
import { Tournaments } from './pages/PagesProtected/Tournaments'
import { Performances } from './pages/PagesProtected/Performances'
import { TournamentsForm } from './components/tournaments/TournamentsForm'
import { TournamentLeague } from './pages/PagesProtected/TournamentLeague'
import { TournamentCup } from './pages/PagesProtected/TournamentCup'
import { TournamentMatchStatistics } from './pages/PagesProtected/TournamentMatchStatistics'
import { TournamentPerformances } from './pages/PagesProtected/TournamentPerformances'
import { MatchPerformances } from './pages/PagesProtected/MatchPerformances'
import { TournamentFriendly } from './pages/PagesProtected/TournamentFriendly'
import { User } from './pages/PagesProtected/User'

function Logout(){ 
  localStorage.clear()
  return <Navigate to="/login"/>
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register/>
}

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/register" element={<RegisterAndLogout/>}/>
        <Route path='*' element={<NotFound/>}/>

        {/* Rutas protegidas, despues de login */}
          <Route path='/' element={<ProtectedRoute><UserProvider><Provider store={store}><Layout/></Provider></UserProvider></ProtectedRoute>}>
            
              <Route index element={<Home/>} />
              <Route path='user' element={<User/>} />

              {/* RUTAS DE CLUB */}
              <Route path="clubs" element={<Clubs />} />
            
              <Route element={<PermissionRoute requiredPermissions={['add_club']}/>}>  
                <Route path='clubs/create' element={<ClubForm/>} />
              </Route>

              {/* Ruta protegida por permiso view_club*/}
              <Route element={<PermissionRoute requiredPermissions={['view_club']}/>}>
                <Route path='clubs/club/:id' element={<Club/>}/>

                <Route Route element={<PermissionRoute requiredPermissions={['change_club']} />}>
                  <Route path='clubs/club/:id/update' element={<ClubForm isUpdating={true}/>} />
                </Route>
              </Route>

              {/* RUTAS DE PLAYERS */}
              <Route path='players' element={<Players/>}/>

              <Route  element={<PermissionRoute requiredPermissions={['add_player']} />}>
                <Route path='players/create' element={<PlayerForm/>}/>
              </Route>
              
              {/* Rutas portegidas con permiso view_player en players */}
              <Route element={<PermissionRoute requiredPermissions={['view_player']} />}>
                <Route path='players/player/:id' element={<Player/>}/>
              </Route>

              {/* RUTAS DE TORNEOS */}
              <Route path='tournaments' element={<Tournaments/>} />

              <Route element={<PermissionRoute requiredPermissions={['add_tournament']} />}>
                  <Route path='tournaments/create' element={<TournamentsForm/>} />
              </Route>

              <Route element={<PermissionRoute requiredPermissions={['view_tournament']} />}>
                {/* PAGINAS INDIVIDULES DE TORNEO */}
                <Route path='tournaments/league/:id' element={<TournamentLeague/>}/>
                <Route path='tournaments/cup/:id' element={<TournamentCup/>}/>
                <Route path='tournaments/friendly/:id' element={<TournamentFriendly/>}/>

                {/* PARA REGISTRO */}
                <Route element={<PermissionRoute requiredPermissions={['add_match']} />} >
                  <Route path='tournaments/match/:match_id' element={<TournamentMatchStatistics/>}/> 
                </Route>
                {/* PARA ACTUALIZACION */}
                <Route path='tournaments/update/match/:id' element={<MatchPerformances/>}/>

              </Route>

              {/* RUTAS DE ESTADISTICAS */}
              <Route path='performances' element={<Performances/>} />
              
              <Route element={<PermissionRoute requiredPermissions={['view_tournament']} />}>
                <Route path='performances/tournament/:id' element={<TournamentPerformances/>}/>
                <Route path='performances/match/:id' element={<MatchPerformances/>}/>
              </Route>

          </Route>
        
      </Routes>
    </BrowserRouter>
  )
} 
