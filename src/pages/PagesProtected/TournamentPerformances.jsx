import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import api from '../../api';
import { setCurrentTournament } from '../../slices/tournamentSlice';
import { Loading } from '../../components/utils/Loading';
import { ErrorMessage } from '../../components/utils/ErrorMessage';
import { HeaderTournament } from '../../components/performances/HeaderTournament';
import { MatchContainerPerformances } from '../../components/performances/MatchContainerPerformances';
import { BackButton } from '../../components/utils/BackButton';
import { SectionTopsPlayers } from '../../components/performances/SectionTopsPlayers';
import { TableStatisticsPlayersInTournament } from '../../components/performances/TableStatisticsPlayersInTournament';

export const TournamentPerformances = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentTournament, status, error } = useSelector(state => state.tournaments);
    const [matches, setMatches] = useState([]);
    const [clubStatistics, setClubStatistics] = useState([]);
    const [statsPlayers, setStatsPlayers] = useState({});
    const [loadingData, setLoadingData] = useState(false);
    const [errorData, setErrorData] = useState(null);
    const [statsAllPlayers, setStatsAllPlayers] = useState([]);

    useEffect(() => {
      const fectchTournamentAndMatch = async() => {
        try {
          setLoadingData(true);
          const {data: tournament} = await api.get(`/tournaments/tournaments/?id=${id}`);
          const current_tournament = tournament[0];
          dispatch(setCurrentTournament(current_tournament));

          const [matchesRes, statisticsRes, statsPlayersRes, statsAllPlayersRes] = await Promise.all([
            api.get(`/performance/matches/tournament/${id}/`),
            api.get(`performance/club-statistics/${id}/`),
            api.get(`performance/playerTournamentStats/${id}/`),
            api.get(`/performance/statisticsPlayerByTournament/${id}/`),
          ]);
          setMatches(matchesRes.data);
          setClubStatistics(statisticsRes.data);
          setStatsPlayers(statsPlayersRes.data);
          setStatsAllPlayers(statsAllPlayersRes.data)
        } catch (err) {
          setErrorData("Ocurrió un problema al traer los datos");
        }finally{
          setLoadingData(false);
        }
      };
      fectchTournamentAndMatch();
    }, [id, dispatch]);

    if(status === 'loading' || loadingData) return <Loading/>
    if(status === 'failed') return <ErrorMessage message={`Error: ${error}`} />
    if(errorData) return <ErrorMessage error={errorData} />

  return (
    <div className='min-h-screen bg-zinc-50 pb-10'>
      <BackButton url={`/performances`} />
      <HeaderTournament tournament={currentTournament} clubStatistics={clubStatistics}/>
      <MatchContainerPerformances matches={matches} tournament={currentTournament}/>

      {matches.length > 0 && 
        <div>
          <div className="flex justify-center mt-10 mb-6 mx-3 font-[Poppins]">
            <div className="bg-gray-800 text-white px-8 py-3 rounded-lg shadow-lg text-center">
              <h1 className="text-lg md:text-xl font-bold tracking-wide uppercase">
                Estadísticas de jugadores a nivel de torneo
              </h1>
            </div>
          </div>
          <TableStatisticsPlayersInTournament tournament={currentTournament} statsAllPlayers={statsAllPlayers} />
          <div className="flex justify-center mt-10 mb-6 mx-3 font-[Poppins]">
            <div className="bg-gray-800 text-white px-8 py-3 rounded-lg shadow-lg text-center">
              <h1 className="text-lg md:text-xl font-bold tracking-wide uppercase">
                Tops de jugadores a nivel de torneo
              </h1>
            </div>
          </div>
          <SectionTopsPlayers statsPlayers={statsPlayers} />
        </div>}
    </div>
  )
}
