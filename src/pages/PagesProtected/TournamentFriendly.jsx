import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import api from '../../api';
import { getTournament } from '../../api/tournamentApi';

import { FriendlyMatches } from '../../components/tournaments/tournamentFriendly/FriendlyMatches';
import { FriendlyDetails } from '../../components/tournaments/tournamentFriendly/FriendlyDetails';
import { BackButton } from '../../components/utils/BackButton';
import { Loading } from '../../components/utils/Loading';
import { ErrorMessage } from '../../components/utils/ErrorMessage';

export const TournamentFriendly = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { currentTournament, status, error } = useSelector((state) => state.tournaments);
    const [matches, setMatches] = useState([]);
    const [clubStatistics, setClubStatistics] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const [errorData, setErrorData] = useState(null);
    const type = "FRIENDLY";
    
    useEffect(() => {
      const fetchTournamentAndMatches = async() => {
        dispatch(getTournament(id, type));
        
        try{
            setLoadingData(true);
            const [matchesRes, statisticsRes] = await Promise.all([
              api.get(`tournaments/matches/${id}/`),
              api.get(`performance/club-statistics/${id}/`)
            ])
            setMatches(matchesRes.data);
            setClubStatistics(statisticsRes.data);
          }catch(err){
            setErrorData("Error al obtener los partidos");
          }finally{
            setLoadingData(false);
          }
        };
        
      fetchTournamentAndMatches();
    }, [dispatch, id]);
    
    if (status === "loading" || loadingData ) return <Loading />;
    if (status === "failed") return <ErrorMessage message={`Error: ${error}`}/>;
    if (errorData) return <ErrorMessage message={errorData}/>;

  return (
    <div className='min-h-screen bg-zinc-50 pb-10'>
        <BackButton url={`/tournaments`}/>
        <FriendlyDetails tournament={currentTournament} clubsStatistics={clubStatistics}/>
        <FriendlyMatches matches={matches} tournament={currentTournament} />
    </div>
  )
}
