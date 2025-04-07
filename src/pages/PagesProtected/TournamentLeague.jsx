import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BackButton } from "../../components/utils/BackButton";

import api from "../../api";
import { getTournament } from "../../api/tournamentApi"; 

import { LeagueMatches } from "../../components/tournaments/tournamentLeague/LeagueMatches";
import { LeagueDetails } from "../../components/tournaments/tournamentLeague/LeagueDetails";
import { ErrorMessage } from "../../components/utils/ErrorMessage";
import { Loading } from "../../components/utils/Loading";
import { AdditionalMatchesContainer } from "../../components/tournaments/tournamentLeague/AdditionalMatchesContainer";


export const TournamentLeague = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentTournament, status, error } = useSelector((state) => state.tournaments);
  const [matches, setMatches] = useState([]);
  const [clubStatistics, setClubStatistics] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [errorData, setErrorData] = useState(null);
  const type = "LEAGUE";
  
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
        setErrorData("Error al obtener los datos del torneo");
      }finally{
        setLoadingData(false);
      }
    };
    fetchTournamentAndMatches();
  }, [dispatch, id, type]);

  if (status === "loading" || loadingData) return <Loading />;
  if (status === "failed") return <ErrorMessage message={`Error: ${error}`} />;
  if (errorData) return <ErrorMessage message={errorData} />;

  return (
    <div className="min-h-screen bg-zinc-50 pb-10">
      <BackButton url={`/tournaments`}/>
      <LeagueDetails tournament={currentTournament} clubsStatistics={clubStatistics} />
      <LeagueMatches matches={matches} tournament={currentTournament}/>  
    </div>
  );
};
