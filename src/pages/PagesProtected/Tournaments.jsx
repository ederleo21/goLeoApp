import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTournaments } from "../../api/tournamentApi";
import { Loading } from "../../components/utils/Loading";
import { ErrorMessage } from "../../components/utils/ErrorMessage";
import { TournamentsContainer } from "../../components/tournaments/TournamentsContainer";
import { TournamentHeader } from "../../components/tournaments/TournamentHeader";
import { NamePag } from "../../components/utils/NamePag";
import { RiBoxingLine } from "react-icons/ri";

export const Tournaments = () => {
  const { tournaments, status, error } = useSelector(
    (state) => state.tournaments
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTournaments());
  }, [dispatch]);

  if (status === "loading") return <Loading />;
  if (status === "failed") return <ErrorMessage message={`Error: ${error}`} />;

  return (
    <div className="min-h-screen bg-zinc-50 pb-10">
      <NamePag title={'Torneos'} icon={<RiBoxingLine className='text-4xl'/>} />
      <TournamentHeader />
      <TournamentsContainer tournaments={tournaments} />
    </div>
  );
};
