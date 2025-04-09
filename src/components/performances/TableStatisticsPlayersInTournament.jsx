import React, { useState } from 'react';
import { ModalStatisticPlayerInTournament } from './ModalStatisticPlayerInTournament';
import api from '../../api';
import toast from 'react-hot-toast';

export const TableStatisticsPlayersInTournament = ({ tournament, statsAllPlayers }) => {
  const [filterName, setFilterName] = useState("");
  const [filterClub, setFilterClub] = useState("");
  const [statisticPlayer, setStatisticPlayer] = useState({});
  const [isModalStatistics, setIsModalStatistics] = useState(false);
  const [loadingPlayerId, setLoadingPlayerId] = useState(null);

  let filterStatsPlayers = statsAllPlayers.filter((player) => {
      const playerName = filterName ? player.player.toLowerCase().includes(filterName.trim().toLowerCase()) : player
      const playerClub = filterClub ? parseInt(player.player_club_id) ===  parseInt(filterClub) : player
      return (playerName && playerClub)
  });

  const handleGetStatistic = async(player) => {
    try{
      setLoadingPlayerId(player.player_id);
      const res = await api.get(`/performance/statisticsPlayerInTournament/${player.player_id}/${tournament.id}/`);
      setStatisticPlayer(res.data);
      setIsModalStatistics(true);
    }catch(error){
      toast.error("Error en traer los datos, intente más tarde: " + error.message)
    }finally{
      setLoadingPlayerId(null);
    }
  }

  if (statsAllPlayers.length == 0){
    return
  }

  return (
    <div class="flex flex-col justify-center items-center gap-4 font-[Poppins]">

        <div className='flex flex-wrap items-center justify-center gap-4'>
          <div>
            <h1 className="font-bold text-xl text-slate-900">Filtros: </h1>
          </div>
          <input
          type="text"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          placeholder="Nombre de jugador"
          className="pl-4 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo transition-all w-60"
          />
          <select className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo transition-all"
          value={filterClub}
          onChange={(e) => setFilterClub(e.target.value)}
          >
          <option value="">Todos los clubes</option>
          {tournament?.clubs.map((club) => (
            <option key={club.id} value={club.id}>
              {club.name}
            </option>
          ))}        
          </select>
        </div>

        <div class="relative w-2/4 max-h-96 overflow-y-auto shadow-md sm:rounded-lg">
          <table class="w-full text-lg text-left rtl:text-right text-gray-700 dark:text-gray-300">
              <thead class="text-sm text-gray-900 uppercase bg-gray-200 dark:bg-gray-800 dark:text-gray-200 sticky top-0">
                  <tr>
                      <th scope="col" class="px-6 py-3">Jugador</th>
                      <th scope="col" class="px-6 py-3 bg-gray-300 dark:bg-gray-700">Goles</th>
                      <th scope="col" class="px-6 py-3">Asistencias</th>
                      <th scope="col" class="px-6 py-3 bg-gray-300 dark:bg-gray-700"></th>
                  </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-900">
                  {filterStatsPlayers.length > 0 ? (
                      filterStatsPlayers.map((player) => (
                          <tr class="border-b border-gray-300 dark:border-gray-600">
                              <th scope="row" class="px-6 py-5 font-semibold text-gray-900 dark:text-white">{player.player}<span className='text-cyan-700 text-xs'> - {player.player_club_name}</span></th>
                              <td class="px-6 py-5 font-semibold">{player.goals_scored}</td>
                              <td class="px-6 py-5 font-semibold">{player.assists}</td>
                              <td class="px-6 py-5">
                                  <button className={`text-cyan-700 font-bold text-base hover:text-indigo_dark hover:underline ${loadingPlayerId === player.player_id && "text-indigo_dark"}`}
                                  onClick={() => handleGetStatistic(player)}
                                  >{loadingPlayerId === player.player_id ? "Cargando..." : "Obtener más"}</button>
                              </td>
                          </tr>
                      ))
                  ) : (
                      <tr>
                          <td colSpan="4" class="px-6 py-5 text-center font-semibold text-gray-900 dark:text-white">
                              No hay estadístisticas que coincidan con los filtros
                          </td>
                      </tr>
                  )}
              </tbody>
          </table>
        </div>
        
        {isModalStatistics && (
          <ModalStatisticPlayerInTournament onClose={() => setIsModalStatistics(false)} statisticPlayer={statisticPlayer}/>
        )}

    </div>
  )
}
