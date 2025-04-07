import React, { useEffect, useState } from "react";
import api from "../../api";
import { useSelector } from "react-redux"
import { useParams, useLocation } from "react-router-dom";
import { Loading } from "../../components/utils/Loading";
import { ErrorMessage } from "../../components/utils/ErrorMessage";
import { StatisticsPlayers } from "../../components/performances/StatisticsPlayers";
import { MatchStatisticsBody } from "../../components/performances/MatchStatisticsBody";

export const MatchPerformances = () => {
  const { id } = useParams();
  const [matchStatistics, setMatchStatistics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const typeTournament = useSelector((state) => state.tournaments.currentTournament?.type);
  const location = useLocation();

  const [type, setType] = useState(() => {
    return localStorage.getItem("typeTournament") || typeTournament || ''; 
  });
  
  const isToUpdate = location.pathname.includes("update");
  
  useEffect(() => {
    if (typeTournament !== undefined) {
      setType(typeTournament);
      localStorage.setItem("typeTournament", typeTournament); 
    }
  }, [typeTournament]);

  useEffect(() => {
    if (type !== undefined) {
      localStorage.setItem("typeTournament", type);
    }
  }, [type]); 

  useEffect(() => {
    const fetchStatisticsMatch = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/performance/player-statistics/${id}/`);
        setMatchStatistics(res.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStatisticsMatch();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="min-h-screen bg-zinc-50 pb-10">
      <StatisticsPlayers
        matchStatistics={matchStatistics}
        isToUpdate={isToUpdate}
        type={type}
      />
      {!isToUpdate &&
        <MatchStatisticsBody statistics={matchStatistics}/>
      }
    </div>
  );
};
