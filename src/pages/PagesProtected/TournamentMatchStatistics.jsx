import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../../components/utils/Loading";
import { ErrorMessage } from "../../components/utils/ErrorMessage";
import api from "../../api";
import { NotFound } from "../NotFound";
import { MatchStatisticsForm } from "../../components/tournaments/MatchStatisticsForm";
import { useSelector } from "react-redux";

export const TournamentMatchStatistics = () => {
  const { currentTournament } = useSelector((state) => state.tournaments);

  const { match_id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [matchPlayers, setMatchPlayers] = useState();

  useEffect(() => {
    const fetchMatchWithPlayers = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/tournaments/match/${match_id}/players/`);
        setMatchPlayers(res.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatchWithPlayers();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage />;
  if (!currentTournament) return <NotFound />;
  if (matchPlayers) {
    if (matchPlayers.home_team.players.length === 0) return <NotFound />;
  } else {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-6">
      <MatchStatisticsForm
        matchPlayers={matchPlayers}
        tournament={currentTournament}
      />
    </div>
  );
};
