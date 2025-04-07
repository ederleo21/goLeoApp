import React, { useState, useContext } from 'react'
import { ModalSelectPlayers } from '../tournaments/ModalSelectPlayers';
import api from '../../api';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify'
import { MatchCreateFormModal } from './tournamentFriendly/MatchCreateFormModal';
import { UserContext } from '../../context/userContext';

export const MatchCard = ({ match: currentMatch, isFiltered=false, tournament }) => {
  const [match, setMatch] = useState(currentMatch)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdate, setIsModalUpdate] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState({});
  const [playersHomeTeam, setPlayersHomeTeam] = useState([]);
  const [playersAwayTeam, setPlayersAwayTeam] = useState([]);
  const [loadingPlayers, setLoadingPlayers] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext);
  
  const fetchPlayers = async(match) => {
    setLoadingPlayers(true);
    try{
        const [resHomeTeam, resAwayTeam] = await Promise.all([
            api.get(`/core/players/?club=${match.home_team}&active=true`),
            api.get(`/core/players/?club=${match.away_team}&active=true`),
          ]);
          setPlayersHomeTeam(resHomeTeam.data);
          setPlayersAwayTeam(resAwayTeam.data);
    }catch(error){
        toast.error("Error al obtener los jugadores: ", error)
    }finally{
        setLoadingPlayers(false);
    }
  };

  const handleButtonClick = (match) => {
    if (match.state === "WAITING") {
      setSelectedMatch(match);
      setIsModalOpen(true);
      fetchPlayers(match);
    } else if (match.state === "IN_PROGRESS") {
      navigate(`/tournaments/match/${match.id}`);
    } else if (match.state === "COMPLETED") {
      if(location.pathname.includes("tournaments")){
        navigate(`/tournaments/update/match/${match.id}`);
      }else if(location.pathname.includes("performances")){
        navigate(`/performances/match/${match.id}`)
      }
    }
  };

  return (
<div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
  <p className="text-sm text-gray-700 mb-2">{match.date || "Sin fecha establecida"}</p>
  {isFiltered && (
    <p className="text-sm text-gray-700 mb-2 font-bold"> 
      {match.round > 0 ? (
        <p>Ronda: <span className='bg-teal-200 rounded px-2 font-bold'>{match.round}</span></p>
      ) : (
        <span className='bg-teal-200 rounded px-2 font-bold'>Partido adicional</span>
      )}
    </p>
  )}

  <div className="flex items-center gap-3 my-2">
    <div className="flex flex-col items-center">
      <img
        src={match.home_team_logo}
        alt={match.home_team_name}
        className="w-16 h-16 object-contain"
      />
      <p className="text-sm font-semibold mt-1 text-gray-700 text-center">{match.home_team_name} {match.state === "COMPLETED" && <span className='bg-pink-200 rounded px-2 font-bold'>{match.score_home}</span>}</p>
    </div>

    <p className="text-sm font-bold text-gray-700">VS</p>

    <div className="flex flex-col items-center">
      <img
        src={match.away_team_logo}
        alt={match.away_team_name}
        className="w-16 h-16 object-contain"
      />
      <p className="text-sm font-semibold mt-1 text-gray-700 text-center">{match.state === "COMPLETED" && <span className='bg-pink-200 rounded px-2 font-bold'>{match.score_away}</span>} {match.away_team_name}</p>
    </div>
  </div>

  <span className="text-sm font-semibold my-2 text-gray-600">
    {match.state === "WAITING"
      ? "En espera"
      : match.state === "IN_PROGRESS"
      ? "En curso"
      : "✅ Completado"}
  </span>

  <div className="mt-2 flex gap-2">
    {(match.state === "COMPLETED" || user.permissions.add_match) &&
    <button
      className={`text-base ${match.state === "WAITING" ? "bg-indigo hover:bg-indigo_dark" : match.state === "IN_PROGRESS" ? "bg-emerald-700 hover:bg-emerald-800" : "bg-pink-600 hover:bg-pink-700" } font-semibold px-4 py-1 rounded text-white transition`}
      onClick={() => handleButtonClick(match)}
    >
      {match.state === "WAITING" ? "Iniciar"
        : match.state === "IN_PROGRESS" ? "Seguir"
        : match.state ==="COMPLETED" && "Ver estadísticas"}
    </button>}

    {match.state === "WAITING" && user.permissions.change_match &&  (
      <button
        onClick={() => setIsModalUpdate(true)}
        className="bg-zinc-500 hover:bg-zinc-600 font-semibold text-white px-4 py-1 rounded"
      >
        Ajustar
      </button>
    )}
  </div>

  {isModalUpdate && (
    <MatchCreateFormModal onClose={() => setIsModalUpdate(false)} tournament={tournament} isToUpdate={true} match={match} setMatch={setMatch} />
  )}

  {isModalOpen && (
    <ModalSelectPlayers
      match={selectedMatch}
      playersHomeTeam={playersHomeTeam}
      playersAwayTeam={playersAwayTeam}
      loadingPlayers={loadingPlayers}
      onClose={() => setIsModalOpen(false)}
    />
  )}
</div>
  )
}
